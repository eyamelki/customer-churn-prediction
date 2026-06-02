# 🔮 ChurnScope — Customer Churn Prediction

> **Full-stack Machine Learning application** that predicts telecom customer churn with **80.7% accuracy**, powered by a Logistic Regression model, a Flask REST API, and a modern React dashboard.

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/Flask-2.x-000000?style=for-the-badge&logo=flask&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/scikit--learn-ML-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white"/>
  <img src="https://img.shields.io/badge/Google_Colab-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Demo](#-demo)
- [Architecture](#-architecture)
- [Dataset](#-dataset)
- [Machine Learning Pipeline](#-machine-learning-pipeline)
- [Model Results](#-model-results)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Author](#-author)

---

## 🧠 Overview

**ChurnScope** is an end-to-end ML project that addresses a critical business problem in the telecom industry: **predicting which customers are likely to cancel their subscription (churn)**.

The application covers the full ML lifecycle:

- 📊 **Data Analysis & Preprocessing** — Kaggle telecom dataset (7043 records, 21 features)
- 🤖 **Model Training & Evaluation** — Trained on Google Colab (Logistic Regression, KNN, Random Forest)
- 🌐 **REST API Deployment** — Flask backend exposing a `/predict` endpoint
- 💻 **Interactive Web App** — React + Tailwind CSS frontend for real-time predictions

---

## 🎬 Demo

> 📸 *(Add screenshots of your app here)*

| Form Input | Prediction Result |
|:---:|:---:|
| ![Form](https://github.com/user-attachments/assets/d766eabb-100c-4631-8c76-a030d49e0ce2) | ![Result](https://github.com/user-attachments/assets/8461f4d7-6926-40f6-8652-22876e2ef3e1) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   USER (Browser)                    │
│              React + Vite + Tailwind CSS            │
│                  localhost:5173                     │
└──────────────────────┬──────────────────────────────┘
                       │  POST /predict (JSON)
                       ▼
┌─────────────────────────────────────────────────────┐
│               Flask REST API (Backend)              │
│                   localhost:5000                    │
│  ┌─────────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  model.pkl  │  │ scaler   │  │feature_names  │  │
│  │  (LogReg)   │  │ .joblib  │  │   .json       │  │
│  └─────────────┘  └──────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────┘
         ▲
         │ Model trained & exported from
┌────────┴────────┐
│  Google Colab   │
│ churn_model     │
│   .ipynb        │
└─────────────────┘
```

---

## 📦 Dataset

**Source :** [Kaggle — Telco Customer Churn](https://www.kaggle.com/code/bhartiprasad17/customer-churn-prediction/input)

| Property | Value |
|----------|-------|
| File | `WA_Fn-UseC_-Telco-Customer-Churn.csv` |
| Records | 7 043 customers |
| Features | 21 columns |
| Target variable | `Churn` (Yes / No) |
| Churn rate | **26.54%** (1 869 churners) |

### Key Features

| Category | Features |
|----------|----------|
| Demographics | `gender`, `SeniorCitizen`, `Partner`, `Dependents` |
| Services | `PhoneService`, `MultipleLines`, `InternetService`, `StreamingTV`, `StreamingMovies` |
| Add-ons | `OnlineSecurity`, `OnlineBackup`, `DeviceProtection`, `TechSupport` |
| Contract | `Contract`, `PaperlessBilling`, `PaymentMethod` |
| Financials | `MonthlyCharges`, `TotalCharges`, `tenure` |

---

## ⚙️ Machine Learning Pipeline

> 🔬 Full pipeline available in `backend/churn_model.ipynb` (Google Colab)

### 1. Data Preprocessing
- Converted `TotalCharges` from object → numeric
- Converted `SeniorCitizen` to boolean
- Filled **11 missing values** in `TotalCharges` with the **median**
- Standardized `No internet service` / `No phone service` → `No`
- Encoded binary variables (`Yes`/`No`) → `1`/`0`
- Applied **One-Hot Encoding** on `gender`, `InternetService`, `Contract`, `PaymentMethod` (`drop_first=True`)

### 2. Model Training
- **Train/Test split :** 80% / 20% (stratified on `Churn`)
- **StandardScaler** applied for scale-sensitive models
- Three models trained and compared

### 3. Most Influential Features
`tenure` · `Contract type` · `InternetService (Fiber optic)` · `MonthlyCharges` · `OnlineSecurity` · `TechSupport` · `PaymentMethod (Electronic check)`

---

## 📊 Model Results

| Model | Accuracy | Precision | Recall | F1-Score |
|-------|:--------:|:---------:|:------:|:--------:|
| ✅ **Logistic Regression** | **80.7%** | **65.9%** | **56.4%** | **60.8%** |
| Random Forest | 78.9% | 63.2% | 49.2% | 55.3% |
| K-Nearest Neighbors | 74.7% | 52.5% | 50.0% | 51.2% |

### ✅ Final Model — Logistic Regression

**Why?** Best overall balance across all metrics (accuracy, precision, recall, F1).

**Confusion Matrix :**

```
                  Predicted No Churn   Predicted Churn
Actual No Churn        928                  107
Actual Churn           190                  184
```

**ROC-AUC Score : 0.83** — indicating strong discriminative capacity.

---

## 📁 Project Structure

```
customer-churn-prediction/
│
├── 📂 backend/
│   ├── app.py                        # Flask API (health + predict endpoints)
│   ├── churn_model.ipynb             # Google Colab notebook (EDA → Training → Export)
│   ├── model.pkl                     # Trained Logistic Regression model
│   ├── scaler.joblib                 # StandardScaler for input normalization
│   ├── feature_names.json            # Ordered list of expected features
│   ├── requirements.txt              # Python dependencies
│   └── WA_Fn-UseC_-Telco-Customer-Churn.csv   # Dataset
│
├── 📂 frontend/
│   ├── src/
│   │   ├── App.tsx                   # Main React component
│   │   ├── main.tsx                  # Entry point
│   │   └── App.css                   # Styles
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tsconfig.app.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Python **3.10+**
- Node.js **18+**
- npm / yarn

---

### Backend Setup

```bash
# 1. Navigate to the backend folder
cd backend

# 2. (Optional) Create a virtual environment
python -m venv venv
source venv/bin/activate        # Linux / macOS
venv\Scripts\activate           # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Make sure these files are present:
#    model.pkl | scaler.joblib | feature_names.json

# 5. Start the Flask server
python app.py
```

> ✅ API running at `http://127.0.0.1:5000`

---

### Frontend Setup

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

> ✅ App running at `http://localhost:5173`

---

## 📡 API Reference

### `GET /`
Health check endpoint.

**Response :**
```json
{ "status": "ok" }
```

---

### `POST /predict`
Predicts churn probability for a given customer.

**Request body :**
```json
{
  "inputs": {
    "SeniorCitizen": 0,
    "tenure": 12,
    "MonthlyCharges": 70.0,
    "TotalCharges": 840.0,
    "gender_Male": 1,
    "Partner_Yes": 0,
    "InternetService_Fiber optic": 1,
    "Contract_Two year": 0,
    "PaymentMethod_Electronic check": 1
  }
}
```

**Response :**
```json
{
  "prediction": 1,
  "label": "churn",
  "probability_churn": 0.869
}
```

| Field | Type | Description |
|-------|------|-------------|
| `prediction` | `int` | `1` = Churn, `0` = No Churn |
| `label` | `string` | Human-readable label |
| `probability_churn` | `float` | Churn probability (0 to 1) |

> **Note :** Label is `"churn"` if `probability_churn >= 0.6`

---

## 👩‍💻 Author

**Eya Melki**
  Made with ❤️ · <strong>ChurnScope</strong> · 2025–2026
</p>
