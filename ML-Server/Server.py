# app.py
from flask import Flask, jsonify, request
import numpy as np
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://life-expectancy-pi.vercel.app"])

# Load the scaler and model once at startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), "xgb_life_expectancy_model.pkl")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "xgb_scaler.pkl")

scaler = joblib.load(SCALER_PATH)
best_model = joblib.load(MODEL_PATH)

@app.route("/predict", methods=["POST"])
def predict_LE():
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({
            "error": "No JSON payload found. Send a JSON body with your POST."
        }), 400

    # Print to console for debugging
    app.logger.info("🛈 Received JSON payload: %s", data)

    try:
        # Unpack nested JSON into flat list in the correct order
        pi = data["personalInfo"]
        ls = data["lifestyle"]
        mh = data["medicalHistory"]
        pc = data["preventiveCare"]

        # Ensure 'sex' is numeric: if a string, map it
        sex_val = pi.get("sex")
        if isinstance(sex_val, str):
            sex_val = 0 if sex_val.lower().startswith("m") else 1

        sample = [
            float(sex_val),
            float(ls.get("physicalActivities")),
            float(ls.get("sleepHours")),
            float(mh.get("hadHeartAttack")),
            float(mh.get("hadAngina")),
            float(mh.get("hadStroke")),
            float(mh.get("hadAsthma")),
            float(mh.get("hadCOPD")),
            float(mh.get("hadDepressiveDisorder")),
            float(mh.get("hadKidneyDisease")),
            float(mh.get("hadArthritis")),
            float(mh.get("hadDiabetes")),
            float(mh.get("deafOrHardOfHearing")),
            float(mh.get("blindOrVisionDifficulty")),
            float(mh.get("difficultyConcentrating")),
            float(mh.get("difficultyWalking")),
            float(mh.get("difficultyDressingBathing")),
            float(mh.get("difficultyErrands")),
            float(ls.get("smokerStatus")),
            float(ls.get("eCigaretteUsage")),
            float(pi.get("bmi")),
            float(ls.get("alcoholDrinkers")),
            float(pc.get("fluVaxLast12")),
            float(pc.get("pneumoVaxEver")),
            float(pc.get("tetanusLast10Tdap")),
            float(pc.get("highRiskLastYear"))
        ]

        # Scale and predict
        arr = np.array([sample])
        arr_scaled = scaler.transform(arr)
        pred = best_model.predict(arr_scaled)
        prediction = float(pred[0])

        return jsonify({"prediction": prediction}), 200

    except KeyError as e:
        return jsonify({
            "error": f"Missing key in JSON payload: {e}"
        }), 400
    except Exception as e:
        app.logger.error("Prediction error: %s", e, exc_info=True)
        return jsonify({
            "error": "Internal server error during prediction"
        }), 500

if __name__ == '__main__':
    # Enable autoreload & debug
    app.run(debug=True, host='0.0.0.0', port=5005)
