import React from "react";
import { Header as DSFRHeader } from "@codegouvfr/react-dsfr/Header";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <DSFRHeader
      brandTop={<>GOUVERNEMENT</>}
      homeLinkProps={{
        href: "/",
        title: "Accueil - IGN",
      }}
      quickAccessItems={[
        {
          iconId: "fr-icon-lock-line",
          linkProps: {
            href: "#",
          },
          text: "Se connecter",
        },
        {
          iconId: "fr-icon-feedback-fill",
          linkProps: {
            href: "#",
          },
          text: "Soumettre ses retours",
        },
      ]}
      serviceTagline="Prototype - Version1 - 2023"
      serviceTitle="Geodata"
    />
  );
};
