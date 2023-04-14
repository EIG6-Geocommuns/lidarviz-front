import { useRef } from "react";
import { useConstCallback } from "powerhooks";
import { Layer, Coordinates, GlobeView } from "itowns";
import { View } from "../components/View";
import {
  orthoLayer,
  altiLayer,
  srtm3Layer,
  buildingLayer,
  waterLayer,
  planIGNLayer,
} from "../utils/layers";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";
import { LayerVisibilityCheckbox } from "../components/LayerVisibilityCheckbox";

const placement = {
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
  },
}));

const LAYERS = [orthoLayer, planIGNLayer, altiLayer, srtm3Layer, buildingLayer, waterLayer];

export const Viewer = () => {
  const viewRef = useRef<GlobeView | null>(null);
  const { classes } = useStyles();

  const updateLayerVisibility = useConstCallback((layerId: string, isLayerVisible: boolean) => {
    const view = viewRef.current;
    if (view === null) return;
    const layer: Layer = view.getLayerById(layerId);
    if (!('visible' in layer)) return;
    layer.visible = isLayerVisible;
    view.notifyChange();
  });

  return (
    <div className={classes.container}>
      <View id="viewer" placement={placement} layers={LAYERS} viewRef={viewRef} />
      <div id="controllers" className={classes.controllers}>
        <h6>Couches</h6>
        <LayerVisibilityCheckbox layerId="Plan IGN" setLayerVisibility={updateLayerVisibility} />
        <LayerVisibilityCheckbox layerId="Ortho IGN" setLayerVisibility={updateLayerVisibility} />
        <LayerVisibilityCheckbox layerId="Bâtiments" setLayerVisibility={updateLayerVisibility} />
      </div>
    </div>
  );
};
