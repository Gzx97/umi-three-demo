import React, { useEffect } from "react";
import styles from "./index.less";
import useThree from "@/hooks/useThree";
import { forEach } from "lodash";
import * as THREE from "three";
const PAGE_ID = "HOOKS_DEMO_CONTAINER";

const MODEL_SCALES = [0.1 * 5, 0.1 * 5, 0.1 * 5] as const;

const ThreeUseHookDemo: React.FC = () => {
  const {
    container,
    scene,
    camera,
    control,
    renderMixins,
    loadGLTF,
    loadModels,
    render,
  } = useThree();
  const modelGroup = new THREE.Group();
  /**坐标轴辅助 */
  const addAxis = () => {
    const axis = new THREE.AxesHelper(1000);
    scene.current?.add(axis);
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
      scene.current?.add(directionalLight);
    });
  };
  const loadCarModel = async () => {
    const { scene: object, animations } = await loadGLTF("/models/SU7.glb");
    object.scale.set(...MODEL_SCALES);
    object.position.set(0, 0, 0);
    object.name = "SU7";
    modelGroup.add(object);
  };
  useEffect(() => {
    addAxis();
    loadLights();
    const loadModel = async () => {
      await loadCarModel();
      scene.current?.add(modelGroup);
      camera.current?.position.set(-7.12, 2.93, 0.14);
      control.current?.target.set(0, 0.63, 0);
      control.current?.update();
      render();
    };
    loadModel();
  }, []);
  // useEffect(() => {
  //   control.current?.addEventListener("change", () => {
  //     console.log(control.current?.target);
  //   });
  // }, []);

  return (
    <div className={styles.wrapper}>
      <div
        id={PAGE_ID}
        ref={container}
        style={{ width: 1000, height: 1000, border: "1px solid red" }}
      ></div>
      测试
    </div>
  );
};

export default ThreeUseHookDemo;
