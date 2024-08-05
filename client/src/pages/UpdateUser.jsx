import { Label ,Avatar, Button, TextInput, Alert } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';

export default function UpdateUser() {
    const [formData, setFormData] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(formData);
    }, []); 

    // Populate formData with currentUser data when component mounts
    useEffect(() => {
        if (currentUser) {
            setFormData({
                username: currentUser.username || '',
                email: currentUser.email || '',
                profilePicture: currentUser.profilePicture || '',
                password: '', // Typically, you don't pre-fill passwords for security reasons
                residency: currentUser.basicInfo.residency || '',
                currentGrade: currentUser.basicInfo.currentGrade || '',
                financialSituation: currentUser.basicInfo.financialSituation || '',
                description: currentUser.basicInfo.description || '',
                hobbies: currentUser.interests.hobbies || '',
                gpa: currentUser.academicSituation.gpa || '',
                act: currentUser.academicSituation.actScore || '',
                sat: currentUser.academicSituation.satScore || '',
                extraCurriculars: currentUser.academicSituation.extraCurriculars || '',
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made');
            return;
        }

        setUpdateUserError(null);
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update-user/${currentUser._id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(formData),
            }); 
            const data = await res.json();

            if (res.ok) {
                setUpdateUserError(null);
                dispatch(updateSuccess(data));
                console.log(data);
                setUpdateUserSuccess("User's profile has successfully ben updated");
                navigate(`/profile/${currentUser._id}`);
            } else {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message)
            }
            
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
        }
    }

    return (
    <div className='flex flex-col ml-52 mt-10'>
        <div className='gap-52'>
            <div className='mb-5'>
                <h1 className='flex text-4xl text-gray-400 justify-center'>Update your Profile ({ currentUser.username })</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-5 mb-10'>
                        <div className=''>
                            <h1 className='text-xl text-gray-400'>Profile Picture</h1>
                        </div>
                        <hr className='border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0'/>
                        <img
                            src={currentUser.profilePicture}
                            alt='user'
                            className={`rounded-full w-48 h-48 object-cover border-4 border-[lightgray]`}
                        />
                        <h1 className='text-lg text-gray-400'>(Click on the profile picture to update)</h1>
                        <div className=''>
                            <h1 className='text-xl text-gray-400'>About Account</h1>
                        </div>
                        <hr className="border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0" />
                        <Label value='Your Username:' />
                        <TextInput 
                            type='text'
                            placeholder='Username:'
                            required
                            id='username'
                            className='flex-1 w-72'
                            onChange={handleChange}
                            value={formData.username}
                        />
                        <Label value='Your email:' />
                        <TextInput 
                            type='email'
                            placeholder='Email:'
                            required
                            id='email'
                            className='flex-1 w-72'
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <Label value='Your Password:' />
                        <TextInput 
                            type='password'
                            placeholder='Password:'
                            required
                            id='password'
                            className='flex-1 w-72'
                            onChange={handleChange}
                            value={formData.password}
                        />
                        <div className=''>
                            <h1 className='text-xl text-gray-400'>Basic Info</h1>
                        </div>
                        <hr className="border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0" />
                        <Label value='Your Residency:' />
                        <TextInput 
                            type='text'
                            placeholder='Residency:'
                            required
                            id='residency'
                            className='flex-1 w-72'
                            onChange={handleChange}
                            value={formData.residency}
                        />
                        <Label value='Your Current Grade:' />
                        <TextInput 
                            type='text'
                            placeholder='Current Grade:'
                            required
                            id='currentGrade'
                            className='flex-1 w-72'
                            onChange={handleChange}
                            value={formData.currentGrade}
                        />
                        <Label value='Your Financial Situation:' />
                        <TextInput 
                            type='text'
                            placeholder='Financial Situation:'
                            required
                            id='financialSituation'
                            className='flex-1 w-72'
                            onChange={handleChange}
                            value={formData.financialSituation}
                        />
                        <Label value='Description of Yourself:' />
                        <TextInput 
                            type='text'
                            placeholder='Description:'
                            required
                            id='description'
                            className='flex-1 w-72'
                            onChange={handleChange}
                            value={formData.description}
                        />
                        <div className=''>
                            <h1 className='text-xl text-gray-400'>Interests Info</h1>
                        </div>
                        <hr className="border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0" />
                        <Label value='Your Hobbies:' />
                        <TextInput 
                            type='text'
                            placeholder='Hobbies:'
                            required
                            id='hobbies'
                            className='flex-1 w-72'
                            onChange={handleChange}
                            value={formData.hobbies}
                        />                        
                        <div className=''>
                            <h1 className='text-xl text-gray-400'>Academic Info</h1>
                        </div>
                        <hr className="border-0 bg-gray-400 h-0.5 w-9/12 mx-0 my-0" />
                        <Label value='Your GPA:' />
                        <TextInput 
                            type='text'
                            placeholder='GPA:'
                            required
                            id='gpa'
                            className='flex-1 w-72'
                            onChange={handleChange}                        
                            value={formData.gpa}
                        />
                        <Label value='Your ACT:' />
                        <TextInput 
                            type='text'
                            placeholder='ACT Score:'
                            required
                            id='act'
                            className='flex-1 w-72'
                            onChange={handleChange}                        
                            value={formData.act}
                        />
                        <Label value='Your SAT:' />
                        <TextInput 
                            type='text'
                            placeholder='SAT Score:'
                            required
                            id='sat'
                            className='flex-1 w-72'
                            onChange={handleChange}                        
                            value={formData.sat}
                        />
                        <Label value='Your Extracurriculars:' />
                        <TextInput 
                            type='text'
                            placeholder='Extracurriculars:'
                            required
                            id='extraCurriculars'
                            className='flex-1 w-72'
                            onChange={handleChange}
                            value={formData.extraCurriculars}
                        />
                    </div>
                    <Button className='mb-10' type='submit' gradientDuoTone={'purpleToBlue'}>
                        Apply
                    </Button>
                </form>
            </div>
            <div>
                {/* Use conditional rendering */}
                {
                    updateUserError && (
                        <Alert className='mt-5 mb-20 w-60' color='failure'>
                            {updateUserError}
                        </Alert>
                    )
                }
            </div>
        </div>
    </div>
  )
}
