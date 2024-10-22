import React from 'react';

function HomeHeader(props) {
    return (
        <header className="flex justify-between items-center mb-8 text-white">
        <h1 className="text-3xl font-bold">Cine.Star</h1>
        <div className="relative">
         



        <div className="search ">
  <input placeholder="Search..." type="text"className='rounded-3xl px-20 py-3 w-full border-none shadow-lg' />
  <button type="submit" className='rounded-3xl'>Go</button>
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