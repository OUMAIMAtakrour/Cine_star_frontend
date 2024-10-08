import React from 'react';
import { Star, Clock, Calendar, PlayCircle } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'default',
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors";
  
  const variants = {
    default: "bg-white text-gray-900 hover:bg-gray-100",
    primary: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-white text-white hover:bg-white/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const MoviePreviewPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Movie Poster */}
      <div className="relative h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <img 
          src="/src/assets/img/image 2.png"
          alt="Movie poster" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">Inception</h1>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span>8.8/10</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>2h 28min</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>2010</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="primary">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Now
              </Button>
              <Button variant="outline">
                Add to Watchlist
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300 mb-8">
              A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.
            </p>

            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <img 
                    src={`/api/placeholder/150/150`}
                    alt="Cast member"
                    className="w-full rounded-full mb-2"
                  />
                  <h3 className="font-semibold">Actor Name</h3>
                  <p className="text-sm text-gray-400">Character</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Genre</h3>
              <div className="flex flex-wrap gap-2">
                {['Action', 'Sci-Fi', 'Thriller'].map((genre) => (
                  <button key={genre} className="px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-600 cursor-pointer">
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Director</h3>
              <p className="text-gray-300">Christopher Nolan</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Writers</h3>
              <p className="text-gray-300">Christopher Nolan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePreviewPage;