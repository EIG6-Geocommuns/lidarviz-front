import { WMTSSource, ColorLayer, Coordinates } from "itowns";
import { Placement } from "../components/View";
import { WaterLayerToLabel, water3DLayer } from "./water3DLayers";
import { WaterLayer } from "inondata-itowns";

export type AvailableTerritoryId = "ddtm14" | "ddtm64" | "ddt67" | "ddtm83" | "ddt84";
export type AvailableTerritory = "DDTM14" | "DDTM64" | "DDT67" | "DDTM83" | "DDT84";
export type AvailableLayer =
  | "inondata:DDTM14"
  | "inondata:DDT64_Pau_isocote_probabilite_faible"
  | "inondata:DDT64_Pau_isocote_probabilite_moyenne"
  | "inondata:DDT64_Pau_isocote_probabilite_forte"
  | "inondata:DDT67_Holtzheim"
  | "inondata:DDT83_BESSE_SUR_ISSOLE"
  | "inondata:DDT84_Orange_Aleas";

export type AvailableStyle =
  | "inondata:hauteur_eau"
  | "inondata:aleas"
  | "inondata:vitesse_eau"
  | "inondata:hauteur_eau_4_classes"
  | "inondata:aleas_ddt84"
  | "inondata:ZIP_hauteur" // TODO: Seems to be ZIP data, we should generalize later
  | "inondata:l_zone_alea_pprl"
;

export const TERRITORY_ID_TO_TERRITORY: Record<AvailableTerritoryId, AvailableTerritory> = {
  ddtm14: "DDTM14",
  ddtm64: "DDTM64",
  ddt67: "DDT67",
  ddtm83: "DDTM83",
  ddt84: "DDT84",
};

export const TERRIRORY_TO_LAYERS: Record<AvailableTerritory, AvailableLayer[]> = {
  DDTM14: ["inondata:DDTM14"],
  DDTM64: [
    "inondata:DDT64_Pau_isocote_probabilite_faible",
    "inondata:DDT64_Pau_isocote_probabilite_moyenne",
    "inondata:DDT64_Pau_isocote_probabilite_forte",
  ],
  DDT67: ["inondata:DDT67_Holtzheim"],
  DDTM83: ["inondata:DDT83_BESSE_SUR_ISSOLE"],
  DDT84: ["inondata:DDT84_Orange_Aleas"],
};

export const LAYER_TO_STYLES: Record<AvailableLayer, AvailableStyle[]> = {
  "inondata:DDTM14": ["inondata:l_zone_alea_pprl"],
  "inondata:DDT64_Pau_isocote_probabilite_faible": ["inondata:hauteur_eau_4_classes"],
  "inondata:DDT64_Pau_isocote_probabilite_moyenne": ["inondata:hauteur_eau_4_classes"],
  "inondata:DDT64_Pau_isocote_probabilite_forte": ["inondata:hauteur_eau_4_classes"],
  "inondata:DDT67_Holtzheim": ["inondata:ZIP_hauteur"],
  "inondata:DDT83_BESSE_SUR_ISSOLE": [
    "inondata:hauteur_eau",
    "inondata:aleas",
    "inondata:vitesse_eau",
  ],
  "inondata:DDT84_Orange_Aleas": ["inondata:aleas_ddt84"],
};

const LAYER_AND_STYLE_TO_LAYER_NAME = {
  "inondata:DDTM14": {
    "inondata:l_zone_alea_pprl": "inondata:DDTM14",
  },
  "inondata:DDT64_Pau_isocote_probabilite_faible": {
    "inondata:hauteur_eau_4_classes": "inondata:DDT64_Pau_isocote_probabilite_faible",
  },
  "inondata:DDT64_Pau_isocote_probabilite_moyenne": {
    "inondata:hauteur_eau_4_classes": "inondata:DDT64_Pau_isocote_probabilite_moyenne",
  },
  "inondata:DDT64_Pau_isocote_probabilite_forte": {
    "inondata:hauteur_eau_4_classes": "inondata:DDT64_Pau_isocote_probabilite_forte",
  },
  "inondata:DDT67_Holtzheim": {
    "inondata:ZIP_hauteur": "inondata:DDT67_Holtzheim",
  },
  "inondata:DDT83_BESSE_SUR_ISSOLE": {
    "inondata:hauteur_eau": "inondata:DDT83_BESSE_SUR_ISSOLE_hauteur_eau",
    "inondata:aleas": "inondata:DDT83_BESSE_SUR_ISSOLE_aleas",
    "inondata:vitesse_eau": "inondata:DDT83_BESSE_SUR_ISSOLE_vitesse_eau",
  },
  "inondata:DDT84_Orange_Aleas": { "inondata:aleas_ddt84": "inondata:DDT84_Orange_Aleas" },
};

