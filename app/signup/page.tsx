'use client';

import React, { useState } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Explicitly typing the state
  const [password, setPassword] = useState<string>(''); // Explicitly typing the state
  const [error, setError] = useState<string>(''); // Explicitly typing the state
  const [message, setMessage] = useState<string>(''); // State to hold success message
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setMessage(''); // Clear previous messages

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);
      setMessage('Verification email sent! Please check your inbox.'); // Set success message
      router.push('/signin'); // Redirect to the sign-in page after successful sign-up
    } catch (error: unknown) { // Specify the error type
      if (error instanceof Error) {
        setError(error.message); // Set error message based on Firebase error
      } else {
        setError('Error creating account. Please try again.'); // Fallback error message
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Left Section: Stunning Visual */}
      <div className="relative w-full md:w-1/2 bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center">
        {/* Background Decoration */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="absolute w-96 h-96 bg-orange-300 opacity-40 rounded-full filter blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-72 h-72 bg-purple-400 opacity-30 rounded-full filter blur-3xl bottom-20 right-20 animate-pulse"></div>
          <div className="absolute w-64 h-64 bg-yellow-300 opacity-20 rounded-full filter blur-2xl bottom-10 left-24 animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center text-white p-8">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">Join TrackMe</h1>
          <p className="text-lg font-light max-w-md mx-auto leading-relaxed mb-12">Start managing your finances effortlessly and achieve financial freedom.</p>
          <div className="flex justify-center">
            <a href="/signin" className="bg-white text-teal-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transform transition-all hover:scale-105">
              Already have an account?
            </a>
          </div>
        </div>
      </div>

      {/* Right Section: Sign-Up Form */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-gray-50">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-green-600 opacity-10"></div>
        <div className="absolute w-80 h-80 bg-teal-300 opacity-30 rounded-full filter blur-3xl top-10 right-20"></div>
        <div className="absolute w-64 h-64 bg-green-400 opacity-20 rounded-full filter blur-3xl bottom-10 right-10"></div>

        <div className="relative z-10 bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center text-teal-600">Create Your Account</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {message && <p className="text-green-500 text-center mb-4">{message}</p>} {/* Success message */}

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transform transition duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-600">Or sign up with</span>
            </div>
          </div>

          {/* Google Sign-Up (Optional) */}
          {/* Uncomment to enable Google sign-up */}
          {/* <button className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transform transition duration-300">
            Sign Up with Google
          </button> */}

          {/* Sign-In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/signin" className="text-blue-500 hover:underline font-semibold">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
