import { useEffect, useState } from "react";
import { Map, View } from "ol";
import { getIgnWMTSTileLayer, aiPredictionLayer } from "../map/ignTileLayer";
import { fromLonLat, Projection } from "ol/proj";
import { zoomController, positionCurseurController } from "../map/controllers";
import { Polygon } from "ol/geom";
import { Coordinate } from "ol/coordinate";

const useMap = (target: string, center: [number, number], zoom: number) => {
  const [view, setView] = useState<View | undefined>(undefined);

  const orthoLayer = getIgnWMTSTileLayer("ORTHOIMAGERY.ORTHOPHOTOS");
  const adminLayer = getIgnWMTSTileLayer(
    "LIMITES_ADMINISTRATIVES_EXPRESS.LATEST"
  );

  const initialView = new View({
    zoom,
    center: fromLonLat(center),
  });

  useEffect(() => {
    const map = new Map({
      target,
      layers: [orthoLayer, adminLayer, aiPredictionLayer],
      view: initialView,
      controls: [zoomController, positionCurseurController],
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

  const fitViewToPolygon = (coordinates: Coordinate[][]) => {
    const epsg4326 = new Projection({ code: "EPSG:4326" });
    const epsg3857 = new Projection({ code: "EPSG:3857" });
    const polygon = new Polygon(coordinates).transform(
      epsg4326,
      epsg3857
    ) as Polygon;

    view?.fit(polygon);
  };

  return { setNewCenterAndNewZoom, fitViewToPolygon };
};

export default useMap;