export const StyleToLegendLabel: Record<AvailableStyle, string> = {
  "inondata:hauteur_eau": "Hauteur d'eau",
  "inondata:vitesse_eau": "Vitesse d'eau",
  "inondata:aleas": "Aléas",
  "inondata:hauteur_eau_4_classes": "Hauteur d'eau",
  "inondata:aleas_ddt84": "Aléas",
  "inondata:ZIP_hauteur": "Hauteur d'eau",
  "inondata:l_zone_alea_pprl": "Aléas",
};

const get2DWaterSource = <T extends AvailableLayer>(
  layer: T,
  style: (typeof LAYER_TO_STYLES)[T][number]
) => {
  return new WMTSSource({
    url: "https://geoserver.bogato.fr/geoserver/inondata/gwc/service/wmts",
    crs: "EPSG:4326",
    format: "image/png",
    name: layer,
    style,
    tileMatrixSet: "EPSG:4326",
    tileMatrixCallback: (level: number) => `EPSG:4326:${level}`,
  });
};

const get2DWaterLayer = <T extends AvailableLayer>(
  layerName: string,
  layer: T,
  style: (typeof LAYER_TO_STYLES)[T][number]
) => {
  return new ColorLayer(layerName, { source: get2DWaterSource(layer, style) });
};

// DDTM14
const ddtm14AleasLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDTM14"][
    "inondata:l_zone_alea_pprl"
  ],
  "inondata:DDTM14",
  "inondata:l_zone_alea_pprl",
);

const ddtm14Layers = [
  ddtm14AleasLayer,
];

// DDTM 64

const ddtm64HauteurEauProbaFaibleLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_faible"][
    "inondata:hauteur_eau_4_classes"
  ],
  "inondata:DDT64_Pau_isocote_probabilite_faible",
  "inondata:hauteur_eau_4_classes"
);
const ddtm64HauteurEauProbaMoyenneLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_moyenne"][
    "inondata:hauteur_eau_4_classes"
  ],
  "inondata:DDT64_Pau_isocote_probabilite_moyenne",
  "inondata:hauteur_eau_4_classes"
);
const ddtm64HauteurEauProbaForteLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_forte"][
    "inondata:hauteur_eau_4_classes"
  ],
  "inondata:DDT64_Pau_isocote_probabilite_forte",
  "inondata:hauteur_eau_4_classes"
);

const ddtm64Layers = [
  ddtm64HauteurEauProbaFaibleLayer,
  ddtm64HauteurEauProbaMoyenneLayer,
  ddtm64HauteurEauProbaForteLayer,
];

// DDTM 83

const ddtm83HauteurEauLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT83_BESSE_SUR_ISSOLE"]["inondata:hauteur_eau"],
  "inondata:DDT83_BESSE_SUR_ISSOLE",
  "inondata:hauteur_eau"
);
const ddtm83VitesseEauLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT83_BESSE_SUR_ISSOLE"]["inondata:vitesse_eau"],
  "inondata:DDT83_BESSE_SUR_ISSOLE",
  "inondata:vitesse_eau"
);
const ddtm83AleasLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT83_BESSE_SUR_ISSOLE"]["inondata:aleas"],
  "inondata:DDT83_BESSE_SUR_ISSOLE",
  "inondata:aleas"
);

const ddtm83Layers = [ddtm83HauteurEauLayer, ddtm83VitesseEauLayer, ddtm83AleasLayer];

// DDT 84

const ddt84HauteurEauLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT84_Orange_Aleas"]["inondata:aleas_ddt84"],
  "inondata:DDT84_Orange_Aleas",
  "inondata:aleas_ddt84"
);

const ddt84Layers = [ddt84HauteurEauLayer];

const ddt67HoltzheimLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT67_Holtzheim"]["inondata:ZIP_hauteur"],
  "inondata:DDT67_Holtzheim",
  "inondata:ZIP_hauteur"
);

const ddt67Layers = [ddt67HoltzheimLayer, water3DLayer];

export type LayerSetter = { layerName: string; label: string; defaultVisibility: boolean };

