'use client';
import React, {useState} from 'react';
import UserForm from '@components/UserForm';
import HomePage from '@components/HomePage';
import Preview from '@/components/Preview';
import ResultsPage from '@/components/Results';

export default function Main(){
    const [step,setStep] = useState(1);
    const [name,setName] = useState('');
    const [data,setData] = useState({
            Height: "",
            Weight: "",
            Alcohol: "",
            Income: "",
            Schooling: "",
            Smoking: "",
            Physical_Activity: "",
    });
    const [results, setResults] = useState({
        xgb: '',
        saint: '',
    });    

    const onNext = () =>{
        setStep(step+1);
    }

    return (
        <div className="bg-image w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center">
           {step == 1 && <HomePage name={name} setName={setName} onNext={onNext} />}
           {step == 2 && <UserForm name={name} data={data} setData={setData} onNext={onNext}/>}
           {step == 3 && <Preview  name={name} data={data} onNext={onNext} setResults={setResults}/>}
           {step == 4 && <ResultsPage name={name} results={results}/>}
        </div>
    )
} 