'use client';
import React, { useState } from 'react';
import Preview from '@components/Preview';

export default function UserForm({name} : {name:string}){
    const numberOfSteps = 6;
    const [step,setStep] = useState(1);
    const [data, setData] = useState({
        Height: "",
        Weight: "",
        Alcohol: "",
        Income: "",
        Schooling: "",
        Smoking: "",
        Physical_Activity: "",
    });

    const progress = (step / (numberOfSteps + 1)) * 100;
 

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setStep(step+1)
    }


    return (
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-10 max-w-md w-full text-center text-gray-900">
          <h1 className="text-2xl font-bold mb-4">
            Hi {name}, Let's Take Some Details
          </h1>

          <div className="relative w-full bg-gray-200 rounded-full h-6 mb-4">
            <div
                className="bg-blue-500 h-6 rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-700">
                {progress.toFixed()}%
            </div>
          </div>

        <div>
        
        {/* Height / Weight */}
        {step == 1 && (
            <div className="space-y-4 p-4">
                {/* Height Row */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="height" className="w-28 text-gray-700 font-medium">
                    Height (cm)
                    </label>
                    <input
                    id="height"
                    name="Height"
                    type="number"
                    placeholder="Enter height"
                    onChange={handleChange}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Weight Row */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="weight" className="w-28 text-gray-700 font-medium">
                    Weight (kg)
                    </label>
                    <input
                    id="weight"
                    name="Weight"
                    type="number"
                    placeholder="Enter weight"
                    onChange={handleChange}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
        )}

        {/* Alcohol Consumption */}
        {step ==2 && (
            <div className="flex items-center space-x-4 mb-4">
            <label
                htmlFor="alcohol"
                className="w-60 text-gray-700 font-medium text-sm"
            >
                Alcohol Consumption (liters/week):
            </label>
            <input
                id="alcohol"
                name="Alcohol"
                type="number"
                placeholder="e.g. 1.5"
                onChange={handleChange}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>
        )}

        {/* Income */}
        {step === 3 && (
        <div className="flex items-center space-x-4 mb-4">
            <label
            htmlFor="income"
            className="w-60 text-gray-700 font-medium text-sm"
            >
            Personal Income (USD/year):
            </label>
            <input
            id="income"
            name="Income"
            type="number"
            placeholder="e.g. 20000"
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
        )}

        {/* Schooling */}
        {step === 4 && (
        <div className="flex items-center space-x-4 mb-4">
            <label
            htmlFor="schooling"
            className="w-60 text-gray-700 font-medium text-sm"
            >
            Schooling (years):
            </label>
            <input
            id="schooling"
            name="Schooling"
            type="number"
            placeholder="e.g. 12"
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
        )}

        {/* Smoking */}
        {step === 5 && (
        <div className="flex items-center space-x-4 mb-4">
            <label
            htmlFor="smoking"
            className="w-60 text-gray-700 font-medium text-sm"
            >
            Smoking (per day):
            </label>
            <input
            id="smoking"
            name="Smoking"
            type="number"
            placeholder="e.g. 15.5"
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
        )}

        {/* Physical_Activity */}
        {step === 6 && (
        <div className="flex items-center space-x-4 mb-4">
            <label
            htmlFor="Physical_Activity"
            className="w-60 text-gray-700 font-medium text-sm"
            >
            Physical activity (hours per week):
            </label>
            <input
            id="Physical_Activity"
            name="Physical_Activity"
            type="number"
            placeholder="e.g. 30.2"
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
        )}

        {step <= numberOfSteps && (
        <button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            onClick={handleNext}
             >Next</button>
        )}

        {step == numberOfSteps +1 && (
            <Preview data={data}/>
        )}
        </div>

        </div>
    );
} 