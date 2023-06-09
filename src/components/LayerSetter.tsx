import { useConstCallback } from "powerhooks";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import { MemoizedOpacitySlider as OpacitySlider } from "geocommuns-core";

import type { MutableRefObject } from "react";
import type { Layer, GlobeView } from "itowns";
import type { LayerSetter as Setter } from "../types/Layers";

type ViewRef = MutableRefObject<GlobeView | null>;
type Props = {
  viewRef: ViewRef;
  layerSetter: Setter;
};

const useStyles = makeStyles()(() => ({
  opacitySlider: {
    marginTop: fr.spacing("2w"),
    marginBottom: fr.spacing("2w"),
  },
}));

export const LayerSetter = ({ viewRef, layerSetter }: Props) => {
  const { classes } = useStyles();

  const updateLayerVisibility = useConstCallback((layerId: string, isLayerVisible: boolean) => {
    const view = viewRef.current;
    if (view === null) return;

    const layer: Layer = view.getLayerById(layerId);
    if (!("visible" in layer)) return;

    layer.visible = isLayerVisible;
    view.notifyChange();
  });

  const updateLayerOpacity = useConstCallback((layerId: string, opacity: number) => {
    const view = viewRef.current;
    if (view === null) return;

    const layer = view.getLayerById(layerId);
    if (!("opacity" in layer)) return;

    layer.opacity = opacity;
    view.notifyChange();
  });

  return (
    <OpacitySlider
      key={layerSetter.label}
      label={layerSetter.label}
      className={classes.opacitySlider}
      setLayerOpacity={(opacity: number) => updateLayerOpacity(layerSetter.layerName, opacity)}
      setLayerVisibility={(visible: boolean) =>
        updateLayerVisibility(layerSetter.layerName, visible)
      }
      defaultVisibility={layerSetter.defaultVisibility}
    />
  );
};
