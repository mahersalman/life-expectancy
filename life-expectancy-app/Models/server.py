from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load the pre-trained XGBoost model from file
with open("xgb_model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    # Expecting JSON data with a key 'features' (a list of feature values)
    data = request.get_json(force=True)
    features = data.get('features', None)
    if features is None:
        return jsonify({'error': 'No features provided'}), 400

    # Convert the list of features into a 2D array as required by the model
    input_array = np.array(features).reshape(1, -1)
    
    # Perform prediction using the loaded model
    prediction = model.predict(input_array)
    
    # Return the prediction as JSON
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)