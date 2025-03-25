from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model and scaler
model = joblib.load('xgboost_model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_data = data.get('input')

        # Check input validity
        if not input_data or not isinstance(input_data, list):
            return jsonify({'error': 'Invalid input. Provide a list of features under key "input".'}), 400

        # Convert to 2D array for scaler and model
        input_array = np.array(input_data).reshape(1, -1)
        scaled_input = scaler.transform(input_array)

        # Make prediction
        prediction = model.predict(scaled_input)

        return jsonify({'prediction': prediction.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Server is running on http://localhost:5000")
    app.run(port=5000)