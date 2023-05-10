import { WMTSSource, ColorLayer } from "itowns";

export type AvailableTerritoryId = "ddt64" | "ddt67" | "ddt83" | "ddt84";
export type AvailableTerritory = "DDT64" | "DDT67" | "DDT83" | "DDT84";
export type AvailableLayer =
  | "inondata:DDT64_Pau_isocote_probabilite_faible"
  | "inondata:DDT64_Pau_isocote_probabilite_moyenne"
  | "inondata:DDT64_Pau_isocote_probabilite_forte"
  | "inondata:DDT67_Holtzheim"
  | "inondata:DDT83_BESSE_SUR_ISSOLE"
  | "inondata:DDT84_Orange_Aleas"
  ;

export type AvailableStyle =
  | "inondata:hauteur_eau"
  | "inondata:aleas"
  | "inondata:vitesse_eau"
  | "inondata:hauteur_eau_4_classes"
  | "inondata:aleas_ddt84"
  | "inondata:ZIP_hauteur" // TODO: Seems to be ZIP data, we should generalize later
  ;

export const TERRITORY_ID_TO_TERRITORY: Record<AvailableTerritoryId, AvailableTerritory> = {
  ddt64: "DDT64",
  ddt67: "DDT67",
  ddt83: "DDT83",
  ddt84: "DDT84",
};

export const TERRIRORY_TO_LAYERS: Record<AvailableTerritory, AvailableLayer[]> = {
  DDT64: [
    "inondata:DDT64_Pau_isocote_probabilite_faible",
    "inondata:DDT64_Pau_isocote_probabilite_moyenne",
    "inondata:DDT64_Pau_isocote_probabilite_forte",
  ],
  DDT67: [
    "inondata:DDT67_Holtzheim",
  ],
  DDT83: ["inondata:DDT83_BESSE_SUR_ISSOLE"],
  DDT84: ["inondata:DDT84_Orange_Aleas"],
};

export const LAYER_TO_STYLES: Record<AvailableLayer, AvailableStyle[]> = {
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

// DDT 64

const ddt64HauteurEauProbaFaibleLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_faible"][
    "inondata:hauteur_eau_4_classes"
  ],
  "inondata:DDT64_Pau_isocote_probabilite_faible",
  "inondata:hauteur_eau_4_classes"
);
const ddt64HauteurEauProbaMoyenneLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_moyenne"][
    "inondata:hauteur_eau_4_classes"
  ],
  "inondata:DDT64_Pau_isocote_probabilite_moyenne",
  "inondata:hauteur_eau_4_classes"
);
const ddt64HauteurEauProbaForteLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_forte"][
    "inondata:hauteur_eau_4_classes"
  ],
  "inondata:DDT64_Pau_isocote_probabilite_forte",
  "inondata:hauteur_eau_4_classes"
);

const ddt64Layers = [
  ddt64HauteurEauProbaFaibleLayer,
  ddt64HauteurEauProbaMoyenneLayer,
  ddt64HauteurEauProbaForteLayer,
];

// DDT 83

const ddt83HauteurEauLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT83_BESSE_SUR_ISSOLE"]["inondata:hauteur_eau"],
  "inondata:DDT83_BESSE_SUR_ISSOLE",
  "inondata:hauteur_eau"
);
const ddt83VitesseEauLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT83_BESSE_SUR_ISSOLE"]["inondata:vitesse_eau"],
  "inondata:DDT83_BESSE_SUR_ISSOLE",
  "inondata:vitesse_eau"
);
const ddt83AleasLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT83_BESSE_SUR_ISSOLE"]["inondata:aleas"],
  "inondata:DDT83_BESSE_SUR_ISSOLE",
  "inondata:aleas"
);

const ddt83Layers = [ddt83HauteurEauLayer, ddt83VitesseEauLayer, ddt83AleasLayer];

// DDT 84

const ddt84HauteurEauLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT84_Orange_Aleas"]["inondata:aleas_ddt84"],
  "inondata:DDT84_Orange_Aleas",
  "inondata:aleas_ddt84"
);

const ddt84Layers = [ddt84HauteurEauLayer];

const ddt67HoltzheimLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT67_Holtzheim"][
    "inondata:ZIP_hauteur"
  ],
  "inondata:DDT67_Holtzheim",
  "inondata:ZIP_hauteur",
);

const ddt67Layers= [
  ddt67HoltzheimLayer,
];

export type LayerSetter = { layerName: string; label: string; defaultVisibility: boolean };

const ddt64Setters: LayerSetter[] = [
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
    layerName:
      LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT67_Holtzheim"][
        "inondata:ZIP_hauteur"
      ],
    label: "Holtzheim (4m76)",
    defaultVisibility: true,
  },
];

const ddt83Setters: LayerSetter[] = [
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

export const TERRITORY_TO_LAYERS: Record<AvailableTerritory, ColorLayer[]> = {
  DDT64: ddt64Layers,
  DDT67: ddt67Layers,
  DDT83: ddt83Layers,
  DDT84: ddt84Layers,
};

export const TERRITORY_TO_LAYER_SETTERS: Record<AvailableTerritory, LayerSetter[]> = {
  DDT64: ddt64Setters,
  DDT67: ddt67Setters,
  DDT83: ddt83Setters,
  DDT84: ddt84Setters,
};

//TODO enhance with values from TERRITORY_TO_STYLES
export const TERRITORY_TO_LEGEND_ITEMS: Record<AvailableTerritory, AvailableStyle[]> = {
  DDT64: ["inondata:hauteur_eau_4_classes"],
  DDT67: ["inondata:ZIP_hauteur"],
  DDT83: ["inondata:hauteur_eau", "inondata:vitesse_eau", "inondata:aleas"],
  DDT84: ["inondata:aleas_ddt84"],
};
