import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";
import { MemoizedDataDescriptionCard as DataDescriptionCard } from "geocommuns-core";

const useStyles = makeStyles()((theme) => ({
  container: {
    paddingTop: fr.spacing("10w"),
  },
  header: {
    margin: "auto",
    maxWidth: 1200,
    width: "90%",
    paddingBottom: fr.spacing("5w"),
  },
  bodyBackground: {
    backgroundColor: theme.decisions.artwork.background.grey.default,
    paddingTop: fr.spacing("6w"),
    paddingBottom: fr.spacing("6w"),
  },
  body: {
    margin: "auto",
    maxWidth: 1200,
    width: "90%",
    backgroundColor: theme.decisions.background.default.grey.default,
  },
  tabs: {
    "& .fr-tabs__list": {
      backgroundColor: theme.decisions.artwork.background.grey.default,
    },
  },
}));

export const DataInfo = () => {
  const { classes } = useStyles();

  return (
    <main className={classes.container}>
      <div className={classes.header}>
        <DataDescriptionCard
          title="Inondata"
          subtitle="Visualisation en trois dimensions du risque inondation"
          creationDate={new Date("2023-04-04")}
          updateDate={new Date("2023-04-25")}
          image={require("../assets/img/lidar_hd_marseille_petit.png")}
          altImage="Vignette donnant un aperçu des données LiDAR HD"
        />
      </div>
    </main>
  );
};
