import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserTables from '../components/UserTables';
import { TextInput } from 'flowbite-react';

export default function UserSearch() {
    const [searchData, setSearchData] = useState({
        searchTerm: '',
    }); 

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [formSent, setFormSent] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');

        if (searchTermFromUrl) {
        setSearchData({
            ...searchData,
            searchTerm: searchTermFromUrl,
        });
        }

        const fetchUsers = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/user/get-users?${searchQuery}`);
            if (!res.ok) {
                setLoading(false);
                return;
            } else {
                const data = await res.json();
                setUsers(data.users);
                setLoading(false);
                console.log(data.users)
                if (data.users.length === 3) {
                setShowMore(true)
                } else {
                setShowMore(false);
                }
            }
        };

        fetchUsers();
    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSearchData({...searchData, searchTerm: e.target.value});
        }
    }

    const handleShowMore = async () => {
        const numOfUsers = users.length;
        const startIndex = numOfUsers;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();

        try {
            const res = await fetch(`/api/user/get-users?${searchQuery}`);
            if (res.ok) {
                const data = await res.json();
                setUsers((prevUsers) => [...prevUsers, ...data.users]);
                if (data.univs.length === 3) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.error('Failed to fetch users', error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(false);
        setFormSent(true);
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchData.searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search-users?${searchQuery}`);
    }

  return (
    <div className='flex flex-col md:flex-row ml-52'>   
        <div className='flex flex-col md:flex-row gap-4'>
            <div className='p-7 border-b md: border-r md:min-h-screen border-gray-500'>
            <div className='mb-10'>
                <h1 className='font-poppins text-4xl text-blue-400'>Search Users:</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2">
                <label className='whitespace-nowrap font-semibold'>
                    Search Term:
                </label>
                <TextInput 
                    placeholder='Search...'
                    id='searchTerm'
                    type='text'
                    value={searchData.searchTerm}
                    onChange={handleChange}
                /> 
                </div>
            </form>
            </div>
        </div>
        <div className="w-full pl-20">
          <h1 className="text-3xl font-semibold font-poppins mt-10">Search Results:</h1>
          <div className='p-7 flex flex-wrap gap-4'>
            {!loading && users.length === 0 && (
              <p className='text-xl text-gray-500'>No Users Found.</p>
            )}
            {loading && <p className='text-xl text-gray-500'>Loading...</p>}
            {!loading &&
              users && 
              formSent && 
              users.map((user) => <UserTables key={user._id} user={user} />)}
            {!loading && showMore && formSent && (
              <button
                onClick={handleShowMore}
                className='text-teal-500 text-lg hover:underline p-7 w-full'
              >
                Show More
              </button>
            )}
            {
                !loading && !formSent && (
                    <p className='text-2xl font-poppins text-gray-400'>Search Users...</p>                    
                )
            }
          </div>
        </div>
    </div>
  )
}
