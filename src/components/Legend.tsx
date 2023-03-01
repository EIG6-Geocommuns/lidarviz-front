import { fr } from "@codegouvfr/react-dsfr";
import { List, ListItem } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";

const CLASS_TO_COLOR = {
  Batiment: "#DB0E9A",
  "Zone imperméable": "#F9352B",
  "Zone perméable": "#A9A595",
  "Surface d'eau": "#3B6FBB",
  Feuillus: "#64E897",
  Conifères: "#3E6749",
  Broussaille: "#F5B32F",
  Vigne: "#7F2996",
  "Herbacés/Cultures": "#FFF52F",
  "Terre labourée": "#E8E491",
  "Piscine 2": "#3DE6EB",
  Coupe: "#8AB3A0",
  Autre: "#FFFFFF",
};

const useStyles = makeStyles()(() => ({
  title: {
    marginBottom: 0,
  },
  listItem: {
    paddingTop: fr.spacing("1v"),
    paddingBottom: fr.spacing("1v"),
  },
  cercle: {
    width: fr.spacing("3v"),
    height: fr.spacing("3v"),
    marginRight: fr.spacing("1w"),
    borderRadius: "8px",
    display: "inline-block",
    border: "1px solid grey",
  },
}));

export const Legend = () => {
  const { css, cx, classes } = useStyles();
  const listItems = Object.entries(CLASS_TO_COLOR).map(([key, value]) => {
    return (
      <ListItem key={key} className={classes.listItem}>
        <span>
          <span className={cx(classes.cercle, css({ background: value }))} /> {key}
        </span>
      </ListItem>
    );
  });

  return (
    <div>
      <h6 className={classes.title}>Classes</h6>
      <List>{listItems}</List>
    </div>
  );
};
