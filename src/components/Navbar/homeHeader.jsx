import React from 'react';

function HomeHeader(props) {
    return (
        <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Cine.Star</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Movie Name..."
            className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300"
          />
          <button className="absolute right-3 top-2 text-gray-400">
            🔍
          </button>
        </div>
        <div className="flex items-center">
          <span className="mr-2">John Doe</span>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-full w-10 h-10"
          />
        </div>
      </header>
    );
}

export default HomeHeader;  