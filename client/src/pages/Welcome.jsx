import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import UniversityCard from '../components/UniversityCard';

export default function Welcome() {
  const sampleData = [
    {
        name: 'Stanford University',
        description:
          `Stanford was founded almost 150 years
           ago on a bedrock of societal purpose. 
           Our mission is to contribute to the 
           world by educating students for lives of leadership 
           and contribution with integrity; advancing 
           fundamental knowledge and cultivating creativity; 
           leading in pioneering research for effective 
           clinical therapies; and accelerating solutions and amplifying their impact.`,
        image: 'https://cdn.britannica.com/25/121725-050-8BF363EC/Hoover-Tower-Stanford-University-California.jpg',
        link: 'https://www.stanford.edu',
    },
    {
        name: 'New York University',
        description: `
            Since its founding in 1831, NYU has been an 
            innovator in higher education, reaching out to an emerging 
            middle class, embracing an urban identity 
            and professional focus, and promoting a global vision 
            that informs its 20 schools and colleges.
        `,
        image: 'https://lh3.googleusercontent.com/p/AF1QipPSoUF3RjuuvmQzRLj0Lfb61fT2reMxGucj0Fph=s680-w680-h510',
        link: 'https://www.nyu.edu',
    },
    {
        name: 'UNC-Chapel Hill',
        description: `
            UNC-Chapel Hill is at the heart of what is next, 
            preparing talented students from different perspectives and 
            life experiences to become creators, explorers, entrepreneurs 
            and leaders. Tar Heels develop a voice for critical thought 
            and the courage to guide change.
        `,
        image: 'https://www.unc.edu/wp-content/uploads/2023/08/SouthBuildingStoryTellingStatistics-1200x1200.png',
        link: 'https://www.unc.edu',
    }
  ]

  return (
    <div className='flex flex-col ml-52'>
      <div className='flex flex-col mt-20 gap-10'>
        <div className='flex flex-col  gap-10'>
          <h1 className='text-4xl md:text-6xl flex justify-center'>Welcome to <span className="font-rammetto-one text-yellow-300 gap-1">Unifind</span></h1>
          <p className='md:text-2xl text-lg'>
            Unifind is an AI-integrated software
            whose purpose is to make university decisions easier to Highschool Graduates 
            by using Google's Gemini
          </p>
        </div>
        <div className='flex flex-col gap-5'>
          <div className="flex gap-5">
            <div className="w-1/2 flex flex-col gap-48">
              <UniversityCard university={sampleData[0]} />
              <UniversityCard university={sampleData[2]} />
            </div>
            <div className="w-1/2 flex justify-end mr-32 mt-48">
              <UniversityCard university={sampleData[1]} />
            </div>
          </div>
          <p className='text-2xl'>Unifind is a great fit if:</p>
          <div className=''>
            <ul className='list-disc ml-10 text-xl'>
              <li>You are struggling to apply to colleges</li>
              <li>You have a college in your mind but don't know the college well enough</li>
              <li>One of your friend is struggling/having a hard time during the application process</li>
              <li>etc.</li>
            </ul>
          </div>
          <div className='mb-20'>
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
