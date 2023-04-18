import { useRef } from "react";
import { useConstCallback } from "powerhooks";
import { Layer, Coordinates, GlobeView } from "itowns";
import { View } from "../components/View";
import {
  ColorLayerToItownsLayer,
  ColorLayerToLabel,
  ElevationLayerToItownsLayer,
  FeatureLayerToItownsLayer,
  FeatureLayerToLabel,
  WaterLayerToItownsLayer,
  WaterLayerToLabel,
} from "../utils/layers";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";
import { OpacitySlider } from "geocommuns-core";
import { Search } from "../components/Search";
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
}));

const LAYERS = [
  ColorLayerToItownsLayer.ORTHO,
  ColorLayerToItownsLayer.PLAN_IGN,
  ColorLayerToItownsLayer.WATER2D,
  ElevationLayerToItownsLayer.BD_ALTI,
  ElevationLayerToItownsLayer.WORLD,
  FeatureLayerToItownsLayer.BUILDING,
  WaterLayerToItownsLayer.WATER,
];
const LAYER_SETTERS = [
  ColorLayerToLabel.ORTHO,
  ColorLayerToLabel.PLAN_IGN,
  ColorLayerToLabel.WATER2D,
  FeatureLayerToLabel.BUILDING,
  WaterLayerToLabel.WATER,
];

export const Viewer = () => {
  const viewRef = useRef<GlobeView | null>(null);
  const { classes } = useStyles({ windowHeight: window.innerHeight });

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

  const moveToLocalisation = (x: number, y: number) => {
    const view = viewRef.current;
    if (!view) return;

    const coord = new Coordinates("EPSG:4326", x, y);
    view.controls?.lookAtCoordinate({ coord: coord });
  };

  return (
    <div className={classes.container}>
      <View id="viewer" placement={PLACEMENT} layers={LAYERS} viewRef={viewRef} />

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
    </div>
  );
};
