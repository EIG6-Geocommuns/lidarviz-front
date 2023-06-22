import { fr } from "@codegouvfr/react-dsfr";
import { Coordinates, GlobeView } from "itowns";
import { MutableRefObject } from "react";
import { makeStyles } from "tss-react/dsfr";
import { Search } from "./Search";
import { Compass } from "./controllers/Compass";
import { TiltToggle } from "./controllers/TiltToggle";
import { ZoomButtons } from "./controllers/ZoomButtons";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    gap: fr.spacing("4w"),
  },
  searchContainer: {
    minWidth: 250,
    width: "100%",
    zIndex: 2,
    height: "fit-content",
  },
  otherControllers: {
    display: "flex",
    flexDirection: "column",
    zIndex: 2,
    gap: fr.spacing("1w"),
  },
  controllerButton: {
    height: fr.spacing("5w"),
    width: fr.spacing("5w"),
    color: theme.decisions.background.actionHigh.blueFrance.default,
    backgroundColor: theme.decisions.background.default.grey.default,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&&&:hover": {
      backgroundColor: theme.decisions.background.default.grey.hover,
    },
    fontSize: "large",
  },
}));

type Props = {
  viewRef: MutableRefObject<GlobeView | null>;
  containerClassName?: string;
  territoryNumber?: number;
};

export const Controllers = ({ viewRef, containerClassName, territoryNumber }: Props) => {
  const { classes, cx } = useStyles();

  const moveToLocalisation = (x: number, y: number) => {
    const view = viewRef.current;
    if (!view) return;

    const coord = new Coordinates("EPSG:4326", x, y);
    view.controls?.lookAtCoordinate({ coord: coord });
  };

  return (
    <div className={cx(classes.container, containerClassName)}>
      <div className={classes.searchContainer}>
        <Search moveToLocalisation={moveToLocalisation} territoryNumber={territoryNumber} />
      </div>

      <div className={classes.otherControllers}>
        <ZoomButtons viewRef={viewRef} buttonCss={classes.controllerButton} />
        <Compass viewRef={viewRef} buttonCss={classes.controllerButton} />
        <TiltToggle viewRef={viewRef} buttonCss={classes.controllerButton} />
      </div>
    </div>
  );
};
