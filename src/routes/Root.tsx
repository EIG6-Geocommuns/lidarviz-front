import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";

import { useLocation } from "react-router-dom";
import {
  Display,
  headerFooterDisplayItem,
} from "@codegouvfr/react-dsfr/Display";
import { fr } from "@codegouvfr/react-dsfr";

export const Root = (): JSX.Element => {
  const location = useLocation();

  const brandTop = (
    <>
      INTITULE
      <br />
      OFFICIEL
    </>
  );

  const homeLinkProps = {
    to: "/",
    title:
      "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)",
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        brandTop={brandTop}
        serviceTitle="Nom du site / service"
        homeLinkProps={homeLinkProps}
        quickAccessItems={[headerFooterDisplayItem]}
        navigation={[
          {
            text: "Home",
            linkProps: {
              to: "/",
            },
            isActive: location.pathname === "/",
          },
          {
            text: "Mui playground",
            linkProps: {
              to: "/mui",
            },
            isActive: location.pathname === "/mui",
          },
        ]}
      />

      <div
        style={{
          flex: 1,
          margin: "auto",
          maxWidth: 1000,
          ...fr.spacing("padding", { topBottom: "10v" }),
        }}
      >
        <Outlet />
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
};
