import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from 'react-icons/ai';
import { app } from '../firebase.js';
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // initialise the auth at the top before the handleGoogleClick func
    const auth = getAuth(app);
    const handleGoogleClick = async () => {
        // create a provider
        const provider = new GoogleAuthProvider();
        // this way, google will always ask you to 
        // select an account before logging you in
        provider.setCustomParameters({prompt: 'select_account'});

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            // get the response from google
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoURL: resultsFromGoogle.user.photoURL,
                })
            });
            const data = await res.json();

            if (res.ok) {
                // if the data is OK, we want to call signInSuccess
                // func in the redux store to log the user in
                dispatch(signInSuccess(data));
                // send the user to the home page
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(`Error during authentication: ${error.message}`));            
        }
    }    

    return (
        <Button gradientDuoTone={'purpleToBlue'} type='button' onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
            Continue with Google
        </Button>
    )
}