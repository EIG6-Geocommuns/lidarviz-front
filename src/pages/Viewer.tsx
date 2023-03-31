import * as itowns from "itowns";
import { View } from "../components/View";

const placement = {
  coord: new itowns.Coordinates('EPSG:4326', 5.395317, 43.460333),
  range: 15000,
  tilt: 0,
  heading: 0
};

export const Viewer = () => {
  return (
    <View id="viewer" placement={placement} />
  );
}
