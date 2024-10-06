import React from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase'; // Adjust the import path based on your project structure
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store'; // Adjust the import path based on your project structure
import { logout } from '@/store/actions/authActions'; // Import the actions

interface SidenavProps {
  isOpen: boolean;
  toggleSidenav: () => void;
}

const Sidenav: React.FC<SidenavProps> = ({ isOpen, toggleSidenav }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      dispatch(logout()); // Dispatch the logout action
      router.push('/'); // Redirect to the homepage
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      {/* Sidenav */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '250px', zIndex: 1000 }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={toggleSidenav} className="text-gray-400 hover:text-white">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard" className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors">
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/transactions" className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors">
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                </svg>
                Transactions
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors">
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
                </svg>
                Settings
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="flex items-center w-full p-2 hover:bg-gray-800 rounded transition-colors">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0l-4-4m4 4l-4 4" />
                  </svg>
                  Logout
                </button>
              ) : (
                <Link href="/signin" className="flex items-center w-full p-2 hover:bg-gray-800 rounded transition-colors">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                  </svg>
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-50"
          onClick={toggleSidenav}
        ></div>
      )}
    </div>
  );
};

export default Sidenav;
