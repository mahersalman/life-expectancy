import React, { useState } from "react";
import { getNames } from "country-list";

export default function UserForm({ name }: { name: string }) {
  const [formData, setFormData] = useState({
    Country: "",
    Height: "",
    Weight: "",
    BMI: "",
    "Physical Activity": "",
    "Cigarettes per Day": "",
    "Alcohol Consumption": "",
    GDP: "",
    Schooling: ""
  });
  const [step, setStep] = useState(1);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Total steps before the final review
  const totalSteps = 7;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    // Compute BMI when leaving step 2
    if (step === 2) {
      const height = parseFloat(formData.Height);
      const weight = parseFloat(formData.Weight);
      if (height > 0 && weight > 0) {
        // Convert height from cm to m and compute BMI
        const bmi = weight / ((height / 100) ** 2);
        setFormData((prev) => ({ ...prev, BMI: bmi.toFixed(2) }));
      }
    }
    if (step <= totalSteps) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create numeric input in the order:
      // [BMI, Physical Activity, GDP, Cigarettes per Day, Schooling, Alcohol Consumption]
      const numericInput = [
        parseFloat(formData.BMI),
        parseFloat(formData["Alcohol Consumption"]),
        parseFloat(formData.GDP),
        parseFloat(formData.Schooling),
        parseFloat(formData["Cigarettes per Day"]),
        parseFloat(formData["Physical Activity"]),
      ];

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: numericInput }),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.prediction[0]);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err: any) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const countries = getNames();
  const progressPercentage = (step / (totalSteps + 1)) * 100;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-slate-900">
      <h1 className="text-2xl font-bold mb-4">
        Hi {name}, Let's Take Some Details
      </h1>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Step 1: Country */}
      {step === 1 && (
        <div>
          <label className="block mb-2">Select your country:</label>
          <select
            name="Country"
            value={formData.Country}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select your country</option>
            {countries.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Step 2: Height & Weight */}
      {step === 2 && (
        <div>
          <label className="block mb-2">Height (in cm):</label>
          <input
            type="number"
            name="Height"
            value={formData.Height}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <label className="block mb-2">Weight (in kg):</label>
          <input
            type="number"
            name="Weight"
            value={formData.Weight}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
        </div>
      )}

      {/* Step 3: Physical Activity */}
      {step === 3 && (
        <div>
          <label className="block mb-2">
            Physical Activity (hours per week):
          </label>
          <input
            type="number"
            name="Physical Activity"
            value={formData["Physical Activity"]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {/* Step 4: Cigarettes per Day */}
      {step === 4 && (
        <div>
          <label className="block mb-2">
            Number of Cigarettes per Day:
          </label>
          <input
            type="number"
            name="Cigarettes per Day"
            value={formData["Cigarettes per Day"]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
      )}

      {/* Step 5: Alcohol Consumption */}
      {step === 5 && (
        <div>
          <label className="block mb-2">
            Alcohol Consumption (drinks per week):
          </label>
          <input
            type="number"
            name="Alcohol Consumption"
            value={formData["Alcohol Consumption"]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
      )}

      {/* Step 6: GDP */}
      {step === 6 && (
        <div>
          <label className="block mb-2">GDP:</label>
          <input
            type="number"
            name="GDP"
            value={formData.GDP}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
      )}

      {/* Step 7: Schooling */}
      {step === 7 && (
        <div>
          <label className="block mb-2">Schooling (years):</label>
          <input
            type="number"
            name="Schooling"
            value={formData.Schooling}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
      )}

      {/* Navigation buttons */}
      {step <= totalSteps && (
        <button
          onClick={handleNext}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Continue
        </button>
      )}

      {/* Final Review and Submit */}
      {step === totalSteps + 1 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4">Review Your Details</h2>
          <table className="w-full text-left border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Field</th>
                <th className="border border-gray-300 p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(formData).map(([key, value]) => (
                <tr key={key}>
                  <td className="border border-gray-300 p-2 font-medium capitalize">
                    {key}
                  </td>
                  <td className="border border-gray-300 p-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {prediction && (
            <div className="mt-4 text-green-700 font-semibold">
              ✅ Predicted Life Expectancy:{" "}
              <span className="font-bold">{prediction}</span> years
            </div>
          )}
          {error && (
            <div className="mt-4 text-red-600 font-semibold">
              ❌ {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}