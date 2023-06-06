import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import {
  Root,
  ErrorPage,
  Page,
  PersonalData,
  LegalTerms,
  CookiesManagement,
} from "geocommuns-core";

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
  PersonalData = "/donnees-personnelles",
  LegalTerms = "/mentions-legales",
  CookiesManagement = "/gestion-des-cookies",
}

declare module "@codegouvfr/react-dsfr/spa" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const generatePageWithDocumentTitle = ({
  element,
  pageTitle,
  scrollRestoration = false,
}: {
  element: JSX.Element;
  pageTitle?: string;
  scrollRestoration?: boolean;
}) => {
  const title = pageTitle ? `Inondata - ${pageTitle}` : "Inondata";
  return (
    <Page title={title} scrollRestoration={scrollRestoration}>
      {element}
    </Page>
  );
};

const router = createBrowserRouter([
  {
    path: ROUTES.Home,
    element: (
      <Root
        title="Inondata"
        feedbackLink="https://framaforms.org/inondata-test-utilisateurice-1681734006"
        contactMail="inondata@ign.fr"
        contentDescription="Inondata est un visualisateur 3D disponible en ligne qui permet de visualiser les hauteurs d’eau d’une inondation potentielle par rapport à la description d’un territoire fournie par l’IGN."
        personalDataLinkProps={{ to: ROUTES.PersonalData }}
        termsLinkProps={{ to: ROUTES.LegalTerms }}
        cookiesManagementLinkProps={{ to: ROUTES.CookiesManagement }}
      />
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.Home, element: <Home /> },
      {
        path: ROUTES.DataInfo,
        element: generatePageWithDocumentTitle({
          element: <DataInfo />,
          scrollRestoration: true,
        }),
      },
      { path: ROUTES.MapExtentSelector, element: <MapExtentSelector /> },
      { path: ROUTES.Viewer, element: <Viewer /> },
      {
        path: ROUTES.PersonalData,
        element: generatePageWithDocumentTitle({
          element: <PersonalData />,
          pageTitle: "Données personnelles",
          scrollRestoration: true,
        }),
      },
      {
        path: ROUTES.LegalTerms,
        element: generatePageWithDocumentTitle({
          element: (
            <LegalTerms
              teamName="Géocommuns"
              teamUrl="https://eig.etalab.gouv.fr/defis/geocommuns/"
              teamEmail="inondata@ign.fr"
            />
          ),
          pageTitle: "Mentions Légales",
          scrollRestoration: true,
        }),
      },
      {
        path: ROUTES.CookiesManagement,
        element: generatePageWithDocumentTitle({
          element: <CookiesManagement />,
          pageTitle: "Gestion des cookies",
          scrollRestoration: true,
        }),
      },
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
