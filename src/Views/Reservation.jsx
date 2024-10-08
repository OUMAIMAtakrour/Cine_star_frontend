import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../helpers/axios";

const Seat = ({ id, isSelected, isReserved, onSelect }) => {
  const baseStyles = "w-12 h-12 rounded-lg transition-colors duration-200";
  const stateStyles = isReserved 
    ? "bg-white border border-gray-300 cursor-not-allowed"
    : isSelected 
    ? "bg-yellow-400"
    : "bg-gray-600 hover:bg-yellow-400 cursor-pointer";

  return (
    <button
      className={`${baseStyles} ${stateStyles}`}
      onClick={() => !isReserved && onSelect(id)}
      disabled={isReserved}
    />
  );
};

const CinemaBooking = () => {
  const { sessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { movieName, movieDuration, sessionTime, sessionDate, roomName } = location.state || {};

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [price] = useState(10);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
       
        const response = await axiosClient.get(`/session/${sessionId}`);
        setSeats(response.data);
        setLoading(false);
      } catch (err) {
        setError(`Error fetching seats: ${err.message}`);
        setLoading(false);
      }
    };

    fetchSeats();
  }, [sessionId]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    try {
      if (selectedSeats.length === 0) {
        alert('Please select at least one seat');
        return;
      }
  
      await axiosClient.post('/reservations', {
        sessionId,
        seatIds: selectedSeats,
        clientId: 'current-user-id' 
      });
  
    
      navigate('/booking-confirmation', {
        state: {
          movieName,
          sessionTime,
          sessionDate,
          roomName,
          seats: selectedSeats,
          totalPrice: selectedSeats.length * price
        }
      });
    } catch (error) {
      alert('Error making reservation: ' + error.message);
    }
  };
  

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-black text-white flex items-center justify-center">{error}</div>;

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center min-h-screen w-screen font-sans">
      <div className="relative w-full h-[400px] mb-12">
        <div className="absolute inset-0 bg-black/50"></div>
        <img 
          src={`/api/placeholder/1200/800?text=${movieName}`}
          alt="Movie Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full text-center pb-8">
          <h1 className="text-4xl font-bold">{movieName}</h1>
          <p className="mt-2">
            {new Date(sessionDate).toLocaleDateString()} - {sessionTime} - Room {roomName}
          </p>
        </div>
      </div>

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

      <div className="container perspective mb-8">
        <div className="screen bg-white/20 h-24 w-full mb-4 transform -skew-x-12"></div>
        
        <div className="grid grid-cols-8 gap-4 max-w-3xl mx-auto p-8">
          {seats.map((seat) => (
            <Seat
              key={seat._id}
              id={seat._id}
              isSelected={selectedSeats.includes(seat._id)}
              isReserved={seat.isReserved}
              onSelect={handleSeatSelect}
            />
          ))}
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-lg mb-4">
          You have selected <span className="text-yellow-400">{selectedSeats.length}</span> seat(s) 
          for a price of RS.<span className="text-yellow-400">{selectedSeats.length * price}</span>
        </p>
        <button
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-yellow-500 transition-colors duration-200"
        >
          Book Seats
        </button>
      </div>
    </div>
  );
};

export default CinemaBooking;