from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import torch

# Import the SAINT model class and the helper function for embedding
import sys
sys.path.append('saint')  
from models import SAINT   
from augmentations import embed_data_mask

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# ---------------------
# Load the XGBoost model
# ---------------------
with open("xgb_model.pkl", "rb") as f:
    xgb_model = pickle.load(f)

# ---------------------
# Load the SAINT model
# ---------------------
# Set device (GPU if available, else CPU)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Instantiate the SAINT model.
# Note: Here we assume the SAINT model was trained using 6 continuous features and no categorical features (except the CLS token).
saint_model = SAINT(
    categories=(1,),          # Only the CLS token (no additional categorical features)
    num_continuous=6,         # The number of continuous features expected (e.g., [5,6,3,8,1,2] -> 6 features)
    dim=32,                   # Embedding dimension (as used in training)
    depth=6,                  # Number of transformer layers
    heads=8,                  # Number of attention heads
    attentiontype='colrow',   # Attention type
    attn_dropout=0.1,         # Attention dropout rate
    ff_dropout=0.1,           # Feedforward dropout rate
    y_dim=1                   # Output dimension for regression
)
# Load the saved model state
saint_model.load_state_dict(torch.load("saint_model.pt", map_location=device))
saint_model.to(device)

# ---------------------
# Define helper function for SAINT prediction
# ---------------------
def predict_saint(model, input_features):
    """
    Predict using the SAINT model.
    
    Args:
        model: The SAINT model (already on device).
        input_features: A list of continuous features. (Example: [5,6,3,8,1,2])
        
    Returns:
        A scalar prediction.
    """
    model.eval()
    # Convert the input_features list into a 2D tensor (batch size 1)
    x_cont = torch.tensor(np.array(input_features).reshape(1, -1), dtype=torch.float32).to(device)
    
    # Since we dropped categorical features, we only add the required CLS token.
    # Create a categorical tensor with shape (1,1) with value 0.
    x_categ = torch.zeros((1, 1), dtype=torch.int64).to(device)
    
    # Create corresponding masks:
    # For categorical data, mask out the CLS token (set to 0) as it's not a "real" data feature.
    cat_mask = torch.ones_like(x_categ, dtype=torch.int64).to(device)
    cat_mask[:, 0] = 0
    
    # For continuous data, create a mask of ones.
    cont_mask = torch.ones_like(x_cont, dtype=torch.int64).to(device)
    
    with torch.no_grad():
        # Embed the data and obtain representations.
        _, x_categ_enc, x_cont_enc = embed_data_mask(x_categ, x_cont, cat_mask, cont_mask, model)
        # Forward pass through the transformer
        reps = model.transformer(x_categ_enc, x_cont_enc)
        # Extract the CLS token representation (first token)
        y_reps = reps[:, 0, :]
        # Pass through the final MLP layer to get the prediction.
        y_pred = model.mlpfory(y_reps)
    
    return y_pred.item()

# ---------------------
# Flask route to predict
# ---------------------
@app.route('/predict', methods=['POST'])
def predict():
    # Expect JSON data with a key 'features' containing a list of 6 continuous features.
    data = request.get_json(force=True)
    features = data.get('features', None)
    if features is None:
        return jsonify({'error': 'No features provided'}), 400
    
    # XGBoost prediction:
    # Convert the list of features into a 2D numpy array (batch size 1).
    xgb_input = np.array(features).reshape(1, -1)
    xgb_prediction = xgb_model.predict(xgb_input).tolist()  # Convert to list for JSON serialization

    # SAINT prediction:
    saint_prediction = predict_saint(saint_model, features)
    
    # Return predictions as an array [xgboost_prediction, saint_prediction]
    # xgb_prediction is already a list, and saint_prediction is a scalar.
    return jsonify({'prediction': [xgb_prediction, saint_prediction]})

@app.route('/')
def index():
    return "Prediction Server Running"

if __name__ == '__main__':
    app.run(debug=True)


