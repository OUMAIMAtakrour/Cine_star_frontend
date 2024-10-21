import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HomeHeader from "../components/Navbar/homeHeader";
import axiosClient from "../helpers/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import("../assets/css/test.css");
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

const StreamingApp = () => {
  const [movies, setMovies] = useState([]);

  const [filteredMovies, setFilteredMovies] = useState([]);
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

      console.log("Full Response:", response.data);

      setMovies(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Movie fetch error:", err);

      if (err.response?.status === 401) {
        setError("Please login to view movies");
        navigate("/login");
        return;
      }

      if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please check your connection.");
      } else if (!navigator.onLine) {
        setError("You are offline. Please check your internet connection.");
      } else {
        setError(`Failed to fetch movies: ${err.message}`);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [retryCount]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter((movie) => movie.category === selectedCategory)
      );
    }
  }, [movies, selectedCategory]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/film/${movieId}/sessions`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      <p className="text-white mt-4">Loading movies...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
      <div className="bg-red-500 bg-opacity-20 rounded-lg p-6 max-w-md">
        <p className="text-lg mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const MovieGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredMovies.map((movie) => (
        <Card
          key={movie._id}
          className="cursor-pointer transform transition-transform hover:scale-105"
          onClick={() => handleMovieClick(movie._id)}
        >
          <CardHeader floated={false} className="h-64 relative">
            <img
              src={`${movie?.image}`}
              alt={movie.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/api/placeholder/400/400?text=${encodeURIComponent(
                  movie.name
                )}`;
              }}
            />
           
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300"></div>
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {movie.name}
            </Typography>
            <Typography color="gray" className="font-medium">
              {movie.duration} min
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="body">
      <div className="glass mx-4 min-h-screen p-6 font-sans text-white mb-16">
        <HomeHeader />

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="relative">
            <img
              src="/src/assets/img/image 2.png"
              alt="Featured Movie"
              className="w-full h-50 rounded-lg"
            />
            <div className="absolute bottom-4 left-4">
              <h2 className="text-xl font-bold">Kubo and the Two Strings</h2>
              <button className="mt-2 px-4 py-2 bg-black bg-opacity-50 rounded-full">
                Play ▶️
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/src/assets/img/image 2.png"
              alt="Featured Movie"
              className="w-full h-50 rounded-lg"
            />
            <div className="absolute bottom-4 left-4">
              <h2 className="text-xl font-bold">Gabimaru – Hell's Paradise</h2>
              <button className="mt-2 px-4 py-2 bg-black bg-opacity-50 rounded-full">
                Play ▶️
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`py-2 px-4 glass rounded-lg transition ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "hover:bg-transparent"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="min-h-screen bg-gray-900 bg-opacity-50 py-12 px-4 rounded-lg">
          <h1 className="text-3xl font-bold text-white mb-8">
            Available Movies
          </h1>

          {loading ? <LoadingState /> : error ? <ErrorState /> : <MovieGrid />}
        </div>
      </div>
      <footer className="rounded-t-2xl grid grid-cols-3 bg-gradient-to-br from-[#7990B3] to-white backdrop-blur-sm py-20">
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
