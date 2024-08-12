import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './Footer.jsx';
import { Dropdown, Avatar, TextInput, Button } from 'flowbite-react';
import { signOutSuccess } from '../redux/user/userSlice.js';
import { AiOutlineSearch } from 'react-icons/ai'

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Ensure useNavigate is imported and used
  const path = useLocation().pathname;
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get('q');

    if (searchTermFromURL) {
      setSearchTerm(searchTermFromURL);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        navigate('/'); // Ensure navigate is called after dispatch
      }
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('q', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`search?${searchQuery}`);
  }

  return (
    <div className="fixed top-0 left-0 h-full w-40 bg-red-800 text-white flex flex-col justify-between">
      <div className="flex flex-col mt-10 gap-10">
        <svg xmlns="http://www.w3.org/2000/svg" className='ml-10' width="55" height="55" viewBox="0 0 72 77" fill="none">
          <Link to='/'>
            <path d="M37.3125 76.8281C12.4688 76.8281 0.046875 66.2656 0.046875 45.1406V0.140625H29.625V44.2969C29.625 48.7344 31.1094 51.625 34.0781 52.9688C35.1094 53.4375 36.3438 53.6719 37.7812 53.6719C41.8438 53.6719 44.4062 51.7344 45.4688 47.8594C45.7812 46.7031 45.9375 45.4531 45.9375 44.1094V0.140625H71.8594V45.1406C71.8594 66.2656 60.3438 76.8281 37.3125 76.8281Z" fill="#D2CD35"/>
          </Link>
        </svg>
        <div className='flex flex-col gap-4'>
          {
            currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar 
                    alt='user' 
                    img={currentUser.profilePicture} 
                    rounded
                    className='ml-10'
                  />
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
            ) : (
              <>
                <Link to='/signup' className="font-semibold text-xl ml-10">
                  Sign Up
                </Link>
                <Link to='/login' className='font-semibold text-xl ml-10'>
                  Log in
                </Link>
              </>
            )
          }
        </div>
        {
          currentUser &&
          <>
            <Link to='/recommendation' className='text-xl ml-5'>
              Chat to AI
            </Link>
            <Link to='/search-users' className='text-xl ml-5'>
              Search Users
            </Link>
            <Link to={`/settings/${currentUser._id}`} className='text-xl ml-5'>
              Settings ⚙️
            </Link>
            {/* Search Bar */}
          <form onSubmit={handleSubmit} className='flex justify-center pl-5 pr-5'>
            <TextInput 
              type='text'
              placeholder='Search Universities'
              rightIcon={AiOutlineSearch}
              className='hidden lg:inline'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <Button className='w-12 h-10 lg:hidden sm:ml-10' color='gray' pill>
            <AiOutlineSearch />
          </Button>
          </> 
        }
        <Footer />
      </div>
    </div>
  );
}
