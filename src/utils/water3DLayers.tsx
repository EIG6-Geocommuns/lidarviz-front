import { WMTSSource, Fetcher } from "itowns";
import * as THREE from "three";
import { AggregateSource, WaterLayer } from "inondata-itowns";

export type AvailableWaterLayer = "WATER";

export const WaterLayerToLabel: { [layer in AvailableWaterLayer]: string } = {
  WATER: "Inondation 3D",
};

// TODO: Change unsound WMTSSource type in itowns.
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const waterDisplacementSource: any = new WMTSSource({
  url: "https://wxs.ign.fr/altimetrie/geoportail/wmts",
  crs: "EPSG:4326",
  format: "image/x-bil;bits=32",
  name: "ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES",
  tileMatrixSet: "WGS84G",
  zoom: { min: 11, max: 14 },
  parser: (height: THREE.DataTexture) => Promise.resolve(height),
});

// TODO: Change unsound WMTSSource type in itowns.
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const waterHeigtMapSource: any = new WMTSSource({
  url: "https://geoserver.bogato.fr/geoserver/test/gwc/service/wmts",
  crs: "EPSG:4326",
  format: "image/png",
  name: "test:EMS_q100_hauteur_raster",
  style: "test:raster_greyscale",
  tileMatrixSet: "EPSG:4326",
  tileMatrixCallback: (level: number) => `EPSG:4326:${level}`,
  fetcher: Fetcher.texture,
  parser: (height: THREE.DataTexture) => {
    return Promise.resolve(height);
  },
});

// TODO: Create a Source interface or inherit Source class.
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const water3DSource: any = new AggregateSource("EPSG:4326", [
  waterDisplacementSource,
  waterHeigtMapSource,
]);

export const water3DLayer = new WaterLayer(WaterLayerToLabel.WATER, {
  source: water3DSource,
  zoom: { min: 11, max: 19 },
  heightScale: 10,
});
