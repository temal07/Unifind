import React from 'react';
import { useSelector } from 'react-redux';

export default function DreamtUnis() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='flex flex-col gap-5'>
      <div className='text-gray-400'>
        <h1 className='text-2xl'>Universities Dreamt for {currentUser.username}</h1>
      </div>
      <hr className='w-3/4' />
      {/* Info */}
      <div className='flex flex-col gap-5'>
        
      </div>
    </div>
  )
}
