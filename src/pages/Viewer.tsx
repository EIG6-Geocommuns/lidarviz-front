import { useRef } from "react";
import { useConstCallback } from "powerhooks";
import { Coordinates, GlobeView } from "itowns";
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

import { ZoomAndTiltControllers } from "../components/ZoomAndTiltControllers";
import { MemoSearch as Search } from "../components/Search";
import { Legend } from "../components/Legend";
import { LayerSetters } from "../components/LayerSetters";
import { ddt83Layers, ddt83Setters, getLegend } from "../utils/waterLayers";

const PLACEMENT = {
  coord: new Coordinates("EPSG:4326", 6.1839, 43.339),
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
    marginBottom: fr.spacing("1w"),
  },
  layersSubtitle: {
    marginBottom: fr.spacing("2w"),
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
}));

const BELOW_LAYERS = [
  ColorLayerToItownsLayer.ORTHO,
  ColorLayerToItownsLayer.PLAN_IGN,
  ElevationLayerToItownsLayer.BD_ALTI,
  ElevationLayerToItownsLayer.WORLD,
];

const ABOVE_LAYERS = [FeatureLayerToItownsLayer.BUILDING];

const LAYER_SETTERS = [
  { label: ColorLayerToLabel.ORTHO, defaultVisibility: false },
  { label: ColorLayerToLabel.PLAN_IGN, defaultVisibility: true },
  { label: FeatureLayerToLabel.BUILDING, defaultVisibility: true },
];

export const Viewer = () => {
  const viewRef = useRef<GlobeView | null>(null);
  const { classes } = useStyles({ windowHeight: window.innerHeight });

  const moveToLocalisation = useConstCallback((x: number, y: number) => {
    const view = viewRef.current;
    if (!view) return;

    const coord = new Coordinates("EPSG:4326", x, y);
    view.controls?.lookAtCoordinate({ coord: coord });
  });

  //TODO resize window with view.resize(heigth, width)

  return (
    <div className={classes.container}>
      <View
        id="viewer"
        placement={PLACEMENT}
        layers={[...BELOW_LAYERS, ...ddt83Layers, ...ABOVE_LAYERS]}
        viewRef={viewRef}
      />

      <div className={classes.sideBar}>
        <div className={classes.controllers}>
          <Search moveToLocalisation={moveToLocalisation} />

          <h6 className={classes.layersTitle}>Couches</h6>
          <b>Territoire</b>
          <LayerSetters viewRef={viewRef} layerSetters={LAYER_SETTERS} />
          <b>Inondation</b>
          <LayerSetters viewRef={viewRef} layerSetters={ddt83Setters} />
        </div>

        <div className={classes.legend}>
          <h6 className={classes.legendTitle}>Légende</h6>
          <Legend territory={"DDT83"} style={"inondata:vitesse_eau"} />
        </div>
      </div>

      <ZoomAndTiltControllers viewRef={viewRef} containerClassName={classes.zoom} />
    </div>
  );
};
