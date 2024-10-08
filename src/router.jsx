import { createBrowserRouter } from "react-router-dom";
import StreamingPlatform from "./Views/cin";
import Signup from "./Views/SignUp";
import CinemaBooking from "./Views/Reservation";
import MoviePreviewPage from "./Views/Preview";
import Login from "./Views/Login";
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
]);
export default router;
