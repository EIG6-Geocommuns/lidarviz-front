import { Outlet } from "react-router-dom";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";

export const Root = (): JSX.Element => {
  const brandTop = <>GOUVERNEMENT</>;

  const homeLinkProps = {
    to: "/",
    title: "Accueil - IGN",
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        brandTop={brandTop}
        serviceTitle="Inondata"
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

      <Outlet />

      <Footer
        accessibility="fully compliant"
        brandTop={brandTop}
        homeLinkProps={homeLinkProps}
        contentDescription="Ce message est à remplacer par les informations de votre site.
          Comme exemple de contenu, vous pouvez indiquer les informations 
          suivantes : Le site officiel d’information administrative pour les entreprises.
          Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
          à la gestion et au développement de votre entreprise."
        cookiesManagementLinkProps={{ to: "#" }}
        personalDataLinkProps={{ to: "#" }}
        termsLinkProps={{ to: "#" }}
        websiteMapLinkProps={{ to: "#" }}
      />
      <Display />
    </div>
  );
};
