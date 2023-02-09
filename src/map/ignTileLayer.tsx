import TileLayer from "ol/layer/Tile";
import ImageLayer from "ol/layer/Image";
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import ImageWMS from "ol/source/ImageWMS";

type IGN_LAYERS =
  | "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"
  | "ORTHOIMAGERY.ORTHOPHOTOS"
  | "LIMITES_ADMINISTRATIVES_EXPRESS.LATEST";

const LAYERS_TO_FORMAT: { [key in IGN_LAYERS]: "image/jpeg" | "image/png" } = {
  "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2": "image/png",
  "ORTHOIMAGERY.ORTHOPHOTOS": "image/jpeg",
  "LIMITES_ADMINISTRATIVES_EXPRESS.LATEST": "image/png",
};

const LAYERS_TO_URL_CODE: {
  [key in IGN_LAYERS]: "choisirgeoportail" | "0gd4sx9gxx6ves3hf3hfeyhw";
} = {
  "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2": "choisirgeoportail",
  "ORTHOIMAGERY.ORTHOPHOTOS": "choisirgeoportail",
  "LIMITES_ADMINISTRATIVES_EXPRESS.LATEST": "0gd4sx9gxx6ves3hf3hfeyhw",
};

const EPSG3857 = "EPSG:3857";

const getIgnWMTS = (layer: IGN_LAYERS): WMTS => {
  const resolutions = [
    156543.03392804103, 78271.5169640205, 39135.75848201024, 19567.879241005125, 9783.939620502562,
    4891.969810251281, 2445.9849051256406, 1222.9924525628203, 611.4962262814101,
    305.74811314070485, 152.87405657035254, 76.43702828517625, 38.218514142588134,
    19.109257071294063, 9.554628535647034, 4.777314267823517, 2.3886571339117584,
    1.1943285669558792, 0.5971642834779396, 0.29858214173896974, 0.14929107086948493,
    0.07464553543474241,
  ];

  const matrixIds = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
  ];

  return new WMTS({
    url: `https://wxs.ign.fr/${LAYERS_TO_URL_CODE[layer]}/geoportail/wmts`,
    layer,
    matrixSet: "PM",
    format: LAYERS_TO_FORMAT[layer],
    style: "normal",
    projection: EPSG3857,
    tileGrid: new WMTSTileGrid({
      origin: [-20037508, 20037508],
      resolutions,
      matrixIds,
    }),
  });
};

export const getIgnWMTSTileLayer = (layer: IGN_LAYERS) => {
  const source = getIgnWMTS(layer);
  return new TileLayer({ source });
};

const aiPredictionSource = new ImageWMS({
  url: "https://wxs.ign.fr/ocsge/geoportail/r/wms",
  projection: EPSG3857,
  params: { WIDTH: "256", HEIGHT: "256", LAYERS: "OCSGE.VISU.2019" },
});

export const aiPredictionLayer = new ImageLayer({ source: aiPredictionSource });
