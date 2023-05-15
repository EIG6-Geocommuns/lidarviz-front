import { useEffect, useRef, MutableRefObject } from "react";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
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

type Props = {
  id: string;
  viewRef: MutableRefObject<GlobeView | null>;
  placement: Placement | Extent;
  layers?: (ColorLayer | ElevationLayer | FeatureGeometryLayer | Layer)[];
  // TODO: controls at init
  camera?: "perspective" | "orthographic" | THREE.Camera;
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

export const View = (props: Props) => {
  const { viewRef, camera, renderer, enableFocusOnStart, placement, layers } = props;
  const { classes } = useStyles();
  const domEltRef = useRef<HTMLDivElement>(null);

  // View lifecycle effect
  useEffect(() => {
    const domElt = domEltRef.current;
    if (!domElt || viewRef.current) return;

    const options = {
      camera:
        camera === "perspective"
          ? { type: CAMERA_TYPE.PERSPECTIVE }
          : camera === "orthographic"
          ? { type: CAMERA_TYPE.ORTHOGRAPHIC }
          : { cameraThree: camera },
      renderer: renderer,
      enableFocusOnStart: enableFocusOnStart,
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

  // Layers add/remove effect
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const newLayers = new Set(layers);
    const oldLayers = new Set(
      view.getLayers((l, a) => {
        // Don't remove root layers (GlobeLayer, PointCloudLayer, ...)
        if (a === undefined) return false;
        // Don't remove layers initialized by GlobeLayer
        if (l.id === "atmosphere") return false;
        return true;
      })
    );

    // Remove old layers from the view
    oldLayers.forEach((l) => {
      if (!newLayers.has(l)) {
        view.removeLayer(l.id);
      }
    });

    // Add new layers to the view
    newLayers.forEach((l) => {
      if (!oldLayers.has(l)) {
        view.addLayer(l);
      }
    });

    // TODO: Move imagery layers position (à la geoportail)
  }, [layers]);

  return <div ref={domEltRef} className={classes.view} />;
};
