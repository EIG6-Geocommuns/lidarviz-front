import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { fromLonLat, get as getProjection } from "ol/proj";
import { getWidth } from "ol/extent";
import { useEffect, useState } from "react";

const useMap = (target: string, center: [number, number], zoom: number) => {
  const resolutions = [];
  const matrixIds = [];
  const proj3857 = getProjection("EPSG:3857");
  const maxResolution = proj3857 ? getWidth(proj3857.getExtent()) / 256 : 10;
  const [view, setView] = useState<View | undefined>(undefined);

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
  const ign_source = new WMTS({
    url: "https://wxs.ign.fr/choisirgeoportail/geoportail/wmts",
    layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
    matrixSet: "PM",
    format: "image/png",
    projection: "EPSG:3857",
    tileGrid: tileGrid,
    style: "normal",
  });

  const ign = new TileLayer({
    source: ign_source,
  });

  const initialView = new View({
    zoom,
    center: fromLonLat(center),
  });

  useEffect(() => {
    const map = new Map({
      target,
      layers: [ign],
      view: initialView,
      controls: [],
    });
    setView(initialView);

    return () => map.setTarget(undefined);
  }, []);

  const setNewCenterAndNewZoom = (
    coordinates: [number, number],
    zoom: number
  ) => {
    view?.setCenter(fromLonLat(coordinates));
    view?.setZoom(zoom);
  };
  return setNewCenterAndNewZoom;
};

export default useMap;
