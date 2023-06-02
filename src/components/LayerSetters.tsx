import { MutableRefObject, memo } from "react";
import { useConstCallback } from "powerhooks";
import { Layer, GlobeView } from "itowns";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import { MemoizedOpacitySlider as OpacitySlider } from "geocommuns-core";
import { LayerSetter } from "../utils/waterLayers";

const useStyles = makeStyles()(() => ({
  opacitySlider: {
    marginTop: fr.spacing("2w"),
    marginBottom: fr.spacing("2w"),
  },
}));

type Props = {
  viewRef: MutableRefObject<GlobeView | null>;
  layerSetters: LayerSetter[];
};

export const LayerSetters = ({ viewRef, layerSetters }: Props) => {
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

  const generateOpacitySlider = useConstCallback((layerSetter: LayerSetter) => {
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
  });

  return <> {layerSetters.map((ls: LayerSetter) => generateOpacitySlider(ls))}</>;
};

export const MemoizedLayerSetters = memo(LayerSetters);
