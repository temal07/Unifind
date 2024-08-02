import React from 'react';
import { useSelector } from 'react-redux';

export default function AcademicSituation() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='flex flex-col gap-5'>
      <div className='text-gray-400'>
        <h1 className='text-2xl'>Academic Situation for {currentUser.username}</h1>
      </div>
      <hr className='w-3/4' />
      {/* Info */}
      <div className='flex flex-col gap-5'>
        <div className='flex gap-1'>
          <div className=''>
            GPA:
          </div>
          <div className=''>
            { currentUser.academicSituation.gpa }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
            ACT Score:
          </div>
          <div className=''>
            { currentUser.academicSituation.actScore }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
            SAT Score:
          </div>
          <div className=''>
            { currentUser.academicSituation.satScore }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
            Extracurriculars:
          </div>
          <div className=''>
            { currentUser.academicSituation.extraCurriculars }
          </div>
        </div>
      </div>
    </div>
  )
}
