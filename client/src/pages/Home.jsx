import React from 'react'
import { useSelector } from 'react-redux'
import CallToAction from '../components/CallToAction';
import SecondCTA from '../components/SecondCTA';

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='flex flex-col gap-10 ml-52'>
      <div className='flex flex-col mt-10'>
        <h1 className='text-4xl font-semibold bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 text-transparent bg-clip-text'>
          Welcome, {currentUser.username}
        </h1>
      </div>
      <hr className="border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0" />
      <div className='flex flex-col gap-5 mb-10'>
        <CallToAction />
        <div className='flex justify-end'>
          <SecondCTA  />
        </div>
      </div>
    </div>
  )
}
