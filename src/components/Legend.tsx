import { fr } from "@codegouvfr/react-dsfr";
import { List, ListItem } from "@mui/material";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";

const CLASS_TO_COLOR = {
  "H < 0.20": "#C7DAEB",
  "0.20 < H < 0.50": "#71AAF9",
  "0.50 < H < 1": "#809BD2",
  "1 < H < 2": "#182F99",
  "H > 2": "#0C004C",
};

const useStyles = makeStyles()(() => ({
  title: {
    marginBottom: 0,
  },
  list: {
    padding: 0,
  },
  listItem: {
    marginTop: fr.spacing("1v"),
    marginBottom: fr.spacing("1v"),
    paddingLeft: 8,
    paddingRight: 8,
  },
  item: {
    display: "flex",
  },
  cercle: {
    width: fr.spacing("3w"),
    height: fr.spacing("3w"),
    marginRight: fr.spacing("1w"),
    borderRadius: 16,
  },
}));

export const Legend = () => {
  const { css, cx, classes } = useStyles();
  const listItems = Object.entries(CLASS_TO_COLOR).map(([key, value]) => {
    return (
      <ListItem key={key} className={classes.listItem}>
        <span className={classes.item}>
          <span className={cx(classes.cercle, css({ background: value }))} /> {key}
        </span>
      </ListItem>
    );
  });

  return (
    <div>
      <b>Hauteurs d'eau (en mètres)</b>
      <List className={classes.list}>{listItems}</List>
    </div>
  );
};
