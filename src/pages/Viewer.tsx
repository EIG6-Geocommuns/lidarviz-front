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

const PLACEMENT = {
  coord: new Coordinates("EPSG:4326", 5.395317, 43.460333),
  range: 15000,
  tilt: 0,
  heading: 0,
};

const useStyles = makeStyles()((theme) => ({
  container: { width: "100%", height: "100%", overflow: "hidden" },
  controllers: {
    position: "absolute",
    top: fr.spacing("29v"),
    zIndex: 2,
    backgroundColor: theme.decisions.background.default.grey.default,
    margin: fr.spacing("2w"),
    padding: fr.spacing("2w"),
    width: 250,
  },
}));

const LAYERS = [
  ColorLayerToItownsLayer.ORTHO,
  ColorLayerToItownsLayer.PLAN_IGN,
  ElevationLayerToItownsLayer.BD_ALTI,
  ElevationLayerToItownsLayer.WORLD,
  FeatureLayerToItownsLayer.BUILDING,
  WaterLayerToItownsLayer.WATER,
];
const LAYER_SETTERS = [
  ColorLayerToLabel.ORTHO,
  ColorLayerToLabel.PLAN_IGN,
  FeatureLayerToLabel.BUILDING,
  WaterLayerToLabel.WATER,
];

export const Viewer = () => {
  const viewRef = useRef<GlobeView | null>(null);
  const { classes } = useStyles();

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
        setLayerOpacity={(opacity: number) => updateLayerOpacity(layerId, opacity)}
        setLayerVisibility={(visible: boolean) => updateLayerVisibility(layerId, visible)}
      />
    );
  });

  return (
    <div className={classes.container}>
      <View id="viewer" placement={PLACEMENT} layers={LAYERS} viewRef={viewRef} />
      <div id="controllers" className={classes.controllers}>
        <h6>Couches</h6>
        {LAYER_SETTERS.map((ls: string) => generateOpacitySlider(ls))}
      </div>
    </div>
  );
};
