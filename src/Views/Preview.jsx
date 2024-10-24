import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import axiosClient from "../helpers/axios";
import CommentForm from "../components/Forms/Comments";
import Button from "../components/Buttons/SubmitButton";
import StarRating from "../components/rating";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Seat = ({ seat, isSelected, onSelect }) => {
  const isReserved = seat.status === "Reserved";

  const baseStyles = "w-12 h-12 rounded-lg transition-colors duration-200";
  const stateStyles = isReserved
    ? "bg-white border border-gray-300 cursor-not-allowed"
    : isSelected
    ? "bg-yellow-400"
    : "bg-gray-600 hover:bg-yellow-400 cursor-pointer";

  return (
    <button
      className={`${baseStyles} ${stateStyles}`}
      onClick={() => !isReserved && onSelect(seat._id)}
      disabled={isReserved}
      title={`${seat.row}${seat.number} - ${seat.status}`}
    />
  );
};

const MoviePreviewPage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState({
    averageRating: 0,
    totalRatings: 0,
    ratings: [],
  });

  const [selectedSession, setSelectedSession] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [price] = useState(10);

  const fetchSessions = async () => {
    try {
      const response = await axiosClient.get(`/film/${id}/sessions`);
      setSessions(response.data.sessions || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
      setError(`Error fetching sessions: ${err.message}`);
    }
  };

  const fetchSeats = async (sessionId) => {
    try {
      const response = await axiosClient.get(`/session/${sessionId}`);
      setSeats(response.data.seats || []);
    } catch (err) {
      console.error("Error fetching seats:", err);
      setError(`Error fetching seats: ${err.message}`);
    }
  };

  const fetchMovieAndRatings = async () => {
    try {
      const [movieResponse, ratingsResponse] = await Promise.all([
        axiosClient.get(`/film/${id}`),
        axiosClient.get(`film/${id}/ratings`),
      ]);

      setMovie(movieResponse.data);
      setRatings({
        averageRating: ratingsResponse.data.averageRating || 0,
        totalRatings: ratingsResponse.data.totalRatings || 0,
        ratings: ratingsResponse.data.ratings || [],
      });
    } catch (err) {
      setError(`Error fetching movie details: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchMovieAndRatings(), fetchSessions()]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRating = async (rating) => {
    try {
      const response = await axiosClient.post(`/film/${id}/rate`, { rating });
      setRatings({
        averageRating: response.data.averageRating,
        totalRatings: response.data.totalRatings,
        ratings: response.data.ratings,
      });
    } catch (err) {
      setError(`Error submitting rating: ${err.message}`);
    }
  };

  const handleSessionSelect = async (session) => {
    setSelectedSession(session);
    setSelectedSeats([]);
    await fetchSeats(session._id);
  };

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) => {
      const seatObject = seats.find((seat) => seat._id === seatId);

      const isAlreadySelected = prev.some((seat) => seat._id === seatId);

      if (isAlreadySelected) {
        return prev.filter((seat) => seat._id !== seatId);
      } else {
        return [...prev, seatObject];
      }
    });
  };

  const handleBooking = async () => {
    try {
      if (selectedSeats.length === 0) {
        toast.error("Please select at least one seat", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      const formattedSeats = selectedSeats.map((seat) => ({
        row: seat.row,
        number: seat.number,
      }));

      await axiosClient.post("/reservation/create", {
        sessionId: selectedSession._id,
        seats: formattedSeats,
      });

      toast.success("Booking successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setSelectedSeats([]);
      fetchSeats(selectedSession._id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error making reservation", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const groupSeatsByRow = (seats) => {
    return seats.reduce((acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }
      acc[seat.row].push(seat);
      return acc;
    }, {});
  };

  const groupSessionsByDate = () => {
    if (!sessions.length) return {};

    return sessions.reduce((acc, session) => {
      const date = new Date(session.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(session);
      return acc;
    }, {});
  };

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!movie) return null;

  const groupedSessions = groupSessionsByDate();

  return (
    <div className="min-h-screen bg-black text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="relative h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            setImageError(true);
            e.target.src = `/api/placeholder/800/600?text=${encodeURIComponent(
              movie.name
            )}`;
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">{movie.name}</h1>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{movie.duration} min</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <StarRating
                  maxRating={5}
                  size={24}
                  defaultRating={ratings.averageRating}
                  onSetRating={handleRating}
                />
                <span className="text-sm text-gray-400">
                  {ratings.totalRatings}{" "}
                  {ratings.totalRatings === 1 ? "rating" : "ratings"}
                  {ratings.averageRating > 0 &&
                    ` • ${ratings.averageRating.toFixed(1)} average`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Available Sessions</h2>

        {Object.entries(groupedSessions).length === 0 ? (
          <p className="text-gray-400">No sessions available for this movie.</p>
        ) : (
          Object.entries(groupedSessions).map(([date, dateSessions]) => (
            <div key={date} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{date}</h3>
              <div className="flex flex-wrap gap-4">
                {dateSessions.map((session) => (
                  <Button
                    key={session._id}
                    onClick={() => handleSessionSelect(session)}
                    variant="outline"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedSession?._id === session._id
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{session.hour}</span>
                    <span className="text-sm text-gray-400">
                      Room {session.room.name}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedSession && (
        <div className="max-w-6xl mx-auto px-8 py-12 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Select Your Seats</h2>
            <p className="text-gray-400">
              {new Date(selectedSession.date).toLocaleDateString()} -{" "}
              {selectedSession.hour} - Room {selectedSession.room.name}
            </p>
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

            <div className="space-y-4">
              {Object.entries(groupSeatsByRow(seats)).map(([row, rowSeats]) => (
                <div
                  key={row}
                  className="flex justify-center items-center gap-4"
                >
                  <span className="text-gray-400 w-8">{row}</span>
                  <div className="flex gap-4">
                    {rowSeats.map((seat) => (
                      <Seat
                        key={seat._id}
                        seat={seat}
                        isSelected={selectedSeats.some(
                          (selected) => selected._id === seat._id
                        )}
                        onSelect={handleSeatSelect}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg mb-4">
              You have selected{" "}
              <span className="text-yellow-400">{selectedSeats.length}</span>{" "}
              seat(s) for a price of RS.
              <span className="text-yellow-400">
                {selectedSeats.length * price}
              </span>
            </p>
            <Button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
              className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold 
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:bg-yellow-500 transition-colors duration-200"
            >
              Book Seats
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-8 py-12">
        <CommentForm onAddComment={handleAddComment} />
      </div>
      <footer className=" grid grid-cols-3 bg-gradient-to-br from-[#494949] to-white backdrop-blur-sm py-20 mt-20">
        <div className="flex items-center pl-8">
          <img src="/src/assets/img/image 6.svg" alt="Logo" className="mr-2" />
          <p className="font-bold text-xl mr-4">CINE.STAR</p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <div className="flex justify-center gap-8 text-xl">
            <Link className="hover:text-gray-700 transition-colors">HOME</Link>
            <Link className="hover:text-gray-700 transition-colors">
              SESSION
            </Link>
            <Link className="hover:text-gray-700 transition-colors">
              MOVIES
            </Link>
          </div>
          <p className="text-sm text-gray-600">©All rights reserved</p>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="lg"
              className="hover:text-gray-700 transition-colors"
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              size="lg"
              className="hover:text-gray-700 transition-colors"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="lg"
              className="hover:text-gray-700 transition-colors"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MoviePreviewPage;
