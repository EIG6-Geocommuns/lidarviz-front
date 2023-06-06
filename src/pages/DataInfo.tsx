import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";
import { MemoizedDataDescriptionCard as DataDescriptionCard, useTabs } from "geocommuns-core";
import { useConstCallback } from "powerhooks";
import { TerritorySelection } from "../components/TerritorySelection";

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
}));

const DEFAULT_TAB = { tabId: "visualisation", label: "Visualisation" };
const TABS = [
  { tabId: "info", label: "Informations" },
  DEFAULT_TAB,
  { tabId: "github", label: "Github" },
  { tabId: "actualites", label: "Actualités" },
];

export const DataInfo = () => {
  const { classes } = useStyles();

  const { selectedTabId, TabsSystem } = useTabs({
    tabs: TABS,
    defaultTab: DEFAULT_TAB,
    pageTitle: "Inondata",
  });

  const renderContent = useConstCallback((tabId: string) => {
    switch (tabId) {
      case "visualisation":
        return <TerritorySelection />;
      case "info":
        return <p key={selectedTabId}>🚧 Page en cours de construction</p>;
      case "github":
        return <p key={selectedTabId}>🚧 Page en cours de construction</p>;
      case "actualites":
        return <p key={selectedTabId}>🚧 Page en cours de construction</p>;
      default:
        return <TerritorySelection />;
    }
  });

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
      <div className={classes.bodyBackground}>
        <div className={classes.body}>
          <TabsSystem renderContent={renderContent} />
        </div>
      </div>
    </main>
  );
};
