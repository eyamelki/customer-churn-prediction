import React, { useState } from "react";
import axios from "axios";

/* ================== API ================== */
const API_URL = "http://127.0.0.1:5000/predict";

/* ================== MAPPINGS ================== */
const mapBinary = (v?: string) => (v === "Yes" ? 1 : 0);
const mapGender = (v?: string) => (v === "Male" ? 1 : 0);

const mapInternet = (v?: string) => {
  if (v === "DSL") return 1;
  if (v === "Fiber optic") return 2;
  return 0; // No
};

const mapContract = (v?: string) => {
  if (v === "One year") return 1;
  if (v === "Two year") return 2;
  return 0;
};

const mapPayment = (v?: string) => {
  const methods: Record<string, number> = {
    "Electronic check": 0,
    "Mailed check": 1,
    "Bank transfer (automatic)": 2,
    "Credit card (automatic)": 3,
  };
  return methods[v ?? ""] ?? 0;
};

const App = () => {
  const [form, setForm] = useState<any>({});
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /* ================== FORM FIELDS ================== */
  const fields: any = {
    gender: { label: "Gender", options: ["Male", "Female"] },
    SeniorCitizen: { label: "Senior Citizen", options: ["0", "1"] },
    Partner: { label: "Partner", options: ["Yes", "No"] },
    Dependents: { label: "Dependents", options: ["Yes", "No"] },
    InternetService: { label: "Internet Service", options: ["DSL", "Fiber optic", "No"] },
    OnlineSecurity: { label: "Online Security", options: ["Yes", "No"] },
    OnlineBackup: { label: "Online Backup", options: ["Yes", "No"] },
    DeviceProtection: { label: "Device Protection", options: ["Yes", "No"] },
    TechSupport: { label: "Tech Support", options: ["Yes", "No"] },
    StreamingTV: { label: "Streaming TV", options: ["Yes", "No"] },
    StreamingMovies: { label: "Streaming Movies", options: ["Yes", "No"] },
    PaperlessBilling: { label: "Paperless Billing", options: ["Yes", "No"] },
    Contract: { label: "Contract", options: ["Month-to-month", "One year", "Two year"] },
    PaymentMethod: {
      label: "Payment Method",
      options: [
        "Electronic check",
        "Mailed check",
        "Bank transfer (automatic)",
        "Credit card (automatic)",
      ],
    },
    tenure: { label: "Tenure", type: "number" },
    MonthlyCharges: { label: "Monthly Charges", type: "number" },
    TotalCharges: { label: "Total Charges", type: "number" },
  };

  /* ================== HANDLERS ================== */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================== PREDICTION ================== */
  const handlePredict = async () => {
    // Validation minimale
    if (
      !form.gender ||
      !form.SeniorCitizen ||
      !form.tenure ||
      !form.MonthlyCharges ||
      !form.TotalCharges
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);
    setPrediction(null);

    const payload = {
      inputs: {
        gender: mapGender(form.gender),
        SeniorCitizen: Number(form.SeniorCitizen),
        Partner: mapBinary(form.Partner),
        Dependents: mapBinary(form.Dependents),
        tenure: Number(form.tenure),
        MonthlyCharges: Number(form.MonthlyCharges),
        TotalCharges: Number(form.TotalCharges),
        InternetService: mapInternet(form.InternetService),
        OnlineSecurity: mapBinary(form.OnlineSecurity),
        OnlineBackup: mapBinary(form.OnlineBackup),
        DeviceProtection: mapBinary(form.DeviceProtection),
        TechSupport: mapBinary(form.TechSupport),
        StreamingTV: mapBinary(form.StreamingTV),
        StreamingMovies: mapBinary(form.StreamingMovies),
        PaperlessBilling: mapBinary(form.PaperlessBilling),
        Contract: mapContract(form.Contract),
        PaymentMethod: mapPayment(form.PaymentMethod),
      },
    };

    try {
      const res = await axios.post(API_URL, payload);
      setPrediction(res.data);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion à l’API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6">
      <h1 className="text-5xl font-extrabold text-center mb-10 
               text-transparent bg-clip-text 
               bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
  ChurnScope
</h1>


      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(fields).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">
              {fields[key].label}
            </label>

            {fields[key].type === "number" ? (
              <input
                type="number"
                name={key}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            ) : (
              <select
                name={key}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select...</option>
                {fields[key].options.map((o: string) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-6">
        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full py-3 bg-pink-600 text-white font-semibold rounded-xl"
        >
          {loading ? "Prediction..." : "Predict"}
        </button>
      </div>

     
{/* ================== MODAL ================== */}
{showModal && prediction && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-96 relative animate-fade-in">
      
      {/* Close */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        onClick={() => setShowModal(false)}
      >
        ×
      </button>

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center mb-6 
        text-transparent bg-clip-text 
        bg-gradient-to-r from-pink-500 to-purple-600">
        Prediction Result
      </h2>

      {/* Status */}
      <div className="flex justify-center mb-4">
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold 
          ${
            prediction.prediction === 1
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {prediction.prediction === 1 ? "High Churn Risk" : "Low Churn Risk"}
        </span>
      </div>

      {/* Probability */}
      {prediction.probability_churn !== null &&
        prediction.probability_churn !== undefined && (
          <>
            <p className="text-center text-gray-600 mb-2">
              Churn Probability
            </p>

            <p className="text-center text-4xl font-extrabold text-gray-800 mb-4">
              {(prediction.probability_churn * 100).toFixed(2)}%
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ease-out ${
                  prediction.prediction === 1
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${Math.min(
                    prediction.probability_churn * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </>
        )}

      {/* Footer */}
      <p className="text-xs text-center text-gray-400 mt-6">
        Prediction based on machine learning model
      </p>
    </div>
  </div>
)}



    </div>
  );
};

export default App;
