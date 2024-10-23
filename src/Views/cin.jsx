import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HomeHeader from "../components/Navbar/homeHeader";
import axiosClient from "../helpers/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => onClick(movie._id)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10">
        <div className="absolute bottom-0 w-full p-4 text-white">
          <h2 className="text-xl font-semibold mb-2 break-words">
            {movie.name}
          </h2>
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="bg-white/20 px-2 py-1 rounded text-sm">
              {movie.duration} min
            </span>

            {movie.category && (
              <span className="text-sm text-gray-300">{movie.category}</span>
            )}
            <button className="bg-white/30 hover:bg-white text-white  rounded-full flex">
              <img src="/src/assets/img/icons8-play-video-50.png" alt="" />
            </button>
          </div>
          <p className="text-sm text-gray-300 line-clamp-3">
            {movie.description || "No description available"}
          </p>
        </div>
      </div>

      <img
        src={movie.image}
        alt={movie.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `/api/placeholder/400/400?text=${encodeURIComponent(
            movie.name
          )}`;
        }}
      />
    </div>
  );
};

const StreamingApp = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Horror",
    "Fantasy",
    "Action",
    "Romance",
    "Animation",
    "Sci-fi",
  ];

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("TOKEN");
      if (!token) {
        throw new Error("Authentication required");
      }
      const response = await axiosClient.get("/film/all", { timeout: 10000 });
      if (!response.data) {
        throw new Error("No data received from server");
      }

      const moviesList = response.data;
      setMovies(moviesList);
      setFilteredMovies(moviesList);

      const lastTwoMovies = moviesList.slice(-2);
      setFeaturedMovies(lastTwoMovies);

      setLoading(false);
    } catch (err) {
      console.error("Movie fetch error:", err);
      if (err.response?.status === 401) {
        setError("Please login to view movies");
        navigate("/login");
        return;
      }
      setError(
        err.code === "ECONNABORTED"
          ? "Request timed out. Please check your connection."
          : !navigator.onLine
          ? "You are offline. Please check your internet connection."
          : `Failed to fetch movies: ${err.message}`
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [retryCount]);

  useEffect(() => {
    setFilteredMovies(
      selectedCategory === "All"
        ? movies
        : movies.filter((movie) => movie.category === selectedCategory)
    );
  }, [movies, selectedCategory]);

  const handleMovieClick = (movieId) => {
    navigate(`/film/${movieId}/sessions`);
  };

  const LoadingState = () => (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-10">
      <p className="text-red-500 mb-4">{error}</p>
      <button
        onClick={() => setRetryCount((prev) => prev + 1)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen body bg-blue-gray-500 pt-6">
      <div className="glass mx-4 pb-4">
        <div className="pt-5 mx-10">
          <HomeHeader />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {featuredMovies.map((movie) => (
              <div
                key={movie._id}
                className="relative h-[400px] rounded-xl overflow-hidden"
              >
                <img
                  src={
                    movie.image ||
                    `/api/placeholder/800/400?text=${encodeURIComponent(
                      movie.name
                    )}`
                  }
                  alt={movie.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="absolute bottom-0 p-6">
                    <h2 className="text-2xl text-white font-bold mb-4">
                      {movie.name}
                    </h2>
                    <button className="bg-white/30 hover:bg-white text-white flex rounded-full">
                      <img
                        src="/src/assets/img/icons8-play-video-50.png"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-700 text-white"
                    : "bg-white/20 text-white hover:bg-white/40 border border-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">
            Available Movies
          </h2>

          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMovies?.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={handleMovieClick}
                />
              ))}
            </div>
          )}
        </div>
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

export default StreamingApp;
