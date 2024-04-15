import React, { useEffect, useRef } from "react";
import styles from "./index.less";
import Viewer from "@/modules/Viewer";
import ModelLoader from "@/modules/ModelLoder";

import * as THREE from "three";
import { HouseContextProvider } from "./components/HouseProvider";
const PAGE_ID = "HOUSE_CONTAINER";

const House: React.FC = () => {
  const viewerRef = useRef<Viewer>();
  // 加载
  const init = () => {
    viewerRef.current = new Viewer(PAGE_ID);
    const viewer = viewerRef.current;
    viewer.addAxis();
    viewer.addStats();
    viewer.initRaycaster();
    // 缩放限制
    viewer.controls.maxDistance = 12;
    // 垂直旋转限制
    // viewer.controls.minPolarAngle = Math.PI / 2;
    // viewer.controls.maxPolarAngle = Math.PI / 2;
  };
  const LoadHouse = () => {
    const viewer = viewerRef.current!;
    const modelLoader = new ModelLoader(viewer);
    modelLoader.loadModelToScene("", (baseModel) => {});
    // modelLoader.loadModelToScene("/models/datacenter.glb", (baseModel) => {
    //   console.log(baseModel);
    //   // 设置基础模型的缩放比例
    //   baseModel.setScalc(0.15);
    //   // 暂时注释掉旋转代码
    //   // baseModel.object.rotation.y = Math.PI / 2;
    //   // 获取实际的模型对象
    //   const model = baseModel.gltf.scene;
    //   model.position.set(0, 0, 0.3);
    //   // 为模型设置名称
    //   model.name = "机房";
    //   model.uuid = "机房";
    //   console.log(model);
    //   // 启用基础模型的投射阴影功能
    //   baseModel.openCastShadow();
    // });
  };
  useEffect(() => {
    init();
    return () => {
      const viewer = viewerRef.current;
      viewer?.destroy();
    };
  }, []);
  return (
    <HouseContextProvider value={{}}>
      <div className={styles.wrapper}>
        <div
          id={PAGE_ID}
          // style={{ width: 1500, height: 1000, border: "1px solid red" }}
        ></div>
      </div>
    </HouseContextProvider>
  );
};
export default House;
