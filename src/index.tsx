import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MapExtentSelector from "./pages/MapExtentSelector/MapExtentSelector";
import MapViewer from "./pages/MapViewer/MapViewer";

import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { Link } from "react-router-dom";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { Root } from "./routes/Root";
import { ErrorPage } from "./routes/ErrorPage";

startReactDsfr({ defaultColorScheme: "system", Link });

export enum ROUTES {
  Home = "/",
  MapExtentSelector = "/definition-emprise",
  MapViewer = "/visualisation",
}

declare module "@codegouvfr/react-dsfr/spa" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const router = createBrowserRouter([
  { path: ROUTES.Home, element: <Root />, errorElement: <ErrorPage /> },
  { path: ROUTES.MapExtentSelector, element: <MapExtentSelector /> },
  { path: ROUTES.MapViewer, element: <MapViewer /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MuiDsfrThemeProvider>
      <RouterProvider router={router} />
    </MuiDsfrThemeProvider>
  </React.StrictMode>
);
