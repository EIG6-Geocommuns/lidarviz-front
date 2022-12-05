import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import MapExtentSelector from "./pages/MapExtentSelector/MapExtentSelector";
import MapViewer from "./pages/MapViewer/MapViewer";

export enum ROUTES {
  Home = "/",
  MapExtentSelector = "/definition-emprise",
  MapViewer = "/visualisation",
}

const router = createBrowserRouter([
  { path: ROUTES.Home, element: <Home /> },
  { path: ROUTES.MapExtentSelector, element: <MapExtentSelector /> },
  { path: ROUTES.MapViewer, element: <MapViewer /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
