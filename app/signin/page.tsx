'use client';

import { useEffect, useState } from 'react';
import { signInWithGoogle, auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login, setUser } from '@/store/authSlice';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for authentication state using Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        localStorage.setItem('userToken', user.uid);
        router.push('/dashboard');
      } else {
        // No user is signed in, ensure token is cleared
        localStorage.removeItem('userToken');
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [router]);

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('userToken', user.uid);

      dispatch(login());
      dispatch(setUser({
        name: user.displayName || '',
        email: user.email || '',
        photoUrl: user.photoURL || '',
        balance: 0
      }));

      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      localStorage.setItem('userToken', user.uid);

      dispatch(login());
      dispatch(setUser({
        name: user.displayName || '',
        email: user.email || '',
        photoUrl: user.photoURL || '',
        balance: 0
      }));

      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage('Google sign-in failed.');
      }
    }
  };

  // Render the sign-in form
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Left Section: Stunning Visual */}
      <div className="relative w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
        {/* Background visuals here */}
      </div>

      {/* Right Section: Sign-In Form */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-gray-50">
        <div className="relative z-10 bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center text-indigo-700">Sign In to TrackMe</h2>
          <p className="text-center text-gray-600 mb-6">Access your personal dashboard</p>

          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <form onSubmit={handleEmailSignIn} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
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
                className="w-full px-4 py-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transform transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-600">Or sign in with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transform transition duration-300"
          >
            Sign In with Google
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="text-blue-500 hover:underline font-semibold">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
