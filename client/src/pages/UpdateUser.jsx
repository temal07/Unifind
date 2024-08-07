import { Label ,Avatar, Button, TextInput, Alert, Textarea } from 'flowbite-react';
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice.js';
import { app } from '../firebase.js';
import { 
    getStorage, 
    getDownloadURL, 
    ref, 
    uploadBytesResumable
} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function UpdateUser() {
    const [formData, setFormData] = useState({});
    // extract currentUser, the error field and loading field from the state.user state
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);

    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const filePickerRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handles Image changes
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        if (imageFile) {
            handleUploadImage()
        }
    }, [imageFile]);

    const handleUploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage,  fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed', 
            (snapshot) => {
                // gets the percentage (e.g. image is 30% uploaded)
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError(
                    'Could not upload image (File must be less than 2MB)'
                );
                setImageFileUploadProgress(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setImageFileUrl(downloadUrl);
                    setFormData({...formData, profilePicture: downloadUrl});
                    setImageFileUploading(false);
                });
            }
        );
    };

    // Populate formData with currentUser data when component mounts
    useEffect(() => {
        if (currentUser) {
            setFormData({
                username: currentUser.username || '',
                email: currentUser.email || '',
                profilePicture: currentUser.profilePicture || '',
                password: '',
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

        if (imageFileUploading) {
            setUpdateUserError('Please wait for the image to upload');
            return;
        }

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
                        <input 
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                            ref={filePickerRef}
                            hidden
                        /> 
                        <div
                            className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                            onClick={() => filePickerRef.current.click()}
                        >
                            {imageFileUploadProgress && (
                                <CircularProgressbar
                                value={imageFileUploadProgress || 0}
                                text={`${imageFileUploadProgress}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    },
                                    path: {
                                    stroke: `rgba(62, 152, 199, ${
                                        imageFileUploadProgress / 100
                                    })`,
                                    },
                                }}
                                />
                            )}
                            <img
                                src={imageFileUrl || currentUser.profilePicture}
                                alt='user'
                                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                                imageFileUploadProgress &&
                                imageFileUploadProgress < 100 &&
                                'opacity-60'
                                }`}
                            />
                        </div>
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
                        <Textarea
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
