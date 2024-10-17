import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router.jsx";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router}>
      <App />
<ToastContainer/>
    </RouterProvider>
  </>
);
