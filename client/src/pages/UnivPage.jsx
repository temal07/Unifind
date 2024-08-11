import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UnivPage() {
  const { universityId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [university, setUniversity] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (university) {
      setUniversity({
        name: university.name || '',
        location: university.location || '',
        tuition: university.tuition || '',
        rankingCountry: university.rankingCountry || '',
        rankingGlobal: university.rankingGlobal || '',
        scholarship: university.scholarship || '',
        acceptanceRate: university.acceptanceRate || '',
        satAverage: university.satAverage || '',
        averageGPA: university.averageGPA || '',
      });
    }
  }, [universityId]);

  useEffect(() => {
    const fetchUniv = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/univs/get-university/${universityId}`);
        if (!res.ok) {
          const data = await res.json();
          setErrorMessage(`Error fetching University: ${data.message}`);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setUniversity(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
        setUniversity(null);
      }
    };

    fetchUniv();
  }, [universityId]); 

  return (
    <div className='flex flex-col ml-52'>
      <div className='flex flex-row gap-20 mb-10'>
        <div className='mt-10'>
          <img
            src='https://cdn.iconscout.com/icon/premium/png-256-thumb/university-6-356355.png'
            alt='university'
            className={`rounded-full w-48 h-48 object-cover border-4 border-[lightgray]`}
          />
        </div>
        <div className='mt-32'>
            <p className='font-poppins text-3xl max-w-sm'>{university.name}</p>
        </div>
      </div>
      <hr className="border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0" />
      <div className='flex flex-col gap-5 mb-10'>
        <div className='mt-10'>
          <h1 className='font-poppins text-4xl'>University Info</h1>
        </div>
        <div className='flex gap-1'>
          <div className=''>
          <span className='font-bold'>Name:</span>
          </div>
          <div className=''>
            { university.name }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
          <span className='font-bold'>Location:</span>
          </div>
          <div className=''>
            { university.location }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
            <span className='font-bold'>Average SAT Required:</span>
          </div>
          <div className=''>
            { university.satAverage }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
            <span className='font-bold'>Average GPA Required:</span>
          </div>
          <div className=''>
            { university.averageGPA }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
          <span className='font-bold'>Acceptance Rate:</span>
          </div>
          <div className=''>
            { university.acceptanceRate }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
          <span className='font-bold'>Scholarship:</span>
          </div>
          <div className=''>
            { university.scholarship === true ? 'Yes' : 'No' }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
          <span className='font-bold'>Global Ranking:</span>
          </div>
          <div className=''>
            { university.rankingGlobal }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
          <span className='font-bold'>Country Ranking:</span>
          </div>
          <div className=''>
            { university.rankingCountry }
          </div>
        </div>
        <div className='flex gap-1'>
          <div className=''>
          <span className='font-bold'>Tuition:</span>
          </div>
          <div className=''>
            { university.tuition } (Note: Consider the currency. They may be different depending on the country)
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-10 justify-center items-center gap-4">
        <div>
          <h1 className='font-poppins text-gray-400'>
            Note: Information about universities MAY NOT be true.
            Research on one's own is highly recommended. 
          </h1>
        </div>
        <div>
          <h1 className='font-poppins text-gray-400'>
            Information created by Gemini AI
          </h1>
        </div>
      </div>
    </div>
  )
}
