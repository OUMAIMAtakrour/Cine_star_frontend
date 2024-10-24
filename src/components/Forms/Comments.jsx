import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../helpers/axios";
import Button from "../Buttons/SubmitButton";

const MoviePreviewPage = () => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axiosClient.get(`/film/${movieId}/sessions`);
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError(`Error fetching movie details: ${err.message}`);
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axiosClient.get(`/comment/${movieId}/comments`);

        if (Array.isArray(response.data)) {
          setComments(response.data);
        } else {
          setComments([]);
        }
      } catch (err) {
        setError(`Error fetching comments: ${err.message}`);
      }
    };

    fetchMovieDetail();
    fetchComments();
  }, [movieId]);

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("TOKEN");

    if (!userId) {
      setError("User not logged in.");
      return;
    }

    try {
      const response = await axiosClient.post(`/comment/create`, {
        content: newComment,
        movieId: movieId,
        userId: userId,
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (err) {
      setError(`Error posting comment: ${err.message}`);
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
    <div className="min-h-screen  text-white">
      {/* <div className="relative h-[70vh]">
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
      </div> */}

      {/* <div className="max-w-6xl mx-auto px-8 py-12">
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
      </div> */}

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* {comments.length === 0 ? ( */}
        <form onSubmit={handleCommentSubmit} className="mt-8  p-4 rounded-md">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 text-white rounded-xl bg-transparent border-blue-500"
            placeholder="Leave a comment..."
            rows="4"
            required
          />
          <Button
            variant="primary"
            type="submit"
            className="mt-4 w-full justify-center"
          >
            Submit Comment
          </Button>
        </form>
        <div className="mt-6 border border-white rounded-xl p-6">
          {" "}
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <ul className="space-y-4  ">
            {comments && comments.length === 0 ? (
              <span>No comments. Be the first</span>
            ) : (
              comments.map
              ((comment, index) => (
                <li key={index} className=" p-4 rounded-md bg-white/10">
                  <div className="w-full break-words ">{comment.content}</div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoviePreviewPage;
