

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-r from-blue-500 to-indigo-700 text-white relative overflow-hidden">
      
     
      
      {/* Content Section */}
      <div className="relative z-10 text-center p-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fadeInUp">Welcome to TrackMe</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto font-light animate-fadeInUp delay-1">
          Your reliable and intuitive budget tracker designed to help you take control of your finances.
        </p>
        
        {/* Call to Action Button */}
        <a href="/transactions" className="relative inline-block text-lg font-semibold text-white px-8 py-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-blue-300 animate-fadeInUp delay-2">
          View Transactions
        </a>
      </div>
      
      {/* Floating Cards Section */}
      <div className="relative z-10 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fadeInUp delay-3">
        <div className="p-6 bg-white text-gray-900 rounded-lg shadow-lg transform transition-all hover:scale-105">
          <h3 className="text-xl font-semibold mb-2">Track Your Expenses</h3>
          <p className="text-sm">Easily monitor and categorize your spending to save more efficiently.</p>
        </div>
        <div className="p-6 bg-white text-gray-900 rounded-lg shadow-lg transform transition-all hover:scale-105">
          <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
          <p className="text-sm">Get insights into your budget with dynamic charts and detailed reports.</p>
        </div>
        <div className="p-6 bg-white text-gray-900 rounded-lg shadow-lg transform transition-all hover:scale-105">
          <h3 className="text-xl font-semibold mb-2">Sync Across Devices</h3>
          <p className="text-sm">Seamlessly access your budget from anywhere, anytime, on any device.</p>
        </div>
      </div>
      
      {/* Footer or Additional Info */}
      <footer className="relative z-10 mt-20 text-center text-gray-200 text-sm">
        <p>&copy; 2024 TrackMe. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
