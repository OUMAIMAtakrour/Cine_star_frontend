import React from 'react';
import { Clock, Calendar, MapPin } from 'lucide-react';

const CinemaTicketCard = ({ title, image, date, time, cinema, seat }) => {
  return (
    <div className="relative w-48 mx-auto  shadow-lg overflow-hidden ">
      {/* Left cutout */}
      <div className="absolute left-0 top-1/2 w-4 h-8 bg-white rounded-r-full transform -translate-y-1/2 -translate-x-1/2"></div>
      {/* Right cutout */}
      <div className="absolute right-0 top-1/2 w-4 h-8 bg-white rounded-l-full transform -translate-y-1/2 translate-x-1/2"></div>

      {/* Ticket stub */}
      <div className="relative h-48 bg-gray-600 p-3 text-white">
        <img src={image || "/src/assets/img/535881e220a3792a1640a2e66e6c79b4.jpg"} alt={title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
        <div className="relative z-10">
          <h2 className="text-lg font-bold mb-2 truncate">{title}</h2>
          <div className="flex items-center mb-1 text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-xs">
            <Clock className="w-3 h-3 mr-1" />
            <span>{time}</span>
          </div>
        </div>
      </div>
      
      {/* Dashed border with half-circle cutouts */}
      <div className="relative border-t-2 border-dashed border-red-500">
        {/* Left half-circle cutout */}
        <div className="absolute left-0 top-1/2 w-3 h-6 bg-white rounded-r-full transform -translate-y-1/2 -translate-x-1/2 border-r-2 border-dashed border-red-500"></div>
        {/* Right half-circle cutout */}
        <div className="absolute right-0 top-1/2 w-3 h-6 bg-white rounded-l-full transform -translate-y-1/2 translate-x-1/2 border-l-2 border-dashed border-red-500"></div>
      </div>
      
      {/* Ticket details */}
      <div className="p-3 bg-white text-xs">
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold text-red-500">Cinema:</span>
          <span className="truncate">{cinema}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-red-500">Seat:</span>
          <span>{seat}</span>
        </div>
        <div className="flex items-center justify-center text-center">
          <MapPin className="w-3 h-3 mr-1 text-red-500 flex-shrink-0" />
          <span className="text-xxs text-gray-600 truncate">123 Movie St, Cinemaville</span>
        </div>
      </div>
      
      {/* Barcode (simulated) */}
      <div className="bg-white p-2">
        <div className="w-full h-6 bg-gray-800"></div>
      </div>
    </div>
  );
};

export default CinemaTicketCard;