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
import React, { HTMLAttributes, useEffect, useRef } from 'react';

type Placement = {
  coord: Coordinates,
  tilt: number,
  heading: number,
  range: number
}

export type ViewProps = {
  placement: Placement | Extent,
  layers?: (ColorLayer | ElevationLayer | FeatureGeometryLayer | Layer)[],
  // TODO: controls at init
  camera?: "perspective" | "orthographic" | THREE.Camera,
  renderer?: {
    antialias?: boolean,
    alpha?: boolean,
    logarithmicDepthBuffer?: boolean,
    isWebGL2?: boolean
  },
  enableFocusOnStart?: boolean
} & HTMLAttributes<HTMLDivElement>

const style: React.CSSProperties = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
}

export const View = (props: ViewProps) => {
  const domEltRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<GlobeView | null>(null);

  // View lifecycle effect
  useEffect(() => {
    const domElt = domEltRef.current;
    if (!domElt || viewRef.current) return;

    const options = {
      camera:
        props.camera === "perspective" ? { type: CAMERA_TYPE.PERSPECTIVE } :
        props.camera === "orthographic" ? { type: CAMERA_TYPE.ORTHOGRAPHIC } :
        { cameraThree: props.camera },
      renderer: props.renderer,
      enableFocusOnStart: props.enableFocusOnStart,
    };
    viewRef.current = new GlobeView(domElt, props.placement, options);

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

    const newLayers = new Set(props.layers);
    const oldLayers = new Set(view.getLayers((l, a) => {
      // Don't remove root layers (GlobeLayer, PointCloudLayer, ...)
      if (a === undefined) return false;
      // Don't remove layers initialized by GlobeLayer
      if (l.id === "atmosphere") return false;
      return true;
    }));

    // Remove old layers from the view
    oldLayers.forEach(l => {
        if (!newLayers.has(l)) {
          view.removeLayer(l.id);
        }
    });

    // Add new layers to the view
    newLayers.forEach(l => {
        if (!oldLayers.has(l)) {
          view.addLayer(l);
        }
    });

    // TODO: Move imagery layers position (à la geoportail)
  }, [props.layers]);

  return (
    <div ref={domEltRef} style={style} />
  )
}
