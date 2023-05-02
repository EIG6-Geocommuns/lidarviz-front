import { WMTSSource, ColorLayer } from "itowns";

export type AvailableTerritory = "DDT83";

export const TERRIRORY_TO_NAME: Record<AvailableTerritory, string> = {
  DDT83: "inondata:DDT83_BESSE_SUR_ISSOLE",
};

export type TERRITORY_TO_STYLES = {
  DDT83: "inondata:hauteur_eau" | "inondata:aleas" | "inondata:vitesse_eau";
};

export const StyleToLegendLabel = {
  "inondata:hauteur_eau": "Hauteur d'eau",
  "inondata:vitesse_eau": "Vitesse d'eau",
  "inondata:aleas": "Aléas",
};

const get2DWaterSource = <T extends AvailableTerritory>(
  territory: T,
  style: TERRITORY_TO_STYLES[T]
) => {
  const name = TERRIRORY_TO_NAME[territory];
  return new WMTSSource({
    url: "https://geoserver.bogato.fr/geoserver/inondata/gwc/service/wmts",
    crs: "EPSG:4326",
    format: "image/png",
    name,
    style,
    tileMatrixSet: "EPSG:4326",
    tileMatrixCallback: (level: number) => `EPSG:4326:${level}`,
  });
};

const get2DWaterLayer = <T extends AvailableTerritory>(
  territory: T,
  style: TERRITORY_TO_STYLES[T]
) => {
  return new ColorLayer(StyleToLegendLabel[style], { source: get2DWaterSource(territory, style) });
};

const ddt83HauteurEauLayer = get2DWaterLayer("DDT83", "inondata:hauteur_eau");
const ddt83VitesseEauLayer = get2DWaterLayer("DDT83", "inondata:vitesse_eau");
const ddt83AleasLayer = get2DWaterLayer("DDT83", "inondata:aleas");

export const ddt83Layers = [ddt83HauteurEauLayer, ddt83VitesseEauLayer, ddt83AleasLayer];
export const ddt83Setters = [
  { label: StyleToLegendLabel["inondata:hauteur_eau"], defaultVisibility: true },
  { label: StyleToLegendLabel["inondata:vitesse_eau"], defaultVisibility: false },
  { label: StyleToLegendLabel["inondata:aleas"], defaultVisibility: false },
];
