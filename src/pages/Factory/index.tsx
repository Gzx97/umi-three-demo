import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Viewer, { Animate } from "@/modules/Viewer";
import ModelLoader from "@/modules/ModelLoder";
import BoxHelperWrap from "@/modules/BoxHelperWrap";
import styles from "./index.less";
import Floors from "@/modules/Floors";
import { checkNameIncludes, findParent } from "@/utils";
import Event from "@/modules/Viewer/Events";
interface Object3DWithOldMaterial extends THREE.Object3D {
  oldMaterial?: THREE.Material;
}
const PAGE_ID = "FACTORY_CONTAINER";

const ThreeDemo: React.FC = () => {
  const rackListRef = useRef([] as THREE.Object3D[]);
  let viewer: Viewer;
  let modelLoader: ModelLoader;
  let boxHelperWrap: BoxHelperWrap;

  // 加载
  const init = () => {
    viewer = new Viewer(PAGE_ID);
    viewer.addAxis();
    viewer.addStats();
    viewer.initRaycaster();

    modelLoader = new ModelLoader(viewer);
    const floors = new Floors(viewer);
    floors.addGird(8, 25, 0x004444, 0x004444);
    boxHelperWrap = new BoxHelperWrap(viewer);

    viewer.emitter.on(
      Event.mousemove.raycaster,
      (list: THREE.Intersection[]) => {
        onMouseMove(list);
        console.log(list);
      }
    );
    viewer.emitter.on(Event.click.raycaster, (list: THREE.Intersection[]) => {
      onMouseClick(list);
      console.log(list);
    });
  };
  const checkIsRack = (obj: any): boolean => {
    return checkNameIncludes(obj, "rack");
  };
  const onMouseClick = (intersects: THREE.Intersection[]) => {
    if (!intersects.length) return;
    const selectedObject = intersects?.[0].object || {};
    selectedObject.visible = !selectedObject.visible;
  };
  const onMouseMove = (intersects: THREE.Intersection[]) => {
    if (!intersects.length) {
      // popoverRef.value.setShow(false)
      boxHelperWrap.setVisible(false);
      return;
    }
    const selectedObject = intersects[0].object || {};
    // selectedObject.visible = false;
    console.log(selectedObject);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let selectedObjectName = "";
    const findClickModel = (object: any) => {
      if (object.type === "Group") {
        console.log("object.type === 'Group'", object);
        selectedObjectName = object.name;
        return;
      }
      if (object.parent && object.type !== "Scene") {
        findClickModel(object.parent);
      }
    };
    findClickModel(selectedObject);
    console.log(selectedObjectName);
    const rack = findParent(selectedObject, checkIsRack);
    if (rack) {
      boxHelperWrap.attach(rack);
      updateRackInfo(rack.name);
    }
  };
  const updateRackInfo = (name: string) => {};
  // 加载模型
  const initModel = () => {
    // 工厂 garage_factory
    modelLoader.loadModelToScene("/models/datacenter.glb", (baseModel) => {
      // /models/datacenter.glb
      // /models/GuiGu-factory.glb
      console.log(baseModel);
      // 设置基础模型的缩放比例
      baseModel.setScalc(0.1);
      // 暂时注释掉旋转代码
      // baseModel.object.rotation.y = Math.PI / 2;
      // 获取实际的模型对象
      const model = baseModel.gltf.scene;
      model.position.set(0, 0, 0);
      // 为模型设置名称
      model.name = "机房1";
      model.uuid = "机房1";
      console.log(model);

      // 启用基础模型的投射阴影功能
      baseModel.openCastShadow();
      let rackList: THREE.Object3D[] = [];
      model.traverse((item) => {
        // console.log(item);
        if (checkIsRack(item)) {
          rackList.push(item);
        }
        if (item instanceof THREE.Mesh) {
          // 保存原始颜色数据，以及警告颜色
          if (item.isMesh) {
            item.material.warningColor = {
              r: 1,
              g: 0,
              b: 0,
              isColor: true,
            };
            // 保存旧的材质
            (item as Object3DWithOldMaterial).oldMaterial = item.material;
          }
        }
      });
      rackListRef.current = rackList;
      console.log("rackList------", rackList);
      // 将 rackList 中的机架设置为 viewer 的射线检测对象
      viewer.setRaycasterObjects(rackList);
    });
  };
  useEffect(() => {
    init();
    initModel();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div
        id={PAGE_ID}
        style={{ width: 1000, height: 1000, border: "1px solid red" }}
      ></div>
    </div>
  );
};

export default ThreeDemo;
