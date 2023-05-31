import { useEffect, useRef, MutableRefObject, useCallback } from "react";
import { makeStyles } from "tss-react/dsfr";
import {
  CAMERA_TYPE,
  Coordinates,
  Extent,
  GlobeView,
  Layer,
  ColorLayer,
  ElevationLayer,
  FeatureGeometryLayer,
} from "itowns";
import { demoLidarOptions } from "../utils/controls";

export type Placement = {
  coord: Coordinates;
  tilt: number;
  heading: number;
  range: number;
};

type Camera = "perspective" | "orthographic" | THREE.Camera;
type ItownsLayer = ColorLayer | ElevationLayer | FeatureGeometryLayer | Layer;

type Props = {
  id: string;
  viewRef: MutableRefObject<GlobeView | null>;
  placement: Placement | Extent;
  layers?: ItownsLayer[];
  // TODO: controls at init
  camera?: Camera;
  renderer?: {
    antialias?: boolean;
    alpha?: boolean;
    logarithmicDepthBuffer?: boolean;
    isWebGL2?: boolean;
  };
  enableFocusOnStart?: boolean;
};

const useStyles = makeStyles()(() => ({
  view: {
    height: "100%",
  },
}));

const getCameraOption = (camera?: Camera) => {
  if (camera === "perspective") return { type: CAMERA_TYPE.PERSPECTIVE };
  if (camera === "orthographic") return { type: CAMERA_TYPE.ORTHOGRAPHIC };
  return { cameraThree: camera };
};

export const View = (props: Props) => {
  const { viewRef, camera, renderer, enableFocusOnStart, placement, layers } = props;
  const { classes } = useStyles();
  const domEltRef = useRef<HTMLDivElement>(null);

  // View lifecycle effect
  useEffect(() => {
    const domElt = domEltRef.current;
    if (!domElt || viewRef.current) return;

    const options = {
      camera: getCameraOption(camera),
      renderer,
      enableFocusOnStart,
    };
    viewRef.current = new GlobeView(domElt, placement, options);
    viewRef.current?.controls?.states?.setFromOptions(demoLidarOptions);

    // Dispose our current view and DOM elements created by itowns
    return () => {
      viewRef.current?.dispose();
      viewRef.current = null;
      domEltRef.current?.replaceChildren();
    };
  }, []);

  const updateLayers = useCallback((view: GlobeView, layers?: ItownsLayer[]) => {
    const newLayers = new Set(layers);
    const oldLayers = new Set(
      view.getLayers((currentLayer, currentLayerGeometry) => {
        // Don't remove root layers (GlobeLayer, PointCloudLayer, ...)
        if (currentLayerGeometry === undefined) return false;
        // Don't remove layers initialized by GlobeLayer
        if (currentLayer.id === "atmosphere") return false;
        return true;
      })
    );

    // Remove old layers from the view
    oldLayers.forEach((layer) => {
      if (!newLayers.has(layer)) {
        view.removeLayer(layer.id);
      }
    });

    // Add new layers to the view
    newLayers.forEach((layer) => {
      if (!oldLayers.has(layer)) {
        view.addLayer(layer);
      }
    });
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    updateLayers(view, layers);

    // TODO: Move imagery layers position (à la geoportail)
  }, [layers]);

  return <div ref={domEltRef} className={classes.view} />;
};
