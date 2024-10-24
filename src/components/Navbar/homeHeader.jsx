import React, { useState } from "react";

function HomeHeader({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); 
  };

  return (
    <header className="flex justify-between items-center mb-8 text-white">
      <h1 className="text-3xl font-bold">Cine.Star</h1>
      <div className="relative">
        <div className="search">
          <input
            placeholder="Search..."
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}  
            className="rounded-3xl px-20 py-3 w-full border-none shadow-lg text-black"
          />
          <button type="submit" className="rounded-3xl">
            Go
          </button>
        </div>
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
