import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import { Home as CommonHome } from "geocommuns-core";

import * as itowns from 'itowns';

const view = new itowns.Coordinates('EPSG:4326');

const useStyles = makeStyles()({
  inondataTitleBlock: {
    backgroundColor: "rgba(35, 63, 123, 0.67)", //TODO: set other color if darkMode
  },
  iconButton: {
    marginLeft: fr.spacing("1w"),
  },
});

const description = [
  <p>
    Inondata est un visualisateur 3D disponible en ligne qui offre la possibilité d’importer puis de
    visualiser les hauteurs et vitesses d’eau d’une inondation potentielle par rapport à la
    description d’un territoire fournie par les données LiDAR HD.
  </p>,
  <p>
    Ce prototype est un outil de travail à destination des unités de prévention des risques des
    Direction Départementale des Territoires (DDT), pour aider à la conception de l’outil. Nous
    testons grâce à plusieurs prototypes les accès, les visuels et les usages liés.
  </p>,
  <p>
    En tant que testeur, nous vous invitons à naviguer dans cette première version et à nous faire
    parvenir vos retours sur l’interface et ses fonctionnalités. Notez que le prototype ne reflète
    pas l’identité finale du démonstrateur. Les styles ne sont pas déterminés et les terminologies
    et fonctionnalités ne sont pas figées.
  </p>,
  <p>
    Vous pouvez partager ce prototype à votre entourage professionnel mais nous vous demandons de ne
    pas communiquer dessus publiquement.
  </p>,
];

export const Home = () => {
  const { classes, cx } = useStyles();

  const CTA = (
    <a className={fr.cx("fr-btn")} href="http://116.203.195.247/">
      Accéder au Prototype
      <span
        className={cx("fr-icon-arrow-right-line", classes.iconButton)}
        aria-hidden="true"
      ></span>
    </a>
  );

  return (
    <CommonHome
      title="Inondata"
      titleInfo="Prototype de démonstration"
      titleClass={classes.inondataTitleBlock}
      cover={require("../assets/img/lidar_hd_marseille.png")}
      description={description}
      cta={CTA}
    />
  );
};
