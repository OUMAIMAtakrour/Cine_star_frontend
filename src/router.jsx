import { createBrowserRouter } from "react-router-dom";
import StreamingPlatform from "./Views/cin";
import Signup from "./Views/Auth/SignUp";
import CinemaBooking from "./Views/Reservation";
import MoviePreviewPage from "./Views/Preview";
import Login from "./Views/Auth/Login";
import StreamPage from "./Views/Stream";
import CommentForm from "./components/Forms/Comments";
import CinemaAdminDashboard from "./Views/dashboard";
import NotFoundPage from "./Views/404";
import StarRating from "./components/rating";
const router = createBrowserRouter([
  {
    path: "/cin",
    element: <StreamingPlatform />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/session/:id",
    element: <CinemaBooking />,
  },
  {
    path: "/film/:id/sessions",
    element: <MoviePreviewPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/stream",
    element: <StreamPage />,
  },
  {
    path: "/comment",
    element: <CommentForm />,
  },
  {
    path: "/dashboard",
    element: <CinemaAdminDashboard />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/star",
    element: <StarRating />,
  },
]);
export default router;
