import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import MapExtentSelector from "./pages/MapExtentSelector/MapExtentSelector";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/definition-emprise", element: <MapExtentSelector /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
