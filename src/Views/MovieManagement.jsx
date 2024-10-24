import React, { useState, useEffect } from "react";
import { Plus, Trash, Edit } from "lucide-react"; // Added Trash and Edit icons
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../helpers/axios";

const MoviesManagement = () => {
  const [movies, setMovies] = useState([]);
  const [isAddingMovie, setIsAddingMovie] = useState(false);
  const [isEditingMovie, setIsEditingMovie] = useState(false); 
  const [currentMovie, setCurrentMovie] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    image: null,
    video: null,
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axiosClient.get("/film/all");
      setMovies(response.data);
    } catch (error) {
      toast.error("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("video", formData.video);

      if (isEditingMovie && currentMovie) {
        //
        await axiosClient.put(`/film/${currentMovie._id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Movie updated successfully!");
      } else {
        await axiosClient.post("/film/create", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Movie added successfully!");
      }

      setIsAddingMovie(false);
      setIsEditingMovie(false);
      setFormData({
        name: "",
        duration: "",
        image: null,
        video: null,
      });
      fetchMovies();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add/update movie");
    }
  };

  const handleEdit = (movie) => {
    setIsEditingMovie(true);
    setCurrentMovie(movie);
    setFormData({
      name: movie.name,
      duration: movie.duration,
      image: null, 
      video: null,
    });
    setIsAddingMovie(true); 
  };

  const handleDelete = async (movieId) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await axiosClient.delete(`/film/${movieId}`);
        toast.success("Movie deleted successfully!");
        fetchMovies(); 
      } catch (error) {
        toast.error("Failed to delete movie");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-8">
      <ToastContainer theme="dark" />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Movies Management</h1>
          <button
            onClick={() => setIsAddingMovie(true)}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Add Movie
          </button>
        </div>

        {isAddingMovie && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md text-black">
              <h2 className="text-2xl font-bold mb-4">
                {isEditingMovie ? "Edit Movie" : "Add New Movie"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Movie Poster</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-3 py-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required={!isEditingMovie} 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Movie File</label>
                  <input
                    type="file"
                    name="video"
                    onChange={handleFileChange}
                    accept="video/*"
                    className="w-full px-3 py-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required={!isEditingMovie} 
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingMovie(false);
                      setIsEditingMovie(false);
                    }}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
                  >
                    {isEditingMovie ? "Update Movie" : "Add Movie"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie._id} className="relative rounded-lg overflow-hidden">
              <img
                src={movie.imageUrl || movie.image}
                alt={movie.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `/api/placeholder/400/400?text=${encodeURIComponent(movie.name)}`;
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10">
                <div className="absolute bottom-0 w-full p-4 text-white">
                  <h2 className="text-xl font-semibold mb-2 break-words">{movie.name}</h2>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2"
                    >
                      <Edit size={18} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2"
                    >
                      <Trash size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesManagement;
