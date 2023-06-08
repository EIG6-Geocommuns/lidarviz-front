import { WMTSSource, Fetcher, Source } from "itowns";
import * as THREE from "three";
import { AggregateSource, WaterLayer } from "inondata-itowns";

export type AvailableWaterLayer = "DDT67" | "DDT45";

export const WaterLayerToLabel: { [layer in AvailableWaterLayer]: string } = {
  DDT67: "Inondation 3D",
  DDT45: "Inondation 3D (Faible probabilité)",
};

function defaultDisplacementSource(): Source {
  // TODO: Change unsound WMTSSource type in itowns.
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const ignDisplacementSource: any = new WMTSSource({
    url: "https://wxs.ign.fr/altimetrie/geoportail/wmts",
    crs: "EPSG:4326",
    format: "image/x-bil;bits=32",
    name: "ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES",
    tileMatrixSet: "WGS84G",
    zoom: { min: 11, max: 14 },
    parser: (height: THREE.DataTexture) => Promise.resolve(height),
  });

  return ignDisplacementSource;
}

function greyscaleHeightSource(name: string, style: string): Source {
  // TODO: Change unsound WMTSSource type in itowns.
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const heightMapSource: any = new WMTSSource({
    url: "https://geoserver.bogato.fr/geoserver/inondata/gwc/service/wmts",
    crs: "EPSG:4326",
    format: "image/png",
    name,
    style,
    tileMatrixSet: "EPSG:4326",
    tileMatrixCallback: (level: number) => `EPSG:4326:${level}`,
    fetcher: Fetcher.texture,
    parser: (height: THREE.Texture) => {
      height.flipY = true; // Implicit
      return Promise.resolve(height);
    },
  });

  return heightMapSource;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const water3DSource45: any = new AggregateSource("EPSG:4326", [
  defaultDisplacementSource(),
  greyscaleHeightSource(
    "inondata:DDT45_isocote_probabilite_faible",
    "inondata:hauteur_eau_greyscale_ddt45",
  ),
]);

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const water3DSource67: any = new AggregateSource("EPSG:4326", [
  defaultDisplacementSource(),
  greyscaleHeightSource(
      "inondata:strasbourg",
      "inondata:DDT67_degrade_gris",
  ),
]);

export const water3DLayer45 = new WaterLayer(WaterLayerToLabel.DDT45, {
  source: water3DSource45,
  zoom: { min: 11, max: 19 },
  heightBias: 0,
  heightScale: 10,
});

export const water3DLayer67 = new WaterLayer(WaterLayerToLabel.DDT67, {
  source: water3DSource67,
  zoom: { min: 11, max: 19 },
  heightBias: 0,
  heightScale: 1,
});
