import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '@/lib/firebase'; // Your firebase instance
import { login, logout } from '@/store/authSlice'; // Importing login and logout from authSlice
import { setUser } from '@/store/userSlice'; // Importing setUser from userSlice

const AuthListener: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        dispatch(login()); // Ensure login action is defined properly
        dispatch(setUser({
          name: user.displayName || '',
          email: user.email || '',
          photoUrl: user.photoURL || '',
          balance: 0, // Initial balance set to 0
        }));
      } else {
        // User is signed out.
        dispatch(logout()); // Ensure this is correctly imported
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return null; // No UI rendered by this component
};

export default AuthListener;
