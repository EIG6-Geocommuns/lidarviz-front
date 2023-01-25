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

  const brandTop = <>GOUVERNEMENT</>;

  const homeLinkProps = {
    to: "/",
    title: "Accueil - IGN",
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        brandTop={brandTop}
        serviceTitle="Geodata"
        homeLinkProps={homeLinkProps}
        quickAccessItems={[
          {
            iconId: "fr-icon-lock-line",
            linkProps: {
              to: "#",
            },
            text: "Se connecter",
          },
          {
            iconId: "fr-icon-feedback-fill",
            linkProps: {
              to: "#",
            },
            text: "Soumettre ses retours",
          },
          headerFooterDisplayItem,
        ]}
        serviceTagline="Prototype - Version1 - 2023"
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
        contentDescription="Ce message est à remplacer par les informations de votre site.
          Comme exemple de contenu, vous pouvez indiquer les informations 
          suivantes : Le site officiel d’information administrative pour les entreprises.
          Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
          à la gestion et au développement de votre entreprise."
      />
      <Display />
    </div>
  );
};
