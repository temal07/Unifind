import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className='flex flex-col ml-52'>
      <div className='flex flex-col mt-20 gap-10'>
        <div>
          <h1 className='text-4xl md:text-6xl'>Welcome to <span className="font-rammetto-one text-yellow-300">Unifind</span></h1>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='md:text-2xl text-lg'>
            Unifind is an AI-integrated software
            whose purpose is to make university decisions easier to Highschool Graduates 
            by using Google's Gemini
          </p>
          <p className='text-2xl'>Unifind is a great fit if:</p>
          <div className=''>
            <ul className='list-disc ml-10 text-xl'>
              <li>You are struggling to apply to colleges</li>
              <li>You have a college in your mind but don't know the college well enough</li>
              <li>One of your friend is struggling/having a hard time during the application process</li>
              <li>etc.</li>
            </ul>
          </div>
          <div className=''>
            <p className='text-lg flex gap-1'>
              <span><Link to='/login' className='text-blue-500'>Login</Link></span>
              if you have an account. If you don't, 
              <span>
                <Link to='/signup' className='text-blue-500'>sign up here.</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
