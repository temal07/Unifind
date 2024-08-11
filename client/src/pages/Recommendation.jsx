import { Avatar, Button, Label, Select, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react'

export default function Recommendation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const [formData, setFormData] = useState({
        gpa: '',
        act: '',
        financialSituation: '',
        sat: '',
        extraCurriculars: '',
        interests: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/gemini/generate-res', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    act: formData.act,
                    sat: formData.sat,
                    financialSituation: formData.financialSituation,
                    extraCurriculars: formData.extraCurriculars,
                    gpa: formData.gpa,
                    interests: formData.interests,
                }),
            });
            const data = await res.json();
            
            if (res.ok) {
                setLoading(false);
                setResponse(data);
                setError(null);
            } else {
                setError(data.message);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError(error.message);           
        }
    }

    // prettify the text gemini generates
    const prettifyText = (text) => {
        // Remove leading and trailing whitespace
        text = text.trim();
    
        // Remove leading and trailing stars
        text = text.replace(/^\*+|\*+$/g, '');
    
        // Replace consecutive stars with a single space
        text = text.replace(/\*+/g, ' ');
    
        // Replace consecutive whitespace characters with a single space
        text = text.replace(/\s+/g, ' ');
    
        // Remove any remaining leading or trailing whitespace
        text = text.trim();
    
        return text;
    };

  return (
    <div className='flex flex-col ml-52 gap-5'>
      <div className=' flex flex-col mt-10 gap-5'>
        <h1 className='font-poppins text-4xl bg-gradient-to-r from-blue-700 via-pink-600 to-purple-800 text-transparent bg-clip-text'>
            Welcome to the Recommendation Page
        </h1>
        <div className=''>
            <p className='font-poppins text-lg'>
                Enter your academic and financial status
                and see which universities you might want to apply to!
            </p>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-20'>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5'>
                <div>
                    <Label value='Your GPA:'/>
                    <TextInput 
                        type='text'
                        placeholder='Your GPA:'
                        id='gpa'
                        required
                        value={formData.gpa}
                        onChange={handleChange}
                        className='flex-1 w-72'
                    />
                </div>
                <div>
                    <Label value='Your SAT:'/>
                    <TextInput 
                        type='text'
                        placeholder='Enter SAT score:'
                        id='sat'
                        required
                        value={formData.sat}
                        onChange={handleChange}
                        className='flex-1 w-72'
                    />
                </div>
                <div>
                    <Label value='Your ACT:'/>
                    <TextInput 
                        type='text'
                        placeholder='Enter ACT score:'
                        id='act'
                        required
                        value={formData.act}
                        onChange={handleChange}
                        className='flex-1 w-72'
                    />
                </div>
                <div>
                    <Label value='Extracurriculars you are involved in:'/>
                    <TextInput 
                        type='text'
                        placeholder='Enter your Extracurriculars:'
                        id='extraCurriculars'
                        required
                        value={formData.extraCurriculars}
                        onChange={handleChange}
                        className='flex-1 w-72'
                    />
                </div>
                <div>
                    <Label value='Your Interests:'/>
                    <TextInput 
                        type='text'
                        placeholder='Enter your Interests:'
                        id='interests'
                        required
                        value={formData.interests}
                        onChange={handleChange}
                        className='flex-1 w-72'
                    />
                </div>
                <div>
                    <Label value='Your Financial Status:' />
                    <Select 
                        onChange={handleChange} 
                        id='financialSituation'
                        required
                        value={formData.financialSituation}
                        className='flex-1 w-72'
                    >
                        <option value='high'>High Income</option>
                        <option value='middle'>Middle Class</option>
                        <option value='low'>Low Income</option>
                    </Select>
                </div>
            </div>
            <Button className='mt-10 mb-20' gradientDuoTone='purpleToBlue' outline type='submit'>
                {
                    loading ? (
                        <>
                            <Spinner size='sm' />
                            <span className='pl-3'>Loading...</span>
                        </>
                    ): (
                        'Apply Filters'
                    )
                }
            </Button>
        </form>
        {/* Display Gemini's Responses */}
        <div>
            {
                response && (
                    <div className='mb-20 max-w-max flex mr-40 ml-20'>
                        <div>
                            <Avatar 
                                alt='gemini'
                                img={`https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png`}
                                rounded
                                className='w-10 h-10 mr-4'
                            />
                        </div>
                        <div className='text-sm font-poppins text-gray-900 bg-gray-300 p-4 rounded-lg'>
                            {prettifyText(response.message)}
                        </div>
                    </div>
                )
            }
        </div>
      </div>
    </div>
  )
}
