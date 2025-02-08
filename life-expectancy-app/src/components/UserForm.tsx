import React, { useState } from "react";
import { getNames } from "country-list"; 

export default function UserForm({ name }: { name: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    country: "",
    height: "",
    weight: "",
    physicalActivity: "",
    cigarettesPerDay: "",
    alcohol: "",
    dietaryHabits: "",
  });

  const totalSteps = 6;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step <= totalSteps) {
      setStep(step + 1);
    }
  };

  const progressPercentage = (step / (totalSteps + 1)) * 100;

  const countries = getNames(); 


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-slate-900">
      <h1 className="text-2xl font-bold mb-4">Hi {name}, Let's Take Some Details</h1>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {step === 1 && (
        <div>
          <label className="block mb-2">Select your country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select your country</option>
            {countries.map((country : string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block mb-2">Height (in cm):</label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2">Weight (in kg):</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block mb-2">Physical Activity Level:</label>
          <input
            type="text"
            name="physicalActivity"
            value={formData.physicalActivity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {step === 4 && (
        <div>
      <label className="block mb-2">Number of Cigarettes per Day:</label>
      <input
        type="number"
        name="cigarettesPerDay"
        value={formData.cigarettesPerDay || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Enter number of cigarettes"
        min="0"
      />
    </div>
      )}

      {step === 5 && (
        <div>
          <label className="block mb-2">Alcohol Consumption (drinks per week):</label>
        <input
          type="number"
          name="alcohol"
          value={formData.alcohol || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder=""
          min="0"
        />
        </div>
      )}

      {step === 6 && (
        <div>
          <label className="block mb-2">Dietary Habits:</label>
          <input
            type="text"
            name="dietaryHabits"
            value={formData.dietaryHabits}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {step <= totalSteps && (
        <button
          onClick={handleNext}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Continue
        </button>
      )}

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
                  <td className="border border-gray-300 p-2 font-medium capitalize">{key}</td>
                  <td className="border border-gray-300 p-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => alert("Form Submitted Successfully!")}
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}