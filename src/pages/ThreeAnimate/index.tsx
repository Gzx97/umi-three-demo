import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//引入lil-gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import Viewer, { Animate } from "@/modules/Viewer";
import ModelLoader from "@/modules/ModelLoder";
import BoxHelperWrap from "@/modules/BoxHelperWrap";
import styles from "./index.less";
const PAGE_ID = "BELT_CONTAINER";
const ThreeAnimate: React.FC = () => {
  let viewer: Viewer;
  let modelLoader: ModelLoader;
  let boxHelperWrap: BoxHelperWrap;

  // 加载
  const init = () => {
    viewer = new Viewer(PAGE_ID);
    // viewer.addAxis();
    viewer.addStats();
    viewer.initRaycaster();

    modelLoader = new ModelLoader(viewer);
    // const floors = new Floors(viewer);
    // floors.addGird();
    boxHelperWrap = new BoxHelperWrap(viewer);

    // viewer.emitter.on(Event.mousemove.raycaster, (list: THREE.Intersection[]) => {
    //   onMouseMove(list)
    // })
  };
  // 加载模型
  const initModel = () => {
    // 底部线条
    modelLoader.loadModelToScene("/models/plane.glb", (baseModel) => {
      const model = baseModel.gltf.scene;
      model.scale.set(0.0001 * 3, 0.0001 * 3, 0.0001 * 3);
      model.position.set(0, 0, 0);
      model.name = "plane";
      baseModel.openCastShadow();
      const textureMesh = baseModel.object.children[0] as THREE.Mesh;
      const material = textureMesh.material as THREE.MeshStandardMaterial;
      const texture = material.map;
      const fnOnj = planeAnimate(texture!);
      viewer.addAnimate(fnOnj);
    });

    // 工厂 garage_factory
    modelLoader.loadModelToScene("/models/belt-animate.glb", (baseModel) => {
      console.log(baseModel);
      // 设置基础模型的缩放比例
      baseModel.setScalc(0.001);
      // 暂时注释掉旋转代码
      // baseModel.object.rotation.y = Math.PI / 2
      // 获取实际的模型对象
      const model = baseModel.gltf.scene;
      model.position.set(0.6, 0, 0);
      // 为模型设置名称
      // model.name = 'GuiGu-厂房1'
      // model.uuid = 'GuiGu-厂房1'
      // 启用基础模型的投射阴影功能
      baseModel.openCastShadow();
      baseModel.startAnima(0);
    });
  };

  const planeAnimate = (texture: THREE.Texture): Animate => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return {
      fun: () => {
        const count = texture.repeat.y;
        if (count <= 10) {
          texture.repeat.x += 0.01;
          texture.repeat.y += 0.02;
        } else {
          texture.repeat.x = 0;
          texture.repeat.y = 0;
        }
      },
      content: viewer,
    };
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

export default ThreeAnimate;
