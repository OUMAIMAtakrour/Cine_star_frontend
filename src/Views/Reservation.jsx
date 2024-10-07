import "../index.css"
import "../assets/js/reservation"
const CinemaBooking = () => {
    return (
      <div className="bg-blue-900 text-white flex flex-col items-center justify-center min-h-screen w-screen font-sans">
        {/* Carousel Section */}
        <div className="relative w-full h-[400px] mb-12">
          <div className="absolute inset-0 bg-black/50"></div>
          <img 
            src="/api/placeholder/1920/400" 
            alt="Movie Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full text-center pb-8">
            <h1 className="text-4xl font-bold">Inception</h1>
            <p className="mt-2">A mind-bending journey through dreams within dreams</p>
          </div>
        </div>
  
        {/* Legend */}
        <ul className="showcase mb-8 flex items-center justify-center space-x-10">
          <li className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
            <small className="text-gray-400">Available</small>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg"></div>
            <small className="text-gray-400">Selected</small>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white border border-gray-300 rounded-lg"></div>
            <small className="text-gray-400">Reserved</small>
          </li>
        </ul>
  
        {/* Screen */}
        <div className="container perspective mb-8">
          <div className="screen bg-white/20 h-24 w-full mb-4 transform -skew-x-12"></div>
          
          {/* Seats Grid */}
          <div className="grid grid-cols-8 gap-4 max-w-3xl mx-auto p-8">
            {[...Array(32)].map((_, index) => (
              <button
                key={index}
                className="seat w-12 h-12 rounded-lg bg-gray-600 hover:bg-yellow-400 transition-colors duration-200"
              ></button>
            ))}
          </div>
        </div>
  
        {/* Summary */}
        <div className="text-center mb-8">
          <p className="text-lg">
            You have selected <span className="text-yellow-400">0</span> seat(s) 
            for a price of RS.<span className="text-yellow-400">0</span>
          </p>
        </div>
      </div>
    );
  };
  
  export default CinemaBooking;