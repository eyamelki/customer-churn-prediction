# ChurnScope - Backend

API Flask pour prédire le churn des clients.

## Fichiers importants
- `app.py` — serveur Flask exposant `/` (health) et `/predict`.
- `model.pkl` — modèle entraîné (obligatoire pour la prédiction).
- `scaler.joblib` — scaler pour normaliser les entrées.
- `feature_names.json` — liste des features attendues par le modèle.
- `requirements.txt` — dépendances python pour le backend.

## Exécution locale (Windows)
1. Ouvrir un terminal dans le dossier `backend`.
2. Créer et activer un environnement virtuel :

```powershell
python -m venv venv
venv\Scripts\activate
```

3. Installer les dépendances :

```powershell
pip install -r requirements.txt
```

4. Vérifier que `model.pkl`, `scaler.joblib` et `feature_names.json` sont présents dans le dossier `backend`.

5. Lancer l'API :

```powershell
python app.py
```

Le serveur écoute par défaut sur `http://0.0.0.0:5000`.

## Test de l'endpoint `/predict`
Envoyer un JSON contenant un objet `inputs` avec les features listées dans `feature_names.json`.

Exemple `curl` :

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"inputs": {"SeniorCitizen": 0, "tenure": 12, "MonthlyCharges": 70.35, "TotalCharges": 800.0}}'
```

Réponse attendue :

```json
{
  "prediction": 1,
  "label": "churn",
  "probability_churn": 0.78
}
```

## Dépannage rapide
- Si `model.pkl` ne se charge pas, vérifiez le chemin dans `app.py` (utiliser `Path(__file__).resolve().parent`).
- Si la probabilité renvoyée est `null` ou `NaN`, vérifiez que le modèle implémente `predict_proba` et que les features sont complètes et dans le bon ordre (voir `feature_names.json`).
- Pour réentraîner ou explorer le modèle, consulter `churn_model.ipynb`.

---
