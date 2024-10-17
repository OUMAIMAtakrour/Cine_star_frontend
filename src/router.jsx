import { createBrowserRouter } from "react-router-dom";
import StreamingPlatform from "./Views/cin";
import Signup from "./Views/SignUp";
import CinemaBooking from "./Views/Reservation";
import MoviePreviewPage from "./Views/Preview";
import Login from "./Views/Login";
import CinemaTicketCard from "./Views/card";
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
    element: <MoviePreviewPage/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/card",
    element: <CinemaTicketCard/>,
  },
]);
export default router;
