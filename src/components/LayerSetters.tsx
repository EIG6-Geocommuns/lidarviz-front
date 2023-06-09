import { memo } from "react";
import { useConstCallback } from "powerhooks";
import { LayerSetter } from "./LayerSetter";

import type { MutableRefObject } from "react";
import type { GlobeView } from "itowns";
import type { LayerSetter as Setter } from "../types/Layers";

type ViewRef = MutableRefObject<GlobeView | null>;

type Props = {
  viewRef: ViewRef;
  layerSetters: Setter[];
};

export const LayerSetters = ({ viewRef, layerSetters }: Props) => {
  const generateOpacitySlider = useConstCallback((layerSetter: Setter) => {
    return (
      <LayerSetter
        viewRef={viewRef}
        layerSetter={layerSetter} />
    );
  });

  return <> {layerSetters.map((ls: Setter) => generateOpacitySlider(ls))}</>;
};

export const MemoizedLayerSetters = memo(LayerSetters);
