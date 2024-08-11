import React from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <div className='p-3 border border-teal-500 rounded-tl-3xl rounded-br-3xl shadow-lg max-w-lg mr-20'>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 p-3">
          <h2 className='text-xl sm:text-2xl'>
            Want to find your perfect college?
          </h2>
          <p className='text-gray-500 my-2 text-sm sm:text-base'>
            Check out our AI chat assistant built with Gemini
          </p>
          <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
            <Link to='/recommendation'>
              Find My University    
            </Link>
          </Button>
        </div>
        <div className="p-3">
          <img 
            src="https://graduatecoach.co.uk/wp-content/uploads/2019/09/academy-celebrate-celebration-267885-1-1024x683.jpg" 
            alt="Celebration" 
            className="w-full max-w-[200px] rounded-md"
          />
          <div className='pt-2'>
            <h1 className='text-md text-gray-400'>Credit: Graduate Coach</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
