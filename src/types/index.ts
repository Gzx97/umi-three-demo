import type { Object3D, Material } from "three";

export interface Object3DExtends extends Object3D {
  isGroup?: boolean;
  isMesh?: boolean;
  material?: Material;
  name: string;
}
