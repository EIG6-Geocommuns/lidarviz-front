import React from "react";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "..";

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

export const Home = () => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.titleBlock}>
        <img
          className={classes.cover}
          src={require("../assets/img/carte_de_predictions.png")}
          alt=""
        />
        <div className={classes.titleTexts}>
          <h1 className={classes.title}>Cartes de prédictions</h1>
          <p className={classes.description}>Prototype de démonstration</p>
        </div>
      </div>

      <main className={classes.main}>
        <h2 className={classes.subtitle}>Bienvenue</h2>
        <div className={classes.texts}>
          <p>
            Ce prototype est un outil de travail pour aider à la conception du
            Catalogue Géodata qui remplacera prochainement les Géoservices. Nous
            testons grâce à plusieurs prototypes les accès et les usages liés
            aux différentes bases de données de l’IGN.
            <br />
            <b>
              Ici, seul les [Cartes de prédictions] feront l’objet d’un test.
            </b>
          </p>
          <p>
            En tant que testeur, nous vous invitons à naviguer dans cette
            première version et à nous faire parvenir vos retours sur
            l’interface et ses fonctionnalités. Notez que le prototype ne
            reflète pas l’identité finale du catalogue Geodata. Les styles ne
            sont pas déterminés et les terminologies et fonctionnalités ne sont
            pas figées.
          </p>
          <p>
            En tant que testeur, nous vous invitons à naviguer dans cette
            première version et à nous faire parvenir vos retours sur
            l’interface et ses fonctionnalités. Notez que le prototype ne
            reflète pas l’identité finale du catalogue Geodata. Les styles ne
            sont pas déterminés et les terminologies et fonctionnalités ne sont
            pas figées.
          </p>
          <p>
            Vous pouvez partager ce prototype à votre entourage professionnelle
            mais nous vous demandons de ne pas communiquer dessus publiquement.
          </p>
        </div>

        <Button
          onClick={() => navigate(ROUTES.MapExtentSelector)}
          priority="secondary"
        >
          Accéder au prototype
          <span
            className={cx("fr-icon-arrow-right-line", classes.iconButton)}
            aria-hidden="true"
          ></span>
        </Button>
      </main>
    </div>
  );
};
