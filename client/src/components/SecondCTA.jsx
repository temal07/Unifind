import React from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function SecondCTA() {
  return (
    <div className='p-3 border border-teal-500 rounded-tl-3xl rounded-br-3xl shadow-lg max-w-lg mr-20'>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 p-3">
          <h2 className='text-xl sm:text-2xl'>
            How to choose which college is the best for you?
          </h2>
          <p className='text-gray-500 my-2 text-sm sm:text-base'>
            This article from Forbes explains the elements behind a 
            college decision.
          </p>
          <Button color='dark' className='rounded-tl-xl rounded-bl-none'>
            <a 
                href={`https://www.forbes.com/advisor/education/online-colleges/what-college-should-i-go-to/`}
                target='_blank' 
                rel='noopener noreferrer'
            >
              Check it Out!    
            </a>
          </Button>
        </div>
        <div className="p-3">
          <img 
            src="https://thumbor.forbes.com/thumbor/fit-in/1290x/https://www.forbes.com/advisor/wp-content/uploads/2024/03/image1-3.jpg" 
            alt="Celebration" 
            className="w-full max-w-[200px] rounded-md"
          />
          <div className='pt-2'>
            <h1 className='text-gray-400 text-md'>Credit: Getty</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
