import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { get as getProjection } from "ol/proj";
import { getWidth } from "ol/extent";

export const getIgnTileLayer = () => {
  const resolutions = [];
  const matrixIds = [];
  const proj3857 = getProjection("EPSG:3857");
  const maxResolution = proj3857 ? getWidth(proj3857.getExtent()) / 256 : 10;

  for (let i = 0; i < 20; i++) {
    matrixIds[i] = i.toString();
    resolutions[i] = maxResolution / Math.pow(2, i);
  }

  const tileGrid = new WMTSTileGrid({
    origin: [-20037508, 20037508],
    resolutions: resolutions,
    matrixIds: matrixIds,
  });

  // For more information about the IGN API key see
  // https://geoservices.ign.fr/blog/2021/01/29/Maj_Cles_Geoservices.html
  const ignSource = new WMTS({
    url: "https://wxs.ign.fr/choisirgeoportail/geoportail/wmts",
    layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
    matrixSet: "PM",
    format: "image/png",
    projection: "EPSG:3857",
    tileGrid: tileGrid,
    style: "normal",
  });

  const ignTileLayer = new TileLayer({
    source: ignSource,
  });

  return ignTileLayer;
};
