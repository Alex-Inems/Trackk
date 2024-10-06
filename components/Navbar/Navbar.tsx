'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import Sidenav from '@/components/SideNav/SideNav'; // Ensure Sidenav is in the correct path
import Image from 'next/image';

const Navbar: React.FC = () => {
  const { name, photoUrl } = useSelector((state: RootState) => state.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isSidenavOpen, setSidenavOpen] = useState(false);

  const toggleSidenav = () => {
    setSidenavOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-white text-xl font-bold">
            <Link href="/">TrackMe</Link>
          </div>

          {/* User Profile Picture for Small Screens */}
          {isAuthenticated && (
            <div className="md:hidden flex items-center">
              <Image src={photoUrl} alt={name} className="w-8 h-8 rounded-full border-2 border-white"
              width={32}
              height={32} />
              <span className="text-white ml-2">Hi, {name}</span>
            </div>
          )}

          {/* Toggle Button for Sidenav (Visible on smaller screens) */}
          <button onClick={toggleSidenav} className="md:hidden text-white">
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <ul className="hidden md:flex space-x-6"> {/* Only show on medium screens and up */}
            <li>
              <Link href="/dashboard" className="text-white hover:text-teal-400 transition duration-300">Dashboard</Link>
            </li>
            <li>
              <Link href="/transactions" className="text-white hover:text-teal-400 transition duration-300">Transactions</Link>
            </li>
            <li>
              <Link href="/settings" className="text-white hover:text-teal-400 transition duration-300">Settings</Link>
            </li>
            {isAuthenticated && (
              <li className="flex items-center">
                <Image  src={photoUrl} alt={name} className="w-8 h-8 rounded-full border-2 border-white" width={32} height={32} />
                <span className="text-white ml-2">Hi, {name}</span>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <Link href="/signin" className="text-white hover:text-teal-400 transition duration-300">Sign In</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Sidenav Component */}
      <Sidenav isOpen={isSidenavOpen} toggleSidenav={toggleSidenav} />
    </>
  );
};

export default Navbar;
