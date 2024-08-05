import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='flex flex-col gap-10 ml-52'>
      <div className='flex flex-col mt-10 justify-center'>
        <h1 className='text-4xl font-semibold bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 text-transparent bg-clip-text'>
          Welcome, {currentUser.username}
        </h1>
      </div>
    </div>
  )
}
