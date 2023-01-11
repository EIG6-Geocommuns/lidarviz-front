import { MousePosition, Zoom } from "ol/control";
import { Coordinate, format } from "ol/coordinate";

import "./controllers.css";

export const zoomController = new Zoom({
  zoomInTipLabel: "Zoomer",
  zoomOutTipLabel: "Dézoomer",
  className: "map_controllers_zoom",
  zoomInClassName: "map_controllers_zoom_button",
  zoomOutClassName: "map_controllers_zoom_button",
});

export var positionCurseurController = new MousePosition({
  coordinateFormat: function (coordinate: Coordinate | undefined) {
    return format(
      coordinate === undefined ? [0, 0] : coordinate,
      '<span><i class="fas fa-map-marker-alt"></i> {x} ° | {y} °</span>',
      6
    );
  },
  projection: "EPSG:4326",
});
