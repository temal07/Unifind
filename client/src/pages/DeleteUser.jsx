import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice.js';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DeleteUser() {
    const { currentUser } = useSelector((state) => state.user);

    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const handleDeleteAccount = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete-user/${currentUser._id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (res.ok) {
                dispatch(deleteUserSuccess(data));
                
                navigate('/');
            } else {
                dispatch(deleteUserFailure(data.message));
            }

        } catch (error) {
            dispatch(deleteUserFailure(error.message));            
        }
    }


  return (
    <div className='flex flex-col ml-52 mt-10'>
        <div className='gap-52'>
            <div className='mb-10'>
                <h1 className='flex text-4xl text-gray-400 justify-center'>Confirm the Deletion of Your Account ({ currentUser.username })</h1>
            </div>
            <div>
            <div className='flex flex-col gap-5'>
                <div className='text-gray-400'>
                    <h1 className='text-2xl'>Account Info for {currentUser.username}</h1>
                </div>
                <hr className='border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0' />
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
                <div className='text-gray-400'>
                    <h1 className='text-2xl'>Basic Info for {currentUser.username}</h1>
                </div>
                <hr className='border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0' />
                {/* Info */}
                <div className='flex flex-col gap-5'>
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
                            Description:
                        </div>
                        <div className=''>
                            { currentUser.basicInfo.description }
                        </div>
                    </div>
                </div>
                <div className='text-gray-400'>
                    <h1 className='text-2xl'>Academic Situation for {currentUser.username}</h1>
                </div>
                <hr className='border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0' />
                {/* Info */}
                <div className='flex flex-col gap-5'>
                    <div className='flex gap-1'>
                        <div className=''>
                            ACT:
                        </div>
                        <div className=''>
                            { currentUser.academicSituation.actScore }
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <div className=''>
                            SAT:
                        </div>
                        <div className=''>
                            { currentUser.academicSituation.satScore }
                        </div>
                    </div>
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
                            Extracurriculars:
                        </div>
                        <div className=''>
                            { currentUser.academicSituation.extraCurriculars }
                        </div>
                    </div>
                </div>
                <div className='text-gray-400'>
                    <h1 className='text-2xl'>Interests for {currentUser.username}</h1>
                </div>
                <hr className='border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0' />
                {/* Info */}
                <div className='flex flex-col gap-5'>
                    <div className='flex gap-1'>
                        <div className=''>
                            Hobbies:
                        </div>
                        <div className=''>
                            { currentUser.interests.hobbies }
                        </div>
                    </div>
                </div>
            </div>
                <Button 
                    gradientMonochrome={'failure'} 
                    className='w-40 mb-10 mt-10'
                    onClick={() => setShowModal(true)}
                >
                    Delete Account
                </Button>
            </div>
        </div>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you REALLY sure you want to delete your account?
                (Note: This action CANNOT be reversed!)
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteAccount}>
                  Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
      </Modal>
    </div>
  )
}
