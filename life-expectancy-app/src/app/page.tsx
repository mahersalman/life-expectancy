'use client';
import React, {useState} from 'react';
import UserForm from '@components/UserForm';

export default function Home(){
    const [name,setName] = useState('');
    const [note,setNote] = useState('');
    const [showForm,setShowForm] = useState(false);

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    
    const handleStart = () => {
        if(name.trim().length == 0){
            setNote('Please Enter Valid Name Before Start !! ')
        }
        else{
            setShowForm(true)
        }
    }

    return (
        <div className="bg-image w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center">
            {!showForm ? (
            <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-10 max-w-md w-full text-center text-gray-900">
                <h1 className="text-3xl font-bold mb-4 text-blue-600">Life Expectancy Calculator</h1>
                <h2 className="text-lg mb-6">Welcome to Our Website!<br/> Enter your name to get started</h2>

                <input 
                    id='name'
                    type='text'
                    value={name}
                    placeholder='Enter Name Here...'
                    onChange={handleChangeName}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                />
                
                <button 
                    onClick={handleStart}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                    Start
                </button>
            
            {note && 
                <h3 className='text-red-600 font-bold p-4'>
                    {note}
                </h3>
            }

            <a
            href="https://github.com/mahersalman/life-expectancy"
            className="block mt-4 text-sm text-blue-500 hover:underline transition duration-300"
            >
            Click Here to See Our Repository & Dataset
            </a>
            </div>
        ) : (
           <UserForm name={name}/> 
        )}
        </div>
    )
} 