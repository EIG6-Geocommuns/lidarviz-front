import { Zoom } from "ol/control";
import "./controllers.css";

export const zoomController = new Zoom({
  zoomInTipLabel: "Zoomer",
  zoomOutTipLabel: "Dézoomer",
  className: "map_controllers_zoom",
  zoomInClassName: "map_controllers_zoom_button",
  zoomOutClassName: "map_controllers_zoom_button",
});
