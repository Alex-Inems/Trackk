/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Domain from which to allow images
        port: '', // Leave empty for default port
        pathname: '/**', // Allow all paths under this domain
      },
    ],
  },
  };
  
  export default nextConfig;
  