const ddtm14Setters: LayerSetter[] = [
  {
    layerName:
      LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDTM14"][
        "inondata:l_zone_alea_pprl"
      ],
    label: StyleToLegendLabel["inondata:l_zone_alea_pprl"],
    defaultVisibility: true,
  }
];

const ddtm64Setters: LayerSetter[] = [
  {
    layerName:
      LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_forte"][
        "inondata:hauteur_eau_4_classes"
      ],
    label: "Crue décennale",
    defaultVisibility: true,
  },

  {
    layerName:
      LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_moyenne"][
        "inondata:hauteur_eau_4_classes"
      ],
    label: "Crue centennale",
    defaultVisibility: false,
  },
  {
    layerName:
      LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_faible"][
        "inondata:hauteur_eau_4_classes"
      ],
    label: "Crue millénale",
    defaultVisibility: false,
  },
];

const ddt67Setters: LayerSetter[] = [
  {
    layerName: LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT67_Holtzheim"]["inondata:ZIP_hauteur"],
    label: "Hauteurs d'eau (2D)",
    defaultVisibility: true,
  },
  {
    layerName: WaterLayerToLabel.WATER,
    label: "Hauteurs d'eau (3D)",
    defaultVisibility: false,
  },
];

const ddtm83Setters: LayerSetter[] = [
  {
    layerName:
      LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT83_BESSE_SUR_ISSOLE"]["inondata:hauteur_eau"],
    label: StyleToLegendLabel["inondata:hauteur_eau"],
    defaultVisibility: true,
  },
  {
    layerName:
      LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT83_BESSE_SUR_ISSOLE"]["inondata:vitesse_eau"],
    label: StyleToLegendLabel["inondata:vitesse_eau"],
    defaultVisibility: false,
  },
  {
    layerName: LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT83_BESSE_SUR_ISSOLE"]["inondata:aleas"],
    label: StyleToLegendLabel["inondata:aleas"],
    defaultVisibility: false,
  },
];

const ddt84Setters: LayerSetter[] = [
  {
    layerName: LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT84_Orange_Aleas"]["inondata:aleas_ddt84"],
    label: StyleToLegendLabel["inondata:aleas_ddt84"],
    defaultVisibility: true,
  },
];

export const TERRITORY_TO_LAYERS: Record<AvailableTerritory, (ColorLayer | WaterLayer)[]> = {
  DDTM14: ddtm14Layers,
  DDTM64: ddtm64Layers,
  DDT67: ddt67Layers,
  DDTM83: ddtm83Layers,
  DDT84: ddt84Layers,
};

export const TERRITORY_TO_LAYER_SETTERS: Record<AvailableTerritory, LayerSetter[]> = {
  DDTM14: ddtm14Setters,
  DDTM64: ddtm64Setters,
  DDT67: ddt67Setters,
  DDTM83: ddtm83Setters,
  DDT84: ddt84Setters,
};

//TODO enhance with values from TERRITORY_TO_STYLES
export const TERRITORY_TO_LEGEND_ITEMS: Record<AvailableTerritory, AvailableStyle[]> = {
  DDTM14: ["inondata:l_zone_alea_pprl"],
  DDTM64: ["inondata:hauteur_eau_4_classes"],
  DDT67: ["inondata:ZIP_hauteur"],
  DDTM83: ["inondata:hauteur_eau", "inondata:vitesse_eau", "inondata:aleas"],
  DDT84: ["inondata:aleas_ddt84"],
};

export const TERRITORY_ID_TO_PLACEMENT: Record<AvailableTerritory, Placement> = {
  DDTM14: {
    coord: new Coordinates('EPSG:4326', -0.11465, 49.25848),
    range: 7500,
    heading: 0,
    tilt: 0,
  },
  DDTM64: {
    coord: new Coordinates("EPSG:4326", -0.50089, 43.3455),
    range: 75000,
    heading: 0,
    tilt: 0,
  },
  DDT67: {
    coord: new Coordinates("EPSG:4326", 7.75202, 48.58853),
    range: 75000,
    heading: 0,
    tilt: 0,
  },
  DDTM83: {
    coord: new Coordinates("EPSG:4326", 6.1839, 43.339),
    range: 35000,
    tilt: 0,
    heading: 0,
  },
  DDT84: {
    coord: new Coordinates("EPSG:4326", 4.954455061392031, 44.037664109933104),
    range: 150000,
    tilt: 0,
    heading: 0,
  },
};
