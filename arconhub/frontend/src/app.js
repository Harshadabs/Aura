import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Homepage from "./homepage";
import Login from "./login";
import About from "./about";
import Signup from "./signup";

const router = createBrowserRouter([
  {
    path: "/Home",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/Home" />, // Redirect root to "/Home"
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Signup",
    element: <Signup />, 
  },
]);

const App = () => (
    <RouterProvider router={router}>
  </RouterProvider>
);

export default App;
