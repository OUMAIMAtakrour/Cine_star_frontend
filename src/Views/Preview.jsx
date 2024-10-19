import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import axiosClient from "../helpers/axios";
import CommentForm from "./Comments";
import Button from "../components/Buttons/SubmitButton";

const MoviePreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axiosClient.get(`/film/${id}/sessions`);
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError(`Error fetching movie details: ${err.message}`);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const handleSessionSelect = (session) => {
    navigate(`/reservation/${session._id}`, {
      state: {
        movieName: movie.name,
        movieDuration: movie.duration,
        sessionTime: session.hour,
        sessionDate: session.date,
        roomName: session.room.name,
      },
    });
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <img
          src={`/api/placeholder/1200/800?text=${movie.name}`}
          alt={movie.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">{movie.name}</h1>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{movie.duration} min</span>
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
