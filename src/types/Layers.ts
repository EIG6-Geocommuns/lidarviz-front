// Layers types
export type LayerSetter = {
    layerName: string;
    label: string;
    defaultVisibility: boolean;
};

// Water layers types
export type WaterLayerKind = 'alea' | 'hauteur' | 'vitesse';

type WaterLayerBaseSetter<T extends WaterLayerKind> = {
  kind: T;
  label: string;
  defaultVisibility: boolean;
};

export type AleaLayerSetter = WaterLayerBaseSetter<'alea'> & {
  layerName: string;
};

export type HauteurLayerSetter = WaterLayerBaseSetter<'hauteur'> & {
  layerName: string; // TODO: For compatibility with current code, change on future commits
};

export type VitesseLayerSetter = WaterLayerBaseSetter<'vitesse'> & {
  layerName: string;
};

export type WaterLayerSetter<T extends WaterLayerKind> =
  T extends 'alea' ? AleaLayerSetter :
  T extends 'hauteur' ? HauteurLayerSetter :
  T extends 'vitesse' ? VitesseLayerSetter :
  never;
