
from pathlib import Path
from flask import Flask, request, jsonify
import joblib, json
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for your Flask app

BASE = "/D:/3 GL D/Eya_Melki_projet_ML/backend/"  # Chemin corrigé pour Colab
BASE = Path(__file__).resolve().parent
model = joblib.load(BASE / "model.pkl")  # Chargement du modèle
scaler = joblib.load(BASE / "scaler.joblib") # Chargement du scaler corrigé
with open(BASE / "feature_names.json", "r", encoding="utf-8") as f:
    feature_names = json.load(f)

@app.get("/")
def health():
    return jsonify({"status": "ok"})

@app.post("/predict")
def predict():
    data = request.get_json(silent=True)
    if not data or "inputs" not in data:
        return jsonify({"error": "JSON attendu: {\"inputs\": {<feature>: valeur, ...}}"}), 400

    inputs = data["inputs"]

    # Construire le vecteur dans l'ordre exact des features
    try:
        x = np.array([float(inputs.get(feat, 0.0)) for feat in feature_names], dtype=float).reshape(1, -1)
    except Exception as e:
        return jsonify({"error": f"Valeur invalide: {e}"}), 400

    x_scaled = scaler.transform(x)
    pred = int(model.predict(x_scaled)[0])

    prob = None
    if hasattr(model, "predict_proba"):
        prob = float(model.predict_proba(x_scaled)[0, 1])

    return jsonify({
        "prediction": pred,
        "label": "churn" if prob >= 0.6 else "no churn",
        "probability_churn": prob
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
