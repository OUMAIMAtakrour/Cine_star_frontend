import { createBrowserRouter } from "react-router-dom";
import StreamingPlatform from "./Views/cin";
import Signup from "./Views/SignUp";
import CinemaBooking from "./Views/Reservation";
import MovieCard from "./Views/Preview";

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
    path: "/reservation",
    element: <CinemaBooking />,
  },
  {
    path: "/preview",
    element: <MovieCard />,
  },
]);
export default router;
