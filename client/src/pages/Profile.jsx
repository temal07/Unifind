import { Button, Modal, Navbar } from 'flowbite-react';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function Profile() {
    const [userDeletedError, setUserDeletedError] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const path = useLocation().pathname;
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const baseRoute = `/profile/${currentUser._id}`;

  return (
    <div className='flex flex-col gap-5 ml-52'>
        {/* Profile Photo */}
        <div className='flex flex-col mt-10 md:flex-row md:gap-20'>
            <div className=''>
                <img
                    src={currentUser.profilePicture}
                    alt='user'
                    className={`rounded-full w-48 h-48 object-cover border-4 border-[lightgray]`}
                />
            </div>
            <div className='flex pt-5 md:pt-16'>
                <h1 className='text-6xl'>{ currentUser.username }</h1>
            </div>
        </div>
        <hr className="border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0" />
        <div className=''>
            <Navbar>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link active={path === `${baseRoute}/accountInfo`} as={'div'}>
                        <Link to='accountInfo'>About the Account</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === `${baseRoute}/basicInfo`} as={'div'}>
                        <Link to='basicInfo'>Basic Info</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === `${baseRoute}/interests`} as={'div'}>
                        <Link to='interests'>Interests</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === `${baseRoute}/academicSituation`} as={'div'}>
                        <Link to='academicSituation'>Academic Situation</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === `${baseRoute}/dreamtUnis`} as={'div'}>
                        <Link to='dreamtUnis'>Universities Dreamt of</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
        <div className='mb-20'>
            <Outlet />
        </div>
    </div>
  )
}
