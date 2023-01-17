import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import MapExtentSelector from "./pages/MapExtentSelector/MapExtentSelector";
import MapViewer from "./pages/MapViewer/MapViewer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
startReactDsfr({ defaultColorScheme: "system" });

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

const theme = createTheme({
  palette: {
    primary: {
      main: "#282c34",
    },
    secondary: {
      main: "#707080",
    },
    contrastThreshold: 4.5,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
