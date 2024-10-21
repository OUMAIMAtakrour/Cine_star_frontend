import { createBrowserRouter } from "react-router-dom";
import StreamingPlatform from "./Views/cin";
import Signup from "./Views/SignUp";
import CinemaBooking from "./Views/Reservation";
import MoviePreviewPage from "./Views/Preview";
import Login from "./Views/Login";
import CinemaTicketCard from "./Views/card";
import StreamPage from "./Views/Stream";
import CommentForm from "./Views/Comments";
import CinemaAdminDashboard from "./Views/dashboard";
import NotFoundPage from "./Views/404";
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
    path: "/reservation/:id",
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
    path: "/card",
    element: <CinemaTicketCard />,
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
]);
export default router;
