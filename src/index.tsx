import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { Root, ErrorPage } from "geocommuns-core";

import MapExtentSelector from "./pages/MapExtentSelector";
import { Home } from "./pages/Home";
import { Viewer } from "./pages/Viewer";
import { DataInfo } from "./pages/DataInfo";

startReactDsfr({ defaultColorScheme: "system", Link });

export enum ROUTES {
  Home = "/",
  DataInfo = "/info",
  MapExtentSelector = "/definition-emprise",
  Viewer = "/viewer/:territoryId",
}

declare module "@codegouvfr/react-dsfr/spa" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const router = createBrowserRouter([
  {
    path: ROUTES.Home,
    element: (
      <Root
        title="Inondata"
        feedbackLink="https://framaforms.org/inondata-test-utilisateurice-1681734006"
        contactMail="inondata@ign.fr"
        contentDescription="Inondata est un visualisateur 3D disponible en ligne qui offre la possibilité d’importer puis de visualiser les hauteurs et vitesses d’eau d’une inondation potentielle par rapport à la description d’un territoire fournie par les données LiDAR HD."
      />
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.Home, element: <Home /> },
      { path: ROUTES.DataInfo, element: <DataInfo /> },
      { path: ROUTES.MapExtentSelector, element: <MapExtentSelector /> },
      { path: ROUTES.Viewer, element: <Viewer /> },
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
