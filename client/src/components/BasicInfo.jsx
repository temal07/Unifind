import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function BasicInfo() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='flex flex-col gap-5'>
      <div className='text-gray-400'>
        <h1 className='text-2xl'>Basic Info for {currentUser.username}</h1>
      </div>
      <hr className='w-3/4' />
      {/* Info */}
      <div className='flex flex-col gap-5'>
        <div className='flex gap-1'>
          <div className=''>
            Residency:
          </div>
          <div className=''>
            { currentUser.basicInfo.residency }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
            Current Grade:
          </div>
          <div className=''>
            { currentUser.basicInfo.currentGrade }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
            Financial Situation:
          </div>
          <div className=''>
            { currentUser.basicInfo.financialSituation }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
            Description of the User:
          </div>
          <div className=''>
            { currentUser.basicInfo.description }
          </div>
        </div>
      </div>
    </div>
  )
}
