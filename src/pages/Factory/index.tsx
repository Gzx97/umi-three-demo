import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Viewer, { Animate } from "@/modules/Viewer";
import ModelLoader from "@/modules/ModelLoder";
import BoxHelperWrap from "@/modules/BoxHelperWrap";
import styles from "./index.less";
import Floors from "@/modules/Floors";
import { checkNameIncludes, findParent } from "@/utils";
import Event from "@/modules/Viewer/Events";
import { Object3DExtends } from "@/types";
import Popover from "./components/Popover";

const PAGE_ID = "FACTORY_CONTAINER";

const ThreeDemo: React.FC = () => {
  const [rackList, setRackList] = useState<THREE.Object3D[]>([]);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [popoverData, setPopoverData] = useState({});
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
      }
    );
    viewer.emitter.on(Event.click.raycaster, (list: THREE.Intersection[]) => {
      onMouseClick(list);
    });
  };
  const checkIsRack = (obj: THREE.Object3D): boolean => {
    return checkNameIncludes(obj, "rack");
  };
  const onMouseClick = (intersects: THREE.Intersection[]) => {
    if (!intersects.length) return;
    const selectedObject = intersects?.[0].object || {};
    selectedObject.visible = !selectedObject.visible;
  };
  const onMouseMove = (intersects: THREE.Intersection[]) => {
    if (!intersects.length) {
      boxHelperWrap.setVisible(false);
      setShowPopover(false);
      return;
    }
    const selectedObject = intersects[0].object || {};
    let selectedObjectName = "";
    const findClickModel = (object: THREE.Object3D) => {
      if (object.type === "Group") {
        selectedObjectName = object.name;
        return;
      }
      if (object.parent && object.type !== "Scene") {
        findClickModel(object.parent);
      }
    };
    findClickModel(selectedObject);
    const rack = findParent(selectedObject, checkIsRack);
    if (rack) {
      // console.log(rack);
      boxHelperWrap.attach(rack);
      updateRackInfo(rack.name);
    }
  };
  const updateRackInfo = (name: string) => {
    if (!name) {
      setShowPopover(false);
      return;
    }
    const event = viewer.mouseEvent as MouseEvent;
    setPopoverPosition({
      top: event.y + 10,
      left: event.x + 10,
    });
    setPopoverData({ title: name });
    setShowPopover(true);
  };

  // 修改颜色
  const changeWarningColor = (model: THREE.Object3D) => {
    model.traverseVisible((item: Object3DExtends) => {
      if (item.isMesh) {
        item.material = new THREE.MeshStandardMaterial({
          metalness: 1.0,
          roughness: 0.5,
        });
        item.material.color = item?.oldMaterial?.warningColor;
      }
    });
  };
  // 通过name修改成警告颜色
  const changeWarningColorByName = (name: string) => {
    console.log(rackList);
    const model = rackList.find((item) => item.name === name);
    if (model) {
      changeWarningColor(model);
    }
  };
  // 加载模型
  const initModel = () => {
    modelLoader.loadModelToScene("/models/datacenter.glb", (baseModel) => {
      // /models/datacenter.glb
      // /models/GuiGu-factory.glb
      console.log(baseModel);
      // 设置基础模型的缩放比例
      baseModel.setScalc(0.15);
      // 暂时注释掉旋转代码
      // baseModel.object.rotation.y = Math.PI / 2;
      // 获取实际的模型对象
      const model = baseModel.gltf.scene;
      model.position.set(0, 0, 0.3);
      // 为模型设置名称
      model.name = "机房1";
      model.uuid = "机房1";
      console.log(model);

      // 启用基础模型的投射阴影功能
      baseModel.openCastShadow();
      let rackList: Object3DExtends[] = [];
      model.traverse((item) => {
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
            (item as Object3DExtends).oldMaterial = item.material;
          }
        }
      });
      setRackList(rackList);
      // console.log("rackList------", rackList);
      // 将 rackList 中的机架设置为 viewer 的射线检测对象
      viewer.setRaycasterObjects(rackList);
    });
  };
  useEffect(() => {
    init();
    initModel();
    return () => {
      viewer.destroy();
    };
  }, []);
  // 模拟报警测试
  useEffect(() => {
    setTimeout(() => {
      changeWarningColorByName("rackA_1");
    }, 2000);
  }, [rackList]);
  return (
    <div className={styles.wrapper}>
      <div
        id={PAGE_ID}
        style={{ width: 1000, height: 1000, border: "1px solid red" }}
      ></div>
      <Popover show={showPopover} {...popoverPosition} data={popoverData} />
    </div>
  );
};

export default ThreeDemo;
