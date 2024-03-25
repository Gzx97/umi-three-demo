import type { Object3D, Material, Color } from "three";
export interface MaterialExtends extends Material {
  color?: Color;
  warningColor?: Color;
}

export interface Object3DExtends extends Object3D {
  isGroup?: boolean;
  isMesh?: boolean;
  material?: MaterialExtends;
  oldMaterial?: MaterialExtends;
  addData?: Record<string, any>;
  dom?: HTMLElement;
}
