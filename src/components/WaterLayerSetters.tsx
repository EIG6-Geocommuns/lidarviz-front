import { MutableRefObject, memo, useState } from "react";
import { useConstCallback } from "powerhooks";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { LayerSetter } from "./LayerSetter";

import type { GlobeView } from "itowns";
import type { WaterLayerKind, WaterLayerSetter } from "../types/Layers";

type Setter = WaterLayerSetter<WaterLayerKind>
type ViewRef = MutableRefObject<GlobeView | null>;
type Dim = "2D" | "3D";

type Props = {
  viewRef: ViewRef;
  layerSetters: Setter[];
};

type HauteurLayerProps = {
  viewRef: ViewRef;
  layerSetter: WaterLayerSetter<'hauteur'>;
};

const AleaLayerSetter = LayerSetter;
const VitesseLayerSetter = LayerSetter;

const HauteurLayerSetter = ({ viewRef, layerSetter }: HauteurLayerProps) => {
  const [ kind, setKind ] = useState<Dim>("2D");

  const switchDimension = (current: Dim) : Dim => {
    if (!layerSetter.layer3DName) throw new Error(); // by layer3DName exists

    const view = viewRef.current;

    const layer2D = view?.getLayerById(layerSetter.layerName);
    const layer3D = view?.getLayerById(layerSetter.layer3DName);

    if ("visible" in layer2D && "visible" in layer3D) {
      if (current == "2D") {
        layer2D.visible = false;
        layer3D.visible = true;
      } else {
        layer2D.visible = true;
        layer3D.visible = false;
      }
    }
    view?.notifyChange();

    if (current === "2D") { return "3D"; }
    else { return "2D"; }
  };

  const getWaterLayer = (dim: Dim) => {
    if (dim === "2D" || !layerSetter.layer3DName) {
      return layerSetter;
    }

    return {
      ...layerSetter,
      layerName: layerSetter.layer3DName,
    };
  };

  return (
    <>
    <LayerSetter
      viewRef={viewRef}
      layerSetter={getWaterLayer(kind)} />
    {layerSetter.layer3DName && (
      <RadioButtons
        options={[
          {
            label: "2D",
            nativeInputProps: {
              checked: kind == "2D",
              onChange: () => setKind(switchDimension),
            },
          },
          {
            label: "3D",
            nativeInputProps: {
              checked: kind == "3D",
              onChange: () => setKind(switchDimension),
            },
          },
        ]}
      />
    )}
    </>
  );

  return (
    <LayerSetter
      viewRef={viewRef}
      layerSetter={layerSetter} />
  );
};

export const WaterLayerSetters = ({ viewRef, layerSetters }: Props) => {
  const generateOpacitySlider = useConstCallback((layerSetter: Setter) => {
    if (layerSetter.kind === "alea") {
      return (
        <AleaLayerSetter
          viewRef={viewRef}
          layerSetter={layerSetter} />
      );
    } else if (layerSetter.kind === "hauteur") {
      return (
        <HauteurLayerSetter
          viewRef={viewRef}
          layerSetter={layerSetter} />
      );
    } else {
      return (
        <VitesseLayerSetter
          viewRef={viewRef}
          layerSetter={layerSetter} />
      );
    }
  });

  return <> {layerSetters.map((ls: Setter) => generateOpacitySlider(ls))}</>;
};

export const MemoizedWaterLayerSetters = memo(WaterLayerSetters);
