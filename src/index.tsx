import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
//import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
//import Home from "./pages/Home/Home";
//import MapExtentSelector from "./pages/MapExtentSelector/MapExtentSelector";
//import MapViewer from "./pages/MapViewer/MapViewer";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer"


import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { Home } from "./pages/test/Home";
import { Mui } from "./pages/test/Mui";
import { fr } from "@codegouvfr/react-dsfr";
startReactDsfr({ defaultColorScheme: "system", Link })

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

/*
const router = createBrowserRouter([
  { path: ROUTES.Home, element: <Home /> },
  { path: ROUTES.MapExtentSelector, element: <MapExtentSelector /> },
  { path: ROUTES.MapViewer, element: <MapViewer /> },
]);
*/


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
/*
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
*/

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiDsfrThemeProvider>
        <Root />
      </MuiDsfrThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);



const brandTop = <>INTITULE<br />OFFICIEL</>;

const homeLinkProps = { "to": "/", "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)" };

function Root() {

  const location = useLocation();

  return (
    <div style={{ "height": "100vh", "display": "flex", "flexDirection": "column" }}>
      <Header
        brandTop={brandTop}
        serviceTitle="Nom du site / service"
        homeLinkProps={homeLinkProps}
        quickAccessItems={[headerFooterDisplayItem]}
        navigation={[
          {
            "text": "Home",
            "linkProps": {
              "to": "/"
            },
            "isActive": location.pathname === "/"
          },
          {
            "text": "Mui playground",
            "linkProps": {
              "to": "/mui"
            },
            "isActive": location.pathname === "/mui"
          }
        ]}
      />
      <div style={{
        "flex": 1,
        "margin": "auto",
        "maxWidth": 1000,
        ...fr.spacing("padding", { "topBottom": "10v" })
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mui" element={<Mui />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
      <Footer
        accessibility="fully compliant"
        brandTop={brandTop}
        homeLinkProps={homeLinkProps}
        contentDescription="
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
    à la gestion et au développement de votre entreprise.
    "
      />
      <Display />
    </div>

  );

}



