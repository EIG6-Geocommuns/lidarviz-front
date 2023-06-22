import { useConstCallback } from "powerhooks";
import { Coordinates, GlobeView, VIEW_EVENTS } from "itowns";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { MutableRefObject, useEffect, useState } from "react";
import { Event } from "three";
import { Search } from "./Search";

const useStyles = makeStyles<{ transform: string }>()((theme, { transform }) => ({
  container: {
    display: "flex",
    gap: fr.spacing("4w"),
  },
  searchContainer: {
    minWidth: 250,
  },
  otherControllers: {
    display: "flex",
    flexDirection: "column",
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
  },
  tiltButton: {
    fontSize: "large",
    marginTop: fr.spacing("1w"),
  },
  compass: {
    width: 25,
    transform: transform,
  },
  zoomButton: {
    fontSize: "x-large",
  },
  zoomInButton: {
    borderBottom: "1px solid",
    borderColor: theme.decisions.background.actionHigh.blueFrance.default,
  },
}));

type Props = {
  viewRef: MutableRefObject<GlobeView | null>;
  containerClassName?: string;
  territoryNumber?: number;
};

const THREE_D_TILT = 30;
const TWO_D_TILT = 90;

export const Controllers = ({ viewRef, containerClassName, territoryNumber }: Props) => {
  const [is2D, setIs2D] = useState(true);
  const [heading, setHeading] = useState(0);
  const { classes, cx } = useStyles({ transform: `rotate(${heading}deg)` });

  const moveToLocalisation = (x: number, y: number) => {
    const view = viewRef.current;
    if (!view) return;

    const coord = new Coordinates("EPSG:4326", x, y);
    view.controls?.lookAtCoordinate({ coord: coord });
  };

  const toggleTilt = useConstCallback(() => {
    const viewControls = viewRef.current?.controls;
    if (!viewControls) return;

    const newTilt = is2D ? THREE_D_TILT : TWO_D_TILT;
    viewControls.setTilt(newTilt, false);
    setIs2D(!is2D);
  });

  const updateIs2DWhenTiltChange = useConstCallback((event: Event) => {
    setHeading(event.heading);
    if (is2D) {
      if (event.tilt < 89) setIs2D(false);
    } else {
      if (event.tilt > 89) setIs2D(true);
    }
  });

  useEffect(() => {
    const currentViewRef = viewRef?.current;
    if (!currentViewRef) return;

    currentViewRef.addEventListener(VIEW_EVENTS.CAMERA_MOVED, updateIs2DWhenTiltChange);
    return () =>
      currentViewRef.removeEventListener(VIEW_EVENTS.CAMERA_MOVED, updateIs2DWhenTiltChange);
  }, [viewRef?.current]);

  const zoom = useConstCallback((zoomIn: boolean) => {
    const viewControls = viewRef.current?.controls;
    if (!viewControls) return;

    const actualZoom = viewControls.getZoom();
    const newZoom = zoomIn ? actualZoom + 1 : actualZoom - 1;
    viewControls.setZoom(newZoom, false);
  });

  const zoomIn = useConstCallback(() => zoom(true));
  const zoomOut = useConstCallback(() => zoom(false));

  const moveHeadingToNorth = useConstCallback(() => {
    const viewControls = viewRef.current?.controls;
    if (!viewControls) return;

    viewControls.setHeading(0, false);
  });

  return (
    <div className={cx(classes.container, containerClassName)}>
      <div className={classes.searchContainer}>
        <Search moveToLocalisation={moveToLocalisation} territoryNumber={territoryNumber} />
      </div>

      <div className={classes.otherControllers}>
        <Button
          className={cx(classes.controllerButton, classes.zoomButton, classes.zoomInButton)}
          onClick={zoomIn}
          title="Zoom avant"
        >
          +
        </Button>
        <Button
          className={cx(classes.controllerButton, classes.zoomButton)}
          onClick={zoomOut}
          title="Zoom arrière"
        >
          -
        </Button>
        <Button
          className={cx(classes.controllerButton, classes.tiltButton)}
          onClick={moveHeadingToNorth}
          title="Rétablir vers le nord"
        >
          <img src={require("../assets/icons/compass.png")} className={classes.compass} />
        </Button>
        <Button
          className={cx(classes.controllerButton, classes.tiltButton)}
          onClick={toggleTilt}
          title={is2D ? "Passer en 3D" : "Passer en 2D"}
        >
          {is2D ? "3D" : "2D"}
        </Button>
      </div>
    </div>
  );
};
