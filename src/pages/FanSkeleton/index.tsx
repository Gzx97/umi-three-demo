import React, { useEffect, useRef, useState } from "react";
import styles from "./index.less";
import Viewer from "@/modules/Viewer";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Button, Spin } from "antd";
import { forEach } from "lodash";
import BaseModel from "@/modules/BaseModel";
import { MODEL_SKELETON_ENUM } from "@/constants/ModelSkeleton";
import { MODEL_EQUIPMENT_POSITION_PARAMS_ENUM } from "@/constants/constants";

const PAGE_ID = "FAN_CONTAINER";
const MODEL_SCALES = [0.0001 * 3, 0.0001 * 3, 0.0001 * 3] as const;
const MODEL_URL = {
  SKELETON: `/models/turbine.glb`,
  EQUIPMENT: `/models/equipment.glb`,
} as const;

const FanSkeleton: React.FC = () => {
  const [modelLoading, setModelLoading] = useState<boolean>(false);
  const viewerRef = useRef<Viewer>();
  const modelSkeleton = useRef<THREE.Object3D>(); //风机壳子
  const modelEquipment = useRef<THREE.Object3D>(); //风机设备

  const turbineGroup = new THREE.Group();

  //加载gltf文件
  const loadGLTF = (url: string): Promise<GLTF> => {
    const loader = new GLTFLoader();
    const onCompleted = (object: GLTF, resolve: any) => resolve(object);
    return new Promise<GLTF>((resolve) => {
      loader.load(url, (object: GLTF) => onCompleted(object, resolve));
    });
  };
  const loadModels = async (tasks: Promise<any>[]) => {
    setModelLoading(true);
    await Promise.all(tasks);
    setModelLoading(false);
  };
  // 加载灯光
  const loadLights = () => {
    const LIGHT_LIST = [
      [100, 100, 100],
      [-100, 100, 100],
      [100, -100, 100],
      [100, 100, -100],
    ];
    forEach(LIGHT_LIST, ([x, y, z]) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
      directionalLight.position.set(x, y, z);
      viewerRef?.current?.scene?.add(directionalLight);
    });
  };
  // 初始化
  const init = () => {
    viewerRef.current = new Viewer(PAGE_ID);
    const viewer = viewerRef.current;
    viewer.addAxis();
    viewer.addStats();
    // 缩放限制
    // viewer.controls.maxDistance = 12;
    viewer.controls.target.set(0, 2, 0);
    viewer.camera.position.set(-5.42, 5, 9);
    // viewer.camera.position.set(2, 3.26, -0.24);
    // viewer.camera.lookAt(0, 2, 0);
    loadLights();
    // 垂直旋转限制
    // viewer.controls.minPolarAngle = Math.PI / 2;
    // viewer.controls.maxPolarAngle = Math.PI / 2;
    viewer?.scene.add(turbineGroup);
    loadModels([loadTurbineSkeleton(viewer), loadTurbineEquipments()]);
  };

  // 加载设备
  const loadTurbineEquipments = async () => {
    // modelLoader.loadModelToScene
    const { scene: object } = await loadGLTF(MODEL_URL.EQUIPMENT);
    object.scale.set(...MODEL_SCALES);
    // object.position.set(0, -2, 0);
    object.name = "equipment";
    modelEquipment.current = object;
    turbineGroup.add(object);
  };
  //加载骨架
  const loadTurbineSkeleton = async (viewer: Viewer) => {
    const gltfModel = await loadGLTF(MODEL_URL.SKELETON);
    const baseModel = new BaseModel(gltfModel, viewer);
    baseModel.setScalc(...MODEL_SCALES);
    const object = baseModel.gltf.scene;
    object.position.set(0, 0, 0);
    object.name = "equipment";
    modelSkeleton.current = object;
    turbineGroup.add(object);
    baseModel.startAnima(0, "风机");
  };
  // 风机骨架消隐动画
  const skeletonHideAnimation = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const shellModel = modelSkeleton.current?.getObjectByName(
      MODEL_SKELETON_ENUM.ColorMaterial
    ); //筛选出需要裁剪的部分
    const clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 3.5); //裁剪平面
    // const helper = new THREE.PlaneHelper(clippingPlane, 300, 0xffff00);//辅助查看裁剪平面
    // viewer.scene?.add(helper);
    shellModel?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined;
      mesh.material = new THREE.MeshPhysicalMaterial({
        ...mesh.material,
        clipIntersection: true, //改变剪裁方式，剪裁所有平面要剪裁部分的交集
        clipShadows: true,
        clippingPlanes: [clippingPlane],
      });
      // 白色外壳消隐效果
      mesh.material.clippingPlanes = [clippingPlane];
      return undefined;
    });
    const fnOnj = {
      fun: () => {
        if (clippingPlane.constant <= -0.1) {
          modelSkeleton.current?.remove(shellModel!);
          viewer?.removeAnimate("clipping");
          console.log(viewer?.scene);
        }
        clippingPlane.constant -= 0.05;
      },
      content: viewer,
    };
    viewer?.addAnimate("clipping", fnOnj);
    // viewer.controls.target.set(0, 2.5, 0);
    // viewer.camera.position.set(2, 3.26, -0.24);
  };

  // 设备分解动画
  const equipmentDecomposeAnimation = async () => {
    // await sleep(1 * 1000);
    modelEquipment.current?.updateMatrixWorld();
    modelEquipment.current?.children.forEach((child: THREE.Object3D) => {
      const params = MODEL_EQUIPMENT_POSITION_PARAMS_ENUM[child.name];
      viewerRef?.current?.animation({
        from: child.position,
        to: params.DECOMPOSE,
        duration: 2 * 1000,
        onUpdate: (position: any) => {
          child.position.set(position.x, position.y, position.z);
        },
      });
    });
  };
  useEffect(() => {
    init();
    return () => {
      viewerRef.current?.destroy();
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <div style={{ width: 1000, height: 1000, border: "1px solid red" }}>
        <Spin spinning={modelLoading}>
          <div
            id={PAGE_ID}
            style={{ width: 1000, height: 1000, border: "1px solid red" }}
          ></div>
        </Spin>
      </div>

      <Button
        onClick={() => {
          skeletonHideAnimation();
        }}
      >
        隐藏外壳
      </Button>
      <Button
        onClick={() => {
          equipmentDecomposeAnimation();
        }}
      >
        分解设备
      </Button>
    </div>
  );
};
export default FanSkeleton;
