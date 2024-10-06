'use client'; 

import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import { Provider } from 'react-redux';
import store from '@/store/store';
import AuthListener from '@/components/AuthListener/AuthListener'; // Import AuthListener

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthListener /> {/* Add AuthListener here */}
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
