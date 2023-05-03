import { WMTSSource, ColorLayer } from "itowns";

export type AvailableTerritoryId = "ddt83" | "ddt64";
export type AvailableTerritory = "DDT83" | "DDT64";
export type AvailableLayer =
  | "inondata:DDT83_BESSE_SUR_ISSOLE"
  | "inondata:DDT64_Pau_isocote_probabilite_faible"
  | "inondata:DDT64_Pau_isocote_probabilite_moyenne"
  | "inondata:DDT64_Pau_isocote_probabilite_forte";

export type AvailableStyle =
  | "inondata:hauteur_eau"
  | "inondata:aleas"
  | "inondata:vitesse_eau"
  | "inondata:hauteur_eau_4_classes";

export const TERRITORY_ID_TO_TERRITORY: Record<AvailableTerritoryId, AvailableTerritory> = {
  ddt83: "DDT83",
  ddt64: "DDT64",
};

export const TERRIRORY_TO_LAYERS: Record<AvailableTerritory, AvailableLayer[]> = {
  DDT83: ["inondata:DDT83_BESSE_SUR_ISSOLE"],
  DDT64: [
    "inondata:DDT64_Pau_isocote_probabilite_faible",
    "inondata:DDT64_Pau_isocote_probabilite_moyenne",
    "inondata:DDT64_Pau_isocote_probabilite_forte",
  ],
};

export const LAYER_TO_STYLES: Record<AvailableLayer, AvailableStyle[]> = {
  "inondata:DDT83_BESSE_SUR_ISSOLE": [
    "inondata:hauteur_eau",
    "inondata:aleas",
    "inondata:vitesse_eau",
  ],
  "inondata:DDT64_Pau_isocote_probabilite_faible": ["inondata:hauteur_eau_4_classes"],
  "inondata:DDT64_Pau_isocote_probabilite_moyenne": ["inondata:hauteur_eau_4_classes"],
  "inondata:DDT64_Pau_isocote_probabilite_forte": ["inondata:hauteur_eau_4_classes"],
};

const LAYER_AND_STYLE_TO_LAYER_NAME = {
  "inondata:DDT83_BESSE_SUR_ISSOLE": {
    "inondata:hauteur_eau": "inondata:DDT83_BESSE_SUR_ISSOLE_hauteur_eau",
    "inondata:aleas": "inondata:DDT83_BESSE_SUR_ISSOLE_aleas",
    "inondata:vitesse_eau": "inondata:DDT83_BESSE_SUR_ISSOLE_vitesse_eau",
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
};

export const StyleToLegendLabel: Record<AvailableStyle, string> = {
  "inondata:hauteur_eau": "Hauteur d'eau",
  "inondata:vitesse_eau": "Vitesse d'eau",
  "inondata:aleas": "Aléas",
  "inondata:hauteur_eau_4_classes": "Hauteur d'eau",
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

const ddt83HauteurEauProbaFaibleLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_faible"][
    "inondata:hauteur_eau_4_classes"
  ],
  "inondata:DDT64_Pau_isocote_probabilite_faible",
  "inondata:hauteur_eau_4_classes"
);
const ddt83HauteurEauProbaMoyenneLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_moyenne"][
    "inondata:hauteur_eau_4_classes"
  ],
  "inondata:DDT64_Pau_isocote_probabilite_moyenne",
  "inondata:hauteur_eau_4_classes"
);
const ddt83HauteurEauProbaForteLayer = get2DWaterLayer(
  LAYER_AND_STYLE_TO_LAYER_NAME["inondata:DDT64_Pau_isocote_probabilite_forte"][
    "inondata:hauteur_eau_4_classes"
  ],
  "inondata:DDT64_Pau_isocote_probabilite_forte",
  "inondata:hauteur_eau_4_classes"
);
const ddt64Layers = [
  ddt83HauteurEauProbaFaibleLayer,
  ddt83HauteurEauProbaMoyenneLayer,
  ddt83HauteurEauProbaForteLayer,
];

export type LayerSetter = { layerName: string; label: string; defaultVisibility: boolean };

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

export const TERRITORY_TO_LAYERS: Record<AvailableTerritory, ColorLayer[]> = {
  DDT83: ddt83Layers,
  DDT64: ddt64Layers,
};

export const TERRITORY_TO_LAYER_SETTERS: Record<AvailableTerritory, LayerSetter[]> = {
  DDT83: ddt83Setters,
  DDT64: ddt64Setters,
};

//TODO enhance with values from TERRITORY_TO_STYLES
export const TERRITORY_TO_LEGEND_ITEMS: Record<AvailableTerritory, AvailableStyle[]> = {
  DDT83: ["inondata:hauteur_eau", "inondata:vitesse_eau", "inondata:aleas"],
  DDT64: ["inondata:hauteur_eau_4_classes"],
};
