import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom';
import { Navbar } from 'flowbite-react';

export default function Settings() {
    const { currentUser } = useSelector((state) => state.user);
    const path = useLocation().pathname;
    const baseRoute = `/profile/${currentUser._id}`;

  return (
    <div className='flex flex-col ml-52 gap-10'>
        <div className='flex justify-center mt-10'>
            <h1 className='text-4xl text-gray-400'>Manage your Settings </h1>
        </div>
        <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-xl text-gray-400'>Manage Your Account</h1>
                <hr className='border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0' />
                <div className=''>
                        <Navbar>
                            <Navbar.Toggle />
                            <Navbar.Collapse>
                                <div className='flex flex-col gap-5'>
                                    <Navbar.Link active={path === `${baseRoute}/updateUser`} as={'div'}>
                                        <Link to={`/profile/${currentUser._id}/updateUser`}>
                                            <span className='text-blue-600 text-xl'>Update User</span>
                                        </Link>
                                    </Navbar.Link>
                                    <Navbar.Link active={path === `${baseRoute}/deleteUser`} as={'div'}>
                                        <Link to={`/profile/${currentUser._id}/deleteUser`}>
                                            <span className='text-red-600 text-xl'>Delete Account</span>
                                        </Link>
                                    </Navbar.Link>
                                </div>
                            </Navbar.Collapse>
                        </Navbar>
                </div>
            </div>
        </div>
    </div>
  )
}
