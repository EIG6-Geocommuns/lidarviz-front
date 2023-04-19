import { useRef } from "react";
import { useConstCallback } from "powerhooks";
import { Layer, Coordinates, GlobeView, GlobeControls } from "itowns";
import { View } from "../components/View";
import {
  ColorLayerToItownsLayer,
  ColorLayerToLabel,
  ElevationLayerToItownsLayer,
  FeatureLayerToItownsLayer,
  FeatureLayerToLabel,
} from "../utils/layers";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { OpacitySlider } from "geocommuns-core";

import { MemoSearch as Search } from "../components/Search";
import { Legend } from "../components/Legend";

const PLACEMENT = {
  coord: new Coordinates("EPSG:4326", 5.395317, 43.460333),
  range: 15000,
  tilt: 0,
  heading: 0,
};

const useStyles = makeStyles<{ windowHeight: number }>()((theme, { windowHeight }) => ({
  container: {
    minHeight: windowHeight,
  },
  layersTitle: {
    marginTop: fr.spacing("3w"),
  },
  sideBar: {
    position: "absolute",
    top: fr.spacing("29v"),
    zIndex: 2,
  },
  controllers: {
    backgroundColor: theme.decisions.background.default.grey.default,
    margin: fr.spacing("2w"),
    padding: fr.spacing("2w"),
    paddingBottom: fr.spacing("1w"),
    width: 280,
  },
  opacitySlider: {
    marginBottom: fr.spacing("2w"),
  },
  legend: {
    backgroundColor: theme.decisions.background.default.grey.default,
    margin: fr.spacing("2w"),
    padding: fr.spacing("2w"),
    width: 280,
  },
  legendTitle: {
    marginBottom: fr.spacing("1w"),
  },
  zoom: {
    position: "absolute",
    bottom: `-${fr.spacing("29v")}`,
    margin: fr.spacing("2w"),
    right: 0,
    zIndex: 2,
  },
  zoomButton: {
    height: fr.spacing("5w"),
    width: fr.spacing("5w"),
    fontSize: "x-large",
    color: theme.decisions.background.actionHigh.blueFrance.default,
    backgroundColor: theme.decisions.background.default.grey.default,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&&&:hover": {
      backgroundColor: theme.decisions.background.default.grey.hover,
    },
  },
  zoomInButton: {
    borderBottom: "1px solid",
    borderColor: theme.decisions.background.actionHigh.blueFrance.default,
  },
}));

const LAYERS = [
  ColorLayerToItownsLayer.ORTHO,
  ColorLayerToItownsLayer.PLAN_IGN,
  ColorLayerToItownsLayer.WATER2D,
  ElevationLayerToItownsLayer.BD_ALTI,
  ElevationLayerToItownsLayer.WORLD,
  FeatureLayerToItownsLayer.BUILDING,
];
const LAYER_SETTERS = [
  ColorLayerToLabel.ORTHO,
  ColorLayerToLabel.PLAN_IGN,
  ColorLayerToLabel.WATER2D,
  FeatureLayerToLabel.BUILDING,
];

export const Viewer = () => {
  const viewRef = useRef<GlobeView | null>(null);
  const globeControlsRef = useRef<GlobeControls | null>(null);
  const { classes, cx } = useStyles({ windowHeight: window.innerHeight });

  const updateLayerVisibility = useConstCallback((layerId: string, isLayerVisible: boolean) => {
    const view = viewRef.current;
    if (view === null) return;
    const layer: Layer = view.getLayerById(layerId);
    if (!("visible" in layer)) return;
    layer.visible = isLayerVisible;
    view.notifyChange();
  });
  const updateLayerOpacity = useConstCallback((layerId: string, opacity: number) => {
    const view = viewRef.current;
    if (view === null) return;

    const layer = view.getLayerById(layerId);
    if (!("opacity" in layer)) return;

    layer.opacity = opacity;
    view.notifyChange();
  });
  const generateOpacitySlider = useConstCallback((layerId: string) => {
    return (
      <OpacitySlider
        key={layerId}
        label={layerId}
        className={classes.opacitySlider}
        setLayerOpacity={(opacity: number) => updateLayerOpacity(layerId, opacity)}
        setLayerVisibility={(visible: boolean) => updateLayerVisibility(layerId, visible)}
      />
    );
  });

  const moveToLocalisation = useConstCallback((x: number, y: number) => {
    const view = viewRef.current;
    if (!view) return;

    const coord = new Coordinates("EPSG:4326", x, y);
    view.controls?.lookAtCoordinate({ coord: coord });
  });

  const zoom = useConstCallback((zoomIn: boolean) => {
    const globeControls = globeControlsRef.current;
    if (!globeControls) return;

    const actualZoom = globeControls.getZoom();
    const newZoom = zoomIn ? actualZoom + 1 : actualZoom - 1;
    globeControls.setZoom(newZoom, false);
  });

  const zoomIn = useConstCallback(() => zoom(true));
  const zoomOut = useConstCallback(() => zoom(false));

  //TODO resize window with view.resize(heigth, width)

  return (
    <div className={classes.container}>
      <View
        id="viewer"
        placement={PLACEMENT}
        layers={LAYERS}
        viewRef={viewRef}
        globeControlsRef={globeControlsRef}
      />

      <div className={classes.sideBar}>
        <div className={classes.controllers}>
          <Search moveToLocalisation={moveToLocalisation} />

          <h6 className={classes.layersTitle}>Couches</h6>
          {LAYER_SETTERS.map((ls: string) => generateOpacitySlider(ls))}
        </div>

        <div className={classes.legend}>
          <h6 className={classes.legendTitle}>Légende</h6>
          <Legend />
        </div>
      </div>

      <div className={classes.zoom}>
        <Button className={cx(classes.zoomButton, classes.zoomInButton)} onClick={zoomIn}>
          +
        </Button>
        <Button className={classes.zoomButton} onClick={zoomOut}>
          -
        </Button>
      </div>
    </div>
  );
};
