// AuthProvider.jsx

// Import necessary libraries and Firebase functions
import React, { createContext, useState,useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
 // Import Firebase app instance
import { app } from '../config/firebase.init';
import axios from 'axios';




// Create Auth context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  // Initialize Firebase Authentication using the imported app
  const auth = getAuth(app);

  // Signup function with error handling
  const signup = async (email, password) => {
    try {
      setLoader(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      setError(error.code);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  // Login function with error handling
  const login = async (email, password) => {
    try {
      setLoader(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      setError(error.code);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  const logout = async () =>{
    try{
        setLoader(true);
        return await signOut(auth);

    }catch(error){
      setError(error.code);
      throw error;
    }finally {
      setLoader(false); // Reset loader regardless of success or failure
      setUser(null); // Optionally clear user state on logout
    }
  }

  const updateUser = async (name, photo) => {
    try {
      setLoader(true); // Start loader
      // Correctly call updateProfile with the user and the profile data object
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      // Update the user state with the current user information
      setUser({ ...auth.currentUser, displayName: name, photoURL: photo });
    } catch (error) {
      setError(error.code); // Set error if it occurs
      throw error; // Rethrow the error for handling elsewhere
    } finally {
      setLoader(false); // Stop loader regardless of success or failure
    }
  };

  //using google login

  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () =>{
    try {
      setLoader(true)
      return await signInWithPopup(auth,googleProvider);
    } catch (error) {
      setError(error.code);
      throw error;
    } finally {
      setLoader(false);
    }
  }

  //observer for users

useEffect(() =>{
    const unSubscribe = auth.onAuthStateChanged((user) =>{
      setUser(user)

      if(user){
        axios.post('http://localhost:3000/api/set-token',{email:user.email, name: user.displayName})
        .then((data)=>{
          if(data.data.token){
            localStorage.setItem('token',data.data.token);

          }
        })
      }else{
        localStorage.removeItem('token');
        setLoader(false)
      }
    })
return () =>unSubscribe()

},[])
  

  // Context value to pass user and other utilities
  const contextValue = { user, signup, login,logout,updateUser,googleLogin, loader, error, setUser };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
