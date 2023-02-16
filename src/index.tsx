import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider , Link } from "react-router-dom";
import MapExtentSelector from "./pages/MapExtentSelector";

import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { Home } from "./pages/Home";
import { Root } from "./pages/Root";
import { ErrorPage } from "./pages/ErrorPage";

startReactDsfr({ defaultColorScheme: "system", Link });

export enum ROUTES {
  Home = "/",
  MapExtentSelector = "/definition-emprise",
}

declare module "@codegouvfr/react-dsfr/spa" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const router = createBrowserRouter([
  {
    path: ROUTES.Home,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.Home, element: <Home /> },
      { path: ROUTES.MapExtentSelector, element: <MapExtentSelector /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <MuiDsfrThemeProvider>
      <RouterProvider router={router} />
    </MuiDsfrThemeProvider>
  </React.StrictMode>
);
