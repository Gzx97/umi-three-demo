import { BoxHelper, Color, Object3D } from "three";
import type Viewer from "../Viewer";
// 通过 BoxHelper 可以实现简单的鼠标选中的特效。
// 也可以通过 OutlinePass 实现发光的特效。
export default class BoxHelperWrap {
  protected viewer: Viewer;
  public boxHelper: BoxHelper;

  constructor(viewer: Viewer, color?: number) {
    this.viewer = viewer;
    const boxColor = color === undefined ? 0x00ffff : color;
    this.boxHelper = new BoxHelper(new Object3D(), new Color(boxColor));
    // this.boxHelper.material.depthTest = false;

    this.initBoxHelperWrap();
  }

  private initBoxHelperWrap() {
    this.viewer.scene.add(this.boxHelper);
  }

  public setVisible(visible: boolean): void {
    this.boxHelper.visible = visible;
  }

  public attach(obj: Object3D): void {
    this.boxHelper.setFromObject(obj);
    this.setVisible(true);
  }

  public dispose(): void {
    const parent = this.boxHelper.parent;
    if (parent !== null) {
      parent.remove(this.boxHelper);
    }

    Object.keys(this).forEach((key) => {
      (this as any)[key] = null;
    });
  }
}
