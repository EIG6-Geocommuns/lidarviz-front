import { MutableRefObject, memo } from "react";
import { useConstCallback } from "powerhooks";
import { LayerSetter } from "./LayerSetter";

import type { GlobeView } from "itowns";
import type { WaterLayerKind, WaterLayerSetter } from "../types/Layers";

type Setter = WaterLayerSetter<WaterLayerKind>
type ViewRef = MutableRefObject<GlobeView | null>;

type Props = {
  viewRef: ViewRef;
  layerSetters: Setter[];
};

type SingleLayerProps = {
  viewRef: ViewRef;
  layerSetter: Setter;
};

const SingleLayerSetter = ({ viewRef, layerSetter }: SingleLayerProps) => {
  return (
    <LayerSetter
      viewRef={viewRef}
      layerSetter={layerSetter} />
  );
};
const AleaLayerSetter = SingleLayerSetter;
const HauteurLayerSetter = SingleLayerSetter;
const VitesseLayerSetter = SingleLayerSetter;

export const WaterLayerSetters = ({ viewRef, layerSetters }: Props) => {
  const generateOpacitySlider = useConstCallback((layerSetter: Setter) => {
    const LayerSetter =
        layerSetter.kind === "alea" ? AleaLayerSetter :
        layerSetter.kind === "hauteur" ? HauteurLayerSetter :
        VitesseLayerSetter;

    return(
      <LayerSetter
        viewRef={viewRef}
        layerSetter={layerSetter} />
    );
  });

  return <> {layerSetters.map((ls: Setter) => generateOpacitySlider(ls))}</>;
};

export const MemoizedWaterLayerSetters = memo(WaterLayerSetters);
