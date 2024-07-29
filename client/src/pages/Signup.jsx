import React, { useState, useEffect } from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please Fill Out all the Fields!');
    }

    try {
      setErrorMessage(null);
      setLoading(true);

      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        navigate('/login');
      }

    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  }

  return (
    <div className='flex flex-col gap-5 ml-52'>
      <div className="">
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 441 91" fill="none">
          <path 
            d="M38.2344 90.8281C13.3906 90.8281 0.96875 80.2656 0.96875 59.1406V14.1406H30.5469V58.2969C30.5469 62.7344 32.0312 65.625 35 66.9688C36.0312 67.4375 37.2656 67.6719 38.7031 67.6719C42.7656 67.6719 45.3281 65.7344 46.3906 61.8594C46.7031 60.7031 46.8594 59.4531 46.8594 58.1094V14.1406H72.7812V59.1406C72.7812 80.2656 61.2656 90.8281 38.2344 90.8281ZM115.109 46.5781C112.609 46.5781 111.359 48.5938 111.359 52.625V89H83.5156V30.7344H98.8906L105.594 39.8281C108.094 36.3594 111.547 33.6094 115.953 31.5781C120.391 29.5469 124.531 28.5312 128.375 28.5312C135.438 28.5312 141.031 30.4062 145.156 34.1562C149.312 37.9062 151.391 42.9375 151.391 49.25V89H123.359V60.875C123.359 51.3438 120.609 46.5781 115.109 46.5781ZM176.797 3.73438C181.391 3.73438 184.797 4.70313 187.016 6.64062C189.234 8.54688 190.328 10.9844 190.297 13.9531C190.297 16.9219 188.875 19.6562 186.031 22.1562C183.219 24.6562 179.453 25.9062 174.734 25.9062C168.109 25.9062 163.984 23.9062 162.359 19.9062C161.891 18.7812 161.656 17.5312 161.656 16.1562C161.656 14.7812 161.984 13.3438 162.641 11.8438C163.297 10.3438 164.281 9 165.594 7.8125C168.5 5.09375 172.234 3.73438 176.797 3.73438ZM189.5 89H162.359V30.7344H189.5V89ZM245.891 20.8438C244.641 20.4062 243.312 20.1875 241.906 20.1875C239.094 20.1875 236.766 21.1406 234.922 23.0469C233.078 24.9531 232.031 27.5156 231.781 30.7344H278.562V89H251.469V45.5938H231.781V89H203.75V45.5938H198.406V30.7344H203.75V18.9219C203.75 13.7031 205.812 9.59375 209.938 6.59375C214.094 3.5625 219.234 2.04688 225.359 2.04688C233.359 2.04688 240.203 3.64062 245.891 6.82812V20.8438ZM266.094 0.78125C270.219 0.78125 273.328 1.875 275.422 4.0625C277.516 6.25 278.562 8.98438 278.562 12.2656C278.562 15.5469 277.266 18.4844 274.672 21.0781C272.078 23.6719 268.594 24.9688 264.219 24.9688C259.844 24.9688 256.641 23.9062 254.609 21.7812C252.578 19.625 251.562 16.9375 251.562 13.7188C251.562 10.5 252.953 7.54688 255.734 4.85938C258.516 2.14062 261.969 0.78125 266.094 0.78125ZM320.703 46.5781C318.203 46.5781 316.953 48.5938 316.953 52.625V89H289.109V30.7344H304.484L311.188 39.8281C313.688 36.3594 317.141 33.6094 321.547 31.5781C325.984 29.5469 330.125 28.5312 333.969 28.5312C341.031 28.5312 346.625 30.4062 350.75 34.1562C354.906 37.9062 356.984 42.9375 356.984 49.25V89H328.953V60.875C328.953 51.3438 326.203 46.5781 320.703 46.5781ZM401.562 28.625C405.281 28.625 409.109 29.2344 413.047 30.4531V10.1094H440.328V89H422.938L416.234 79.2969C410.516 86.8594 403 90.6406 393.688 90.6406C386.219 90.6406 379.688 88.1094 374.094 83.0469C368.531 77.9531 365.75 71.4375 365.75 63.5C365.75 55.5625 367.375 49.0312 370.625 43.9062C377.062 33.7188 387.375 28.625 401.562 28.625ZM413.047 48.4062C411.984 47.75 410.828 47.4219 409.578 47.4219C408.328 47.4219 407.125 47.6719 405.969 48.1719C403.594 49.2031 401.469 50.875 399.594 53.1875C398.594 54.3125 397.75 55.5156 397.062 56.7969C395.562 59.5469 394.812 62.2812 394.812 65C394.812 67.6875 395.641 69.5625 397.297 70.625C397.891 71 398.609 71.2031 399.453 71.2344C403.516 71.2344 408.047 69.1875 413.047 65.0938V48.4062Z" 
            fill="#D2CD35"
          />
        </svg>
      </div>
      <div className='flex flex-col gap-10 w-full max-w-lg'>
        <h1 className='text-4xl font-radio-canada-big gradient-text flex'>Sign Up</h1>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <Label value='Your username:' />
            <TextInput 
              type='text'
              placeholder='Username:'
              id='username'
              onChange={handleChange}
              className='w-full'
            />
            <Label value='Your email:' />
            <TextInput 
              type='email'
              placeholder='E.g. business@gmail.com'
              id='email'
              onChange={handleChange}
              className='w-full'
            />
            <Label value='Your password:' />
            <TextInput 
              type='password'
              placeholder='*********'
              id='password'
              onChange={handleChange}
              className='w-full'
            />
            <Button className='mt-4' type='submit' disabled={loading}>
            {
                loading ? (
                  <>
                      <Spinner size='sm' />
                      <span className='pl-3'>Loading</span>
                  </>
                ) : 'Sign Up'
              }
            </Button>
          </form>
          <div className="flex gap-4 border-t-2">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">
              Log in
            </Link>
          </div>
        </div>
        {/* use conditional rendering */}
        {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
        }
      </div>
    </div>
  )
}
