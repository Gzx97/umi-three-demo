import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
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
import { Tween } from "three/examples/jsm/libs/tween.module.js";
import { useRequest } from "ahooks";
import axios from "axios";
import { Button } from "antd";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
const PAGE_ID = "FACTORY_CONTAINER";
import _ from "lodash";
const ThreeDemo: React.FC = () => {
  const [rackList, setRackList] = useState<Object3DExtends[]>([]); //架子
  const [chairList, setChairList] = useState<Object3DExtends[]>([]); //椅子
  const [rackInfoList, setRackInfoList] = useState<Record<string, any>[]>([]); //报警设备
  // let chairList = [] as THREE.Object3D[];
  const viewerRef = useRef<Viewer>();
  /** 标签ref */
  const tagRefs = useRef<Object3DExtends[]>([]);
  let modelLoader: ModelLoader;
  let boxHelperWrap: BoxHelperWrap;

  /** 获取mock数据 */
  const { data: deviceDatas, run: queryDeviceDatas } = useRequest(
    () => {
      return axios.get("/api/getDeviceDatas").then((res) => res.data?.data);
    },
    {
      manual: true,
    }
  );

  // 加载
  const init = () => {
    viewerRef.current = new Viewer(PAGE_ID);
    const viewer = viewerRef.current;
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
  };

  const checkIsRack = (obj: THREE.Object3D): boolean => {
    return checkNameIncludes(obj, "rack");
  };

  const checkIsChair = (obj: THREE.Object3D): boolean => {
    return checkNameIncludes(obj, "chair");
  };

  const onMouseClick = (intersects: THREE.Intersection[]) => {
    const viewer = viewerRef.current;
    if (!intersects.length) return;
    const selectedObject = intersects?.[0].object || {};
    const isChair = checkIsChair(selectedObject);
    const rack = findParent(selectedObject, checkIsRack);
    if (rack) {
      updateRackInfo(rack.name);
    }

    if (isChair) {
      console.log(selectedObject);
      const worldPosition = new THREE.Vector3();
      console.log(selectedObject.getWorldPosition(worldPosition));
      return;
      // new Tween(selectedObject.position)
      //   .to(new THREE.Vector3(1, 1, 1), 1000)
      //   .start()
      //   .onUpdate(() => {
      //     // console.log("999");
      //     // selectedObject.position.set(1, 1, 1);
      //   });
      // selectedObject.position.set(1, 1, 1);
      // return;
      viewer?.initTween();
      viewer?.addTween(new THREE.Vector3(0.05, 0.66, -2.54));
    } else {
      viewer?.initTween();
      viewer?.addTween(new THREE.Vector3(4, 2, -3));
    }
  };

  const onMouseMove = (intersects: THREE.Intersection[]) => {
    if (!intersects.length) {
      boxHelperWrap?.setVisible(false);
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
    const chair = findParent(selectedObject, checkIsChair);

    if (rack) {
      boxHelperWrap.attach(rack);
    }
    if (chair) {
      boxHelperWrap.attach(chair);
      changeWarningColor(chair);
    }
  };

  const updateRackInfo = (name: string) => {
    const viewer = viewerRef.current;
    if (!name) {
      return;
    }
    const event = viewer?.mouseEvent as MouseEvent;
    console.log(name);
    console.log(rackInfoList);
    const newData = rackInfoList?.map((item) => {
      if (item.name === name) {
        console.log(item);
        if (item.addData) {
          item.addData.visible = !item.addData?.visible;
        }
      }
      return { ...item };
    });

    setRackInfoList(newData);
  };

  /** 创建CSS2DObject标签 */
  const createTags = (dom: HTMLElement, info: any) => {
    const viewer = viewerRef.current;
    const show = info?.visible;
    if (!show) return;
    viewer?.addCss2Renderer();
    const TAG = new CSS2DObject(dom);
    const targetPosition = info?.position;
    TAG.position.set(
      targetPosition?.x,
      targetPosition?.y + 0.5,
      targetPosition?.z
    );
    viewer?.scene.add(TAG);
  };

  /** 整合接口和模型自带的对应的数据 */
  useEffect(() => {
    const myRackInfoList = rackList?.map((rack) => {
      // 获取模型在世界坐标系中的位置
      const worldPosition = new THREE.Vector3();
      const found = deviceDatas?.find(
        (item: Object3DExtends) => item.name === rack.name
      );
      if (found) {
        return {
          ...rack,
          addData: {
            ...found,
            position: rack.getWorldPosition(worldPosition), //获取世界坐标
            visible: false,
          },
        };
      }
      return { ...rack };
    }) as Object3DExtends[];
    setRackInfoList(myRackInfoList);
  }, [rackList, deviceDatas]);

  /** 需要监听rackInfoList更新监听点击事件的函数 */
  useEffect(() => {
    if (!viewerRef.current) return;
    const viewer = viewerRef.current;
    viewer.emitter.off(Event.click.raycaster);

    viewer?.emitter.on(Event.click.raycaster, (list: THREE.Intersection[]) => {
      onMouseClick(list);
    });
  }, [rackInfoList, viewerRef, rackList]);
  /** 监听rackInfoList更新标签 */
  useEffect(() => {
    console.log("监听rackInfoList更新标签", rackInfoList);
    tagRefs?.current?.map((item, index) => {
      createTags(item?.dom as HTMLElement, item.addData);
    });
  }, [rackInfoList]);

  // 修改颜色
  const changeWarningColor = (model: Object3DExtends) => {
    if (!model) return;
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
  // 还原成原始颜色
  const changeOriginColor = (model: Object3DExtends) => {
    if (!model) return;
    model.traverse((item: any) => {
      // 修改颜色
      if (item.isMesh) {
        item.material = item.oldMaterial;
      }
    });
  };

  // 通过name修改成警告颜色
  const changeWarningColorByName = (name: string) => {
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
      let allList: Object3DExtends[] = [];
      let chairList: Object3DExtends[] = [];
      model.traverse((item) => {
        if (checkIsRack(item)) {
          rackList.push(item);
        }
        if (checkIsChair(item)) {
          chairList.push(item);
        }
        allList.push(item);
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
      setChairList(chairList);
      const viewer = viewerRef.current;
      // 将 rackList 中的机架设置为 viewer 的射线检测对象
      viewer?.setRaycasterObjects([...allList]);
      // viewer.setRaycasterObjects([...rackList, ...chairList]);
    });
  };
  useEffect(() => {
    init();
    initModel();
    return () => {
      const viewer = viewerRef.current;
      viewer?.destroy();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        id={PAGE_ID}
        style={{ width: 1000, height: 1000, border: "1px solid red" }}
      ></div>

      {rackInfoList?.map((item, index) => {
        return (
          <Popover
            key={item?.name}
            ref={(el) =>
              (tagRefs.current[index] = { dom: el, ...item } as Object3DExtends)
            }
            viewer={viewerRef.current}
            show={item?.addData?.visible}
            // data={popoverData}
          />
        );
      })}
      {/* <Popover ref={tagRefs} viewer={viewerRef.current} show /> */}
      <Button
        onClick={() => {
          queryDeviceDatas();
        }}
      >
        获取mock数据
      </Button>
    </div>
  );
};

export default ThreeDemo;
