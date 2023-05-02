import {
  WMTSSource,
  ElevationLayer,
  WFSSource,
  Style,
  FileSource,
  Fetcher,
  ColorLayer,
  FeatureGeometryLayer,
} from "itowns";
import * as THREE from "three";
import { WaterLayer } from "inondata-itowns";

export type AvailableColorLayer = "PLAN_IGN" | "ORTHO" | "WATER2D";
export type AvailableElevationLayer = "BD_ALTI" | "WORLD";
export type AvailableFeatureLayer = "BUILDING";
export type AvailableWaterLayer = "WATER";

export const ColorLayerToLabel: { [layer in AvailableColorLayer]: string } = {
  PLAN_IGN: "Plan IGN",
  ORTHO: "Ortho IGN",
  WATER2D: "Inondation Sainte-Rose",
};

export const ElevationLayerToLabel: { [layer in AvailableElevationLayer]: string } = {
  BD_ALTI: "BD Alti",
  WORLD: "SRTM3",
};

export const FeatureLayerToLabel: { [layer in AvailableFeatureLayer]: string } = {
  BUILDING: "Bâtiments",
};

export const WaterLayerToLabel: { [layer in AvailableWaterLayer]: string } = {
  WATER: "Inondation",
};

const srtm3Source = new WMTSSource({
  format: "image/x-bil;bits=32",
  crs: "EPSG:4326",
  url: "https://wxs.ign.fr/altimetrie/geoportail/wmts",
  name: "ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3",
  tileMatrixSet: "WGS84G",
  zoom: { min: 3, max: 10 },
});

const altiSource = new WMTSSource({
  url: "https://wxs.ign.fr/altimetrie/geoportail/wmts",
  crs: "EPSG:4326",
  format: "image/x-bil;bits=32",
  name: "ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES",
  tileMatrixSet: "WGS84G",
  zoom: { min: 11, max: 14 },
});

const planIGNSource = new WMTSSource({
  url: "https://wxs.ign.fr/essentiels/geoportail/wmts",
  crs: "EPSG:3857",
  format: "image/png",
  name: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
  tileMatrixSet: "PM",
  zoom: { min: 0, max: 19 },
});

const orthoSource = new WMTSSource({
  url: "https://wxs.ign.fr/decouverte/geoportail/wmts",
  crs: "EPSG:3857",
  format: "image/jpeg",
  name: "ORTHOIMAGERY.ORTHOPHOTOS",
  tileMatrixSet: "PM",
  zoom: { min: 2, max: 21 },
});

const buildingSource = new WFSSource({
  url: "https://wxs.ign.fr/essentiels/geoportail/wfs?", //
  protocol: "wfs",
  version: "2.0.0",
  typeName: "BDTOPO_V3:batiment",
  crs: "EPSG:4326", //
  zoom: { min: 14, max: 14 },
});

const water2DSource = new WMTSSource({
  url: "http://geoserver.bogato.fr/geoserver/inondata/gwc/service/wmts",
  crs: "EPSG:4326",
  format: "image/png",
  name: "inondata:ALEA_INOND_SteRose_APPROBATION_2022",
  style: "inondata:risk_v1",
  tileMatrixSet: "EPSG:4326",
  tileMatrixCallback: (level: number) => `EPSG:4326:${level}`,
});

const color = new THREE.Color();

const buildingStyle = new Style({
  fill: {
    color: (_: object) => {
      return color.set(0xdcd646);
    },
    base_altitude: (p: { altitude_minimale_sol: number }) => {
      // TODO: Type BD Ortho
      return p.altitude_minimale_sol;
    },
    extrusion_height: (p: { hauteur: number }) => p.hauteur,
  },
});

const waterSource = new FileSource({
  url: "https://raw.githubusercontent.com/iTowns/iTowns2-sample-data/master/geoid/localcolors/jpg/1/localcolors_0_0.jpg", // TODO: Change hardcoded elevation data
  crs: "EPSG:4326",
  fetcher: Fetcher.texture,
  parser: (height: THREE.Texture) => {
    return Promise.resolve({ height });
  },
});

const planIGNLayer = new ColorLayer(ColorLayerToLabel.PLAN_IGN, {
  source: planIGNSource,
});

const orthoLayer = new ColorLayer(ColorLayerToLabel.ORTHO, {
  source: orthoSource,
});

const water2DLayer = new ColorLayer(ColorLayerToLabel.WATER2D, {
  source: water2DSource,
});

const altiLayer = new ElevationLayer(ElevationLayerToLabel.BD_ALTI, {
  source: altiSource,
});

const srtm3Layer = new ElevationLayer(ElevationLayerToLabel.WORLD, {
  source: srtm3Source,
});

// TODO: Missing some type definitions in itowns, cast for now
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = {
  crs: "EPSG:4326",
  source: buildingSource,
  style: buildingStyle,
  zoom: { min: 15 },
};

const buildingLayer = new FeatureGeometryLayer(FeatureLayerToLabel.BUILDING, config);

const waterLayer = new WaterLayer(WaterLayerToLabel.WATER, {
  source: waterSource,
  zoom: { min: 11, max: 19 },
});

export const ColorLayerToItownsLayer: { [layer in AvailableColorLayer]: ColorLayer } = {
  PLAN_IGN: planIGNLayer,
  ORTHO: orthoLayer,
  WATER2D: water2DLayer,
};

export const ElevationLayerToItownsLayer: {
  [layer in AvailableElevationLayer]: ElevationLayer;
} = {
  BD_ALTI: altiLayer,
  WORLD: srtm3Layer,
};

export const FeatureLayerToItownsLayer: {
  [layer in AvailableFeatureLayer]: FeatureGeometryLayer;
} = {
  BUILDING: buildingLayer,
};

export const WaterLayerToItownsLayer: { [layer in AvailableWaterLayer]: WaterLayer } = {
  WATER: waterLayer,
};
