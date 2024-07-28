import React from 'react'

export default function About() {
  return (
    <div className='flex flex-col gap-10 ml-52'>
      <div className='mt-20'>
        <h1 className='text-4xl md:text-6xl font-rammetto-one text-yellow-300'>About Unifind</h1>
      </div>
      <div className='flex flex-col gap-4'>
        <p className='text-xl font-rammetto-one'>Unifind's Mission is simple:</p>
        <div className=''>
          <p className='flex justify-center font-radio-canada-big text-xl'>
            We believe that by this beneficial usage of AI, not only graduates, but all high school students
            will be able to explore this useful application and gain insight about the universities they might 
            apply in the future.
          </p>
        </div>
      </div>
    </div>
  )
}
