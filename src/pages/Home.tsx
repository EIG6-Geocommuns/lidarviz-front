import React from "react";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";

const useStyles = makeStyles()((theme) => ({
  titleBlock: {
    height: 520,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleTexts: {
    position: "absolute",
  },
  title: {
    color: theme.decisions.text.inverted.grey.default,
    fontSize: 64,
    marginBottom: fr.spacing("16v"),
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
}));

export const Home = () => {
  const { classes } = useStyles();
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
    </div>
  );
};
