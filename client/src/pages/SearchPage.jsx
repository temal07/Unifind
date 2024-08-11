import { Button, Select, TextInput } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UnivCard from '../components/UnivCard';

export default function SearchPage() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
  });

  const [univs, setUnivs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('q');

    if (searchTermFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
      });
    }

    const fetchUnivs = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/univs/get-univs?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      } else {
        const data = await res.json();
        setUnivs(data.univs);
        setLoading(false);
        console.log(data.univs)
        if (data.univs.length === 3) {
          setShowMore(true)
        } else {
          setShowMore(false);
        }
      }
    };
    fetchUnivs();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({...sidebarData, searchTerm: e.target.value});
    }
  }

  const handleShowMore = async () => {
    const numberOfUnivs = univs.length;
    const startIndex = numberOfUnivs;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();

    try {
      const res = await fetch(`/api/univs/get-univs?${searchQuery}`);
      if (res.ok) {
        const data = await res.json();
        setUnivs((prevUnivs) => [...prevUnivs, ...data.univs]);
        if (data.univs.length === 3) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error('Failed to fetch more universities', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('q', sidebarData.searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  return (
    <div className='flex flex-col ml-52'>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
          <div className='mb-10'>
            <h1 className='font-poppins text-4xl text-blue-400'>Search Universities:</h1>
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
                value={sidebarData.searchTerm}
                onChange={handleChange}
              /> 
            </div>
          </form>
        </div>
        <div className="w-full">
          <h1 className="text-3xl font-semibold font-poppins">Search Results:</h1>
          <div className='p-7 flex flex-wrap gap-4'>
            {!loading && univs.length === 0 && (
              <p className='text-xl text-gray-500'>No Universities Found.</p>
            )}
            {loading && <p className='text-xl text-gray-500'>Loading...</p>}
            {!loading &&
              univs &&
              univs.map((univ) => <UnivCard key={univ._id} univ={univ} />)}
            {showMore && (
              <button
                onClick={handleShowMore}
                className='text-teal-500 text-lg hover:underline p-7 w-full'
              >
                Show More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
