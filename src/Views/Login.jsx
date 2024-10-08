import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../helpers/axios";
import "../assets/css/test.css";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosClient.post('/auth/login', formData);
      
      localStorage.setItem('TOKEN', response.data.token);
      
      if (onLoginSuccess) {
        onLoginSuccess(response.data);
      }

      navigate(response.data.user.role === 'client' ? '/reservation' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen md:flex py-16 px-20 rounded-lg">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-br from-blue-400 to-green-400 justify-around items-center hidden rounded-l-2xl">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            Welcome Back
          </h1>
          <p className="text-white mt-1">To Your Health Portal</p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
      </div>

      <div className="flex md:w-1/2 justify-center py-10 items-center glass rounded-r-2xl">
        <form className="bg-white w-1/2" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Welcome Back!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Please login to continue</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-right mt-2">
            <a
              href="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-500"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`block w-full bg-blue-400 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="leading-loose text-xs text-center text-black font-semibold hover:text-blue-700"
            >
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;