import { useEffect, useState } from "react";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import { getIgnTileLayer } from "../map/ignTileLayer";
import { zoomController } from "../map/controllers";

const useMap = (target: string, center: [number, number], zoom: number) => {
  const [view, setView] = useState<View | undefined>(undefined);

  const ignTileLayer = getIgnTileLayer();

  const initialView = new View({
    zoom,
    center: fromLonLat(center),
  });

  useEffect(() => {
    const map = new Map({
      target,
      layers: [ignTileLayer],
      view: initialView,
      controls: [zoomController],
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
