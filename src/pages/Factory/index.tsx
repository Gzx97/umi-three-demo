import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Viewer, { Animate } from "@/components/Viewer";
import ModelLoader from "@/components/ModelLoder";
import BoxHelperWrap from "@/components/BoxHelperWrap";
import styles from "./index.less";
import Floors from "@/components/Floors";
const ThreeDemo: React.FC = () => {
  let viewer: Viewer;
  let modelLoader: ModelLoader;
  let boxHelperWrap: BoxHelperWrap;
  const canvasRef = useRef<HTMLDivElement>(null);

  // 加载
  const init = () => {
    viewer = new Viewer("containerRef");
    viewer.addAxis();
    // viewer.addStats();
    viewer.initRaycaster();

    modelLoader = new ModelLoader(viewer);
    const floors = new Floors(viewer);
    floors.addGird(8, 25, 0x004444, 0x004444);
    boxHelperWrap = new BoxHelperWrap(viewer);

    // viewer.emitter.on(Event.mousemove.raycaster, (list: THREE.Intersection[]) => {
    //   onMouseMove(list)
    // })
  };
  // 加载模型
  const initModel = () => {
    // 工厂 garage_factory
    modelLoader.loadModelToScene("/models/GuiGu-factory.glb", (baseModel) => {
      console.log(baseModel);
      // 设置基础模型的缩放比例
      baseModel.setScalc(0.0015);
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

  useEffect(() => {
    init();
    initModel();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div
        ref={canvasRef}
        id="containerRef"
        style={{ width: 1000, height: 1000, border: "1px solid red" }}
      ></div>
    </div>
  );
};

export default ThreeDemo;
