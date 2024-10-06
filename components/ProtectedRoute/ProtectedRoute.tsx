import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // Adjust the path as necessary
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user?.email) {
      router.push('/signin'); // Redirect to sign-in page if user is not logged in
    }
  }, [user, router]);

  return <>{user?.email ? children : null}</>;
};

export default ProtectedRoute;
