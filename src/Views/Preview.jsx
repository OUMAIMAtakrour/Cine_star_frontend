import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import axiosClient from "../helpers/axios";
import CommentForm from "../components/Forms/Comments";
import Button from "../components/Buttons/SubmitButton";
import StarRating from "../components/rating";

const MoviePreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState({
    averageRating: 0,
    totalRatings: 0,
    ratings: []
  });

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const [movieResponse, ratingsResponse] = await Promise.all([
          axiosClient.get(`/film/${id}`),
          axiosClient.get(`film/${id}/ratings`)
        ]);
        
        setMovie(movieResponse.data);
        setRatings({
          averageRating: ratingsResponse.data.averageRating || 0,
          totalRatings: ratingsResponse.data.totalRatings || 0,
          ratings: ratingsResponse.data.ratings || []
        });
        setLoading(false);
      } catch (err) {
        setError(`Error fetching movie details: ${err.message}`);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);
  const handleRating = async (rating) => {
    try {
      const response = await axiosClient.post(`/film/${id}/rate`, {
        rating: rating
      });
      
      setRatings({
        averageRating: response.data.averageRating,
        totalRatings: response.data.totalRatings,
        ratings: response.data.ratings
      });
    } catch (err) {
      setError(`Error submitting rating: ${err.message}`);
    }
  };
  const groupSessionsByDate = () => {
    if (!movie || !movie.sessions) return {};

    return movie.sessions.reduce((acc, session) => {
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

  const imageUrl = movie?.image || movie?.imageUrl;
  const placeholderImage = "/path/to/placeholder-image.jpg";

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  if (!movie) return null;

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  if (!movie) return null;

  const groupedSessions = groupSessionsByDate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-full object-cover "
          onError={(e) => {
            console.error("Error loading image:", imageUrl);
            setImageError(true);
          }}
        />

        {/* <video controls className=" w-1/3 mx-auto">
          <source src={`${movie?.video}`} type="video/mp4" />
        </video> */}
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
                  {ratings.totalRatings} {ratings.totalRatings === 1 ? 'rating' : 'ratings'} 
                  {ratings.averageRating > 0 && ` • ${ratings.averageRating.toFixed(1)} average`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Available Sessions</h2>

        {Object.keys(groupedSessions).length === 0 ? (
          <p className="text-gray-400">No sessions available for this movie.</p>
        ) : (
          Object.entries(groupedSessions).map(([date, dateSessions]) => (
            <div key={date} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{date}</h3>
              <div className="flex flex-wrap gap-4">
                {dateSessions.map((session) => (
                  <Button
                    key={session._id}
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => handleSessionSelect(session)}
                  >
                    <Clock className="w-4 h-4" />
                    {session.hour}
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

      <div className="max-w-6xl mx-auto px-8 py-12">
        <CommentForm onAddComment={handleAddComment} />
      </div>
    </div>
  );
};

export default MoviePreviewPage;
