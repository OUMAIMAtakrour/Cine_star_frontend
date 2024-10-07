import { Star, StarHalf } from "lucide-react";

const MovieCard = () => {
  return (
    <div className="bg-gray-200 h-full">
      <div className="h-[342px] relative overflow-hidden z-10 rounded-t-lg">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover bg-center"
            src="/src/assets/img/535881e220a3792a1640a2e66e6c79b4.jpg"
            alt="Background"
          />
          {/* <div 
            className="absolute bottom-0 left-0 w-full h-24 bg-gray-200"
            style={{
              transform: 'skewY(-4deg)',
              transformOrigin: 'bottom left'
            }}
          /> */}
        </div>

        <img
          src="/src/assets/img/535881e220a3792a1640a2e66e6c79b4.jpg"
          alt="Movie Cover"
          className="absolute top-[160px] left-[40px] z-20 w-[200px] h-[300px] object-cover rounded-lg shadow-xl"
        />

        <div className="relative z-20 pt-[190px] pl-[280px] text-white">
          <div className="relative text-4xl mb-3">
            The Hobbit
            <span className="absolute top-[3px] ml-3 bg-[#C4AF3D] rounded text-sm px-1 text-[#544C21]">
              PG-13
            </span>
          </div>
          <div className="text-[#C7C1BA] text-2xl font-light mb-4">
            The Battle of the Five Armies
          </div>

          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4].map((star) => (
              <Star
                key={star}
                className="fill-yellow-400 text-yellow-400 w-5 h-5"
              />
            ))}
            <StarHalf className="fill-yellow-400 text-yellow-400 w-5 h-5" />
          </div>

          <div className="mt-4 text-[#C7C1BA]">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              109 likes
            </span>
          </div>
        </div>
      </div>

      <div className="flex px-12 pt-8">
        <div className="w-[220px] text-center">
          <div className="space-y-2">
            {["action", "fantasy", "adventure"].map((tag) => (
              <span
                key={tag}
                className="inline-block bg-white rounded-full px-3 py-1 text-sm text-gray-700 mr-2 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 pl-10">
          <p className="text-[#B1B0AC] leading-relaxed">
            Bilbo Baggins is swept into a quest to reclaim the lost Dwarf
            Kingdom of Erebor from the fearsome dragon Smaug. Approached out of
            the blue by the wizard Gandalf the Grey, Bilbo finds himself joining
            a company of thirteen dwarves led by the legendary warrior, Thorin
            Oakenshield. Their journey will take them into the Wild; through...
            <a href="#" className="text-[#5C7FB8] hover:underline ml-1">
              read more
            </a>
          </p>

          <div className="mt-6 flex space-x-4">
            {[1, 2, 3].map((person) => (
              <div key={person} className="group relative">
                <img
                  src="/src/assets/img/image.png"
                  alt={`Person ${person}`}
                  className="w-10 h-10 rounded-full hover:opacity-60 transition-opacity cursor-pointer"
                />
                <div className="invisible group-hover:visible absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                  Person {person}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
