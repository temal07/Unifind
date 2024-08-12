import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function UserProfile() {
    {/* Displays other people's profile */}
    const [user, setUser] = useState({
            username: '',
            email: '',
            profilePicture: '',
            academicSituation: {
                satScore: '',
                act: '',
                extraCurriculars: '',
            },
            basicInfo: {
                residency: '',
                currentGrade: '',
                financialSituation: '',
                description: '',
            },
            interests: {
                hobbies: '',
            },
            dreamtUnis: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userId } = useParams();

    console.log(user);

    useEffect(() => {
        if (user) {
          setUser({
            username: user.username || '',
            email: user.email || '',
            profilePicture: user.profilePicture || '',
            academicSituation: {
                satScore: user.academicSituation.satScore || '',
                act: user.academicSituation.act || '',
                extraCurriculars: user.academicSituation.extraCurriculars || '',
            },
            basicInfo: {
                residency: user.basicInfo.residency || '',
                currentGrade: user.basicInfo.currentGrade || '',
                financialSituation: user.basicInfo.financialSituation || '',
                description: user.basicInfo.description || '',
            },
            interests: {
                hobbies: user.interests.hobbies || '',
            },
            dreamtUnis: user.dreamtUnis || '',
          });
        }
      }, [userId]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/user/get-user/${userId}`);
                const data = await res.json();

                if (!res.ok) {
                    setError(data.message);
                    setLoading(false);
                } else {
                    setError(null);
                    setUser(data);
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchUser();
    }, [userId]);

  return (
    <div className='flex flex-col ml-52'>
        {/* Profile Photo */}
        <div className='flex flex-col mt-10 md:flex-row md:gap-20'>
            <div className=''>
                <img
                    src={user.profilePicture}
                    alt='user'
                    className={`rounded-full w-48 h-48 object-cover border-4 border-[lightgray]`}
                />
            </div>
            <div className='flex pt-5 md:pt-16'>
                <h1 className='text-6xl'>{user.username}</h1>
            </div>
        </div>
        <hr className="mt-5 border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0" />
        <div className='flex flex-col gap-5 mb-20'>
            <div>
                <h1 className='text-2xl mt-10 font-poppins'>Academic Information:</h1>
                <hr className='border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0'/>
                <div className='flex flex-col gap-5 pt-5'>
                    <div className='flex gap-1'>
                        <div className="">
                            GPA:
                        </div>
                        <div className="">
                            { user.academicSituation.gpa }
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className="">
                            SAT:
                        </div>
                        <div className="">
                            { user.academicSituation.satScore }
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className="">
                            ACT:
                        </div>
                        <div className="">
                            { user.academicSituation.actScore }
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className="">
                            Extracurriculars:
                        </div>
                        <div className="">
                            { user.academicSituation.extraCurriculars }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-2xl mt-10 font-poppins'>Basic Information:</h1>
                <hr className='border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0'/>
                <div className='flex flex-col gap-5 pt-5'>
                    <div className='flex gap-1'>
                        <div className="">
                            Residency:
                        </div>
                        <div className="">
                            { user.basicInfo.residency }
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className="">
                            Current Grade:
                        </div>
                        <div className="">
                            { user.basicInfo.currentGrade }
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className="">
                            Financial Status:
                        </div>
                        <div className="">
                            { user.basicInfo.financialSituation }
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className="">
                            Description:
                        </div>
                        <div className="">
                            { user.basicInfo.description }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-2xl mt-10 font-poppins'>Interests:</h1>
                <hr className='border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0'/>
                <div className='flex flex-col gap-5 pt-5'>
                    <div className='flex gap-1'>
                        <div className="">
                            Hobbies:
                        </div>
                        <div className="">
                            { user.interests.hobbies }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-2xl mt-10 font-poppins'>Dreamt Universities:</h1>
                <hr className='border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0'/>
                <div className='flex flex-col gap-5 pt-5'>
                    <div className='flex gap-1'>
                        <div className="">
                            Dreamt Universities:
                        </div>
                        <div className="">
                            { user.dreamtUnis }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
