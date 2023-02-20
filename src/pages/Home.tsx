import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { ROUTES } from "..";
import { Home as CommonHome } from "geocommuns-core";

type Project = "Predictia" | "Inondata";

const useStyles = makeStyles()((theme) => ({
  titleBlock: {
    height: 520,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: fr.spacing("10w"),
  },
  titleTexts: {
    position: "absolute",
    textAlign: "center",
    padding: fr.spacing("2w"),
    [fr.breakpoints.down("md")]: { width: "90%" },
    [fr.breakpoints.up("md")]: { width: "70%" },
    [fr.breakpoints.up("lg")]: { width: "50%" },
  },
  inondataTitleBlock: {
    backgroundColor: "rgba(35, 63, 123, 0.67)", //TODO: set other color if darkMode
  },
  title: {
    color: theme.decisions.text.inverted.grey.default,
    fontSize: 64,
    marginBottom: fr.spacing("8w"),
  },
  description: {
    fontVariantCaps: "all-small-caps",
    color: theme.decisions.text.inverted.grey.default,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  cover: {
    position: "absolute",
    objectFit: "cover",
    height: "inherit",
    width: "100%",
  },
  main: {
    margin: "auto",
    marginBottom: fr.spacing("15w"),
    textAlign: "center",
    [fr.breakpoints.down("md")]: { width: "90%" },
    [fr.breakpoints.up("md")]: { width: "70%" },
    [fr.breakpoints.up("lg")]: { width: "50%" },
  },
  subtitle: {
    fontVariantCaps: "all-small-caps",
  },
  texts: {
    marginBottom: fr.spacing("7w"),
  },
  iconButton: {
    marginLeft: fr.spacing("1w"),
  },
}));

const PROJECT_COVER: { [key in Project]: string } = {
  Inondata: require("../assets/img/lidar_hd_marseille.png"),
  Predictia: require("../assets/img/carte_de_predictions.png"),
};

const PROJECT_TITLE: { [key in Project]: string } = {
  Predictia: "COSIA",
  Inondata: "Inondata",
};

const PROJECT_DESCRIPTION: { [key in Project]: string } = {
  Predictia: "Prototype de démonstration",
  Inondata: "Prototype de démonstration",
};

const PROJECT_TEXT: { [key in Project]: JSX.Element[] } = {
  Predictia: [
    <p>
      Ce prototype est à destination de tous les utilisateurs des services IGN pour qu’ils
      découvrent COSIA,
      <b> les cartes de couvertures du sol directement obtenues par intelligence artificielle</b>,
      et qui interviennent par exemple dans la fabrication de l’OCS-GE.
    </p>,
    <p>
      Ces données ne sont pas encore publiées sur les sites de l’IGN (à l’exception du Gers). Ce
      prototype fonctionne comme un outil de co-construction pour tester et valider les besoins et
      les usages possibles autour de ces cartes avant leur publication.
      <b>
        {" "}
        Les fonctionnalités et terminologies ne sont pas figés et peuvent faire l’objet de retours.
      </b>
    </p>,
    <p>
      En tant que testeur, nous vous invitons à naviguer dans cette première version et{" "}
      <b>à nous faire parvenir vos retours</b> sur les données et les interfaces.
    </p>,
    <p>
      Vous pouvez partager ce prototype à votre entourage professionnelle mais nous vous demandons
      de ne pas communiquer publiquement dessus.
    </p>,
  ],
  Inondata: [
    <p>
      Inondata est un visualisateur 3D disponible en ligne qui offre la possibilité d’importer puis
      de visualiser les hauteurs et vitesses d’eau d’une inondation potentielle par rapport à la
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
      Vous pouvez partager ce prototype à votre entourage professionnel mais nous vous demandons de
      ne pas communiquer dessus publiquement.
    </p>,
  ],
};

export const Home = () => {
  const project: Project = "Predictia";
  const { classes, cx } = useStyles();

  const PROJECT_CTA: { [key in Project]: JSX.Element } = {
    Predictia: (
      <Button linkProps={{ to: ROUTES.MapExtentSelector }} priority="secondary">
        Accéder au prototype
        <span
          className={cx("fr-icon-arrow-right-line", classes.iconButton)}
          aria-hidden="true"
        ></span>
      </Button>
    ),
    Inondata: (
      <a className={fr.cx("fr-btn")} href="http://116.203.195.247/">
        Accéder au Prototype
        <span
          className={cx("fr-icon-arrow-right-line", classes.iconButton)}
          aria-hidden="true"
        ></span>
      </a>
    ),
  };

  return (
    <CommonHome
      title={PROJECT_TITLE[project]}
      subtitle="Les cartes de COuverture du Sol par Intelligence Artificielle"
      titleInfo={PROJECT_DESCRIPTION[project]}
      // titleClass={classes.inondataTitleBlock}
      cover={PROJECT_COVER[project]}
      description={PROJECT_TEXT[project]}
      cta={PROJECT_CTA[project]}
    />
    // <div>
    //   <div className={classes.titleBlock}>
    //     <img className={classes.cover} src={PROJECT_COVER[project]} alt="" />
    //     <div className={classes.titleTexts}>
    //       <h1 className={classes.title}>{PROJECT_TITLE[project]}</h1>
    //       <p className={classes.description}>{PROJECT_DESCRIPTION[project]}</p>
    //     </div>
    //   </div>

    //   <main className={classes.main}>
    //     <h2 className={classes.subtitle}>Bienvenue</h2>
    //     <div className={classes.texts}>{PROJECT_TEXT[project]}</div>

    //     {PROJECT_CTA[project]}
    //   </main>
    // </div>
  );
};
