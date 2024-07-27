import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './Footer.jsx';

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="fixed top-0 left-0 h-full w-40 bg-red-800 text-white flex flex-col justify-between">
      <div className="flex flex-col mt-10 ml-10 gap-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 72 77" fill="none">
            <Link to='/'>
              <path d="M37.3125 76.8281C12.4688 76.8281 0.046875 66.2656 0.046875 45.1406V0.140625H29.625V44.2969C29.625 48.7344 31.1094 51.625 34.0781 52.9688C35.1094 53.4375 36.3438 53.6719 37.7812 53.6719C41.8438 53.6719 44.4062 51.7344 45.4688 47.8594C45.7812 46.7031 45.9375 45.4531 45.9375 44.1094V0.140625H71.8594V45.1406C71.8594 66.2656 60.3438 76.8281 37.3125 76.8281Z" fill="#D2CD35"/>
            </Link>
          </svg>
          <div className='flex flex-col gap-4'>
            {
              currentUser ? (
                <Link>
                  <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar alt='user' img={currentUser.profilePicture} rounded />
                  }
                >
                  <Dropdown.Header>
                    <span className='block text-sm'>Username: {currentUser.username}</span>
                    <span className='block text-sm font-medium truncate'>Email: {currentUser.email}</span>
                  </Dropdown.Header>
                  <Link to={`/profile/${currentUser._id}`}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignOut}>Log Out</Dropdown.Item>
                  </Dropdown>
                </Link>
              ) : (
                <>
                  <Link to='/signup' className="font-semibold text-xl">
                    Sign Up
                  </Link>
                  <Link to='/login' className='font-semibold text-xl'>
                    Log in
                  </Link>
                </>
              )             
            }
            <Footer />
          </div>
      </div>
    </div>
  )
}
