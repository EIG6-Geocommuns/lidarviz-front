import { useEffect, useMemo, useRef, useState } from "react";
import { GlobeView, Coordinates } from "itowns";
import { Placement, View } from "../components/View";
import {
  ColorLayerToItownsLayer,
  ColorLayerToLabel,
  ElevationLayerToItownsLayer,
  FeatureLayerToItownsLayer,
  FeatureLayerToLabel,
} from "../utils/layers";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";

import { ZoomAndTiltControllers } from "../components/ZoomAndTiltControllers";
import { MemoizedLegend as Legend } from "../components/Legend";
import { LayerSetters } from "../components/LayerSetters";
import {
  TERRITORY_ID_TO_TERRITORY,
  TERRITORY_ID_TO_PLACEMENT,
  AvailableTerritory,
  TERRITORY_TO_LAYERS,
  TERRITORY_TO_LAYER_SETTERS,
  TERRITORY_TO_LEGEND_ITEMS,
} from "../utils/waterLayers";
import { useParams } from "react-router-dom";

const DEFAULT_PLACEMENT: Placement = {
  coord: new Coordinates("EPSG:4326", 1.50089, 45.3455),
  range: 3000000,
  tilt: 0,
  heading: 0,
};

const useStyles = makeStyles<{ windowHeight: number }>()((theme, { windowHeight }) => ({
  container: {
    minHeight: windowHeight,
  },
  containerWithoutTabs: {
    margin: fr.spacing("2w"),
  },
  layersTitle: {
    marginBottom: fr.spacing("1w"),
  },
  layersSubtitle: {
    marginBottom: fr.spacing("2w"),
  },
  sideBar: {
    position: "absolute",
    top: fr.spacing("29v"),
    zIndex: 2,
    maxHeight: windowHeight,
    paddingTop: fr.spacing("2w"),
    backgroundColor: theme.decisions.background.default.grey.default,
    width: 300,
  },
  controllers: {
    width: 300,
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
  { layerName: ColorLayerToLabel.ORTHO, label: ColorLayerToLabel.ORTHO, defaultVisibility: false },
  {
    layerName: ColorLayerToLabel.PLAN_IGN,
    label: ColorLayerToLabel.PLAN_IGN,
    defaultVisibility: true,
  },
  {
    layerName: FeatureLayerToLabel.BUILDING,
    label: FeatureLayerToLabel.BUILDING,
    defaultVisibility: true,
  },
];

export const Viewer = () => {
  const viewRef = useRef<GlobeView | null>(null);
  const { classes } = useStyles({ windowHeight: window.innerHeight });
  const { territoryId } = useParams();
  const [territory, setTerritory] = useState<AvailableTerritory | undefined>(undefined);
  const [placement, setPlacement] = useState<Placement | undefined>(undefined);

  useEffect(() => {
    if (
      territoryId &&
      (territoryId === "ddtm14" ||
        territoryId === "ddtm64" ||
        territoryId === "ddt67" ||
        territoryId === "ddtm83" ||
        territoryId === "ddt84")
    ) {
      const newTerritory = TERRITORY_ID_TO_TERRITORY[territoryId];
      setTerritory(newTerritory);
      setPlacement(TERRITORY_ID_TO_PLACEMENT[newTerritory]);
    } else {
      setPlacement(DEFAULT_PLACEMENT);
    }
  }, [territoryId]);

  const layers = useMemo(() => {
    if (territory) return [...BELOW_LAYERS, ...TERRITORY_TO_LAYERS[territory], ...ABOVE_LAYERS];
    return [...BELOW_LAYERS, ...ABOVE_LAYERS];
  }, [territory]);

  const territorySetters = useMemo(() => {
    if (territory) return TERRITORY_TO_LAYER_SETTERS[territory];
    return [];
  }, [territory]);

  //TODO resize window with view.resize(heigth, width)

  const layersSetters = useMemo(() => {
    return (
      <>
        <h6 className={classes.layersTitle}>Couches</h6>
        <b>Territoire</b>
        <LayerSetters viewRef={viewRef} layerSetters={LAYER_SETTERS} />

        {territorySetters.length !== 0 && (
          <>
            <b>Inondation</b>
            <LayerSetters viewRef={viewRef} layerSetters={territorySetters} />
          </>
        )}
      </>
    );
  }, [viewRef, territorySetters]);

  const legend = useMemo(() => {
    if (!territory) return undefined;

    const legendItems = TERRITORY_TO_LEGEND_ITEMS[territory];

    return (
      <div>
        <h6 className={classes.legendTitle}>Légende</h6>
        {legendItems.map((item) => {
          return <Legend territory={territory} style={item} />;
        })}
      </div>
    );
  }, [viewRef, territory]);

  return (
    <div className={classes.container}>
      {placement && <View id="viewer" placement={placement} layers={layers} viewRef={viewRef} />}

      <div className={classes.sideBar}>
        {legend ? (
          <Tabs
            tabs={[
              { label: "Couches", content: layersSetters },
              { label: "Légende", content: legend },
            ]}
          />
        ) : (
          <div className={classes.containerWithoutTabs}>{layersSetters}</div>
        )}
      </div>

      <ZoomAndTiltControllers viewRef={viewRef} containerClassName={classes.zoom} />
    </div>
  );
};
