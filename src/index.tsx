import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import MapExtentSelector from "./pages/MapExtentSelector";

import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { Home } from "./pages/Home";
import { Root, ErrorPage } from "geocommuns-core";

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
    element: (
      <Root
        title="Inondata"
        contactMail="line.gallen@ign.fr"
        contentDescription="Inondata est un visualisateur 3D disponible en ligne qui offre la possibilité d’importer puis de visualiser les hauteurs et vitesses d’eau d’une inondation potentielle par rapport à la description d’un territoire fournie par les données LiDAR HD."
      />
    ),
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
