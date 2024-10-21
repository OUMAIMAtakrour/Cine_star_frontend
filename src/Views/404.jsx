import React from 'react';
import { Film, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <div className="text-4xl mb-8">Oops! This scene is missing.</div>
        <Film className="mx-auto mb-8" size={120} />
        <p className="text-xl mb-8">
          Looks like the movie you're looking for is not in our collection.
        </p>
        <a
          href="/login"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors duration-300"
        >
          <Home className="mr-2" size={20} />
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;