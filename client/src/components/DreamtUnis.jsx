import React from 'react';
import { useSelector } from 'react-redux';

export default function DreamtUnis() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='flex flex-col gap-5'>
      <div className='text-gray-400'>
        <h1 className='text-2xl'>Account Info for {currentUser.username}</h1>
      </div>
      <hr className='w-3/4' />
      {/* Info */}
      <div className='flex flex-col gap-5'>
        <div className='flex gap-1'>
          <div className=''>
            Username:
          </div>
          <div className=''>
            { currentUser.username }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
            Email:
          </div>
          <div className=''>
            { currentUser.email }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
            Date Joined:
          </div>
          <div className=''>
            { new Date(currentUser.createdAt).toLocaleString() }
          </div>
        </div>
      </div>
    </div>
  )
}
