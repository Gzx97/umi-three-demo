import React, { useEffect, useReducer, useRef, useState } from "react";
import * as THREE from "three";
import Viewer from "@/modules/Viewer";
import ModelLoader from "@/modules/ModelLoder";
import BoxHelperWrap from "@/modules/BoxHelperWrap";
import styles from "./index.less";
import Floors from "@/modules/Floors";
import { checkNameIncludes, findParent } from "@/utils";
import Event from "@/modules/Viewer/Events";
import { ModelExtendsData, Object3DExtends } from "@/types";
import Popover from "./components/Popover";
import { useCounter, useRequest } from "ahooks";
import axios from "axios";
import { Button } from "antd";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
const PAGE_ID = "FACTORY_CONTAINER";
import _ from "lodash";
const ThreeDemo: React.FC = () => {
  const [rackList, setRackList] = useState<Object3DExtends[]>([]); //架子
  const [chairList, setChairList] = useState<Object3DExtends[]>([]); //椅子
  const [current, { inc }] = useCounter(1, { min: 1, max: 20 });
  const viewerRef = useRef<Viewer>();
  /** 标签ref */
  const tagRefs = useRef<Object3DExtends[]>([]);
  let modelLoader: ModelLoader;
  let boxHelperWrap: BoxHelperWrap;
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
  /** 获取mock数据 */
  const { data: deviceDatas, run: queryDeviceDatas } = useRequest(
    (id) => {
      return axios
        .post(`/api/getDeviceDatas/${id}`)
        .then((res) => res.data?.data);
    },
    {
      manual: true,
    }
  );

  const [deviceListData, dispatchDeviceListData] = useReducer(
    (
      state: Object3DExtends[],
      action: {
        type: "OPERATE" | "INIT" | "ADD_DATA";
        initData?: Object3DExtends[];
        addData?: ModelExtendsData[];
        operateData?: Object3DExtends;
      }
    ): Object3DExtends[] => {
      const { type, initData, addData, operateData } = action;
      switch (type) {
        case "INIT":
          if (initData) {
            return initData;
          }
          break;
        case "ADD_DATA":
          return state?.map((rack) => {
            const found = addData?.find((item) => item.name === rack.name);
            if (found) {
              const worldPosition = new THREE.Vector3(); // 获取模型在世界坐标系中的位置
              Object.assign(rack, {
                addData: {
                  ...found,
                  position: rack.getWorldPosition(worldPosition), //获取世界坐标
                  visible: found?.visible ?? false,
                },
              });
              return rack;
            }
            return rack;
          }) as Object3DExtends[];
        case "OPERATE":
          console.log(operateData);
          return state?.map((model) => {
            if (model.name === operateData?.name) {
              Object.assign(model, { addData: operateData?.addData });
            }
            return model;
          }) as Object3DExtends[];
        default:
          return [...state];
      }
      return [...state];
    },
    []
  );
  /** 执行报警操作 */
  useEffect(() => {
    deviceListData?.forEach((item) => {
      if (item?.addData?.warn) {
        changeWarningColor(item);
      } else {
        changeOriginColor(item);
      }
    });
  }, [deviceListData]);
  /** 根据接口数据为模型添加信息 */
  useEffect(() => {
    const newData = deviceDatas?.map((data: ModelExtendsData) => {
      if (data?.warn) {
        return { ...data, visible: true };
      }
      return { ...data };
    });
    dispatchDeviceListData({ type: "ADD_DATA", addData: newData });
  }, [deviceDatas]);

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
    if (!name) {
      return;
    }
    const sourceData = _.find(deviceListData, { name: name });
    _.set(sourceData!, "addData.visible", !sourceData?.addData?.visible);
    dispatchDeviceListData({ type: "OPERATE", operateData: sourceData });
  };

  /** 创建CSS2DObject标签 */
  const createTags = (dom: HTMLElement, info: any) => {
    const viewer = viewerRef.current;
    const show = info?.visible;
    if (!show) {
      let tag = undefined as CSS2DObject | undefined;
      viewer?.scene?.traverse((child) => {
        if (child instanceof CSS2DObject && child.name === info.name) {
          tag = child;
        }
      });
      tag && viewer?.scene.remove(tag);
      return;
    }
    viewer?.addCss2Renderer();
    const TAG = new CSS2DObject(dom);
    const targetPosition = info?.position;
    TAG.position.set(
      targetPosition?.x,
      targetPosition?.y + 0.5,
      targetPosition?.z
    );
    TAG.name = info.name;
    let hasTag = false;
    viewer?.scene?.traverse((child) => {
      if (child instanceof CSS2DObject && child.name === info.name) {
        hasTag = true;
      }
    });
    !hasTag && viewer?.scene.add(TAG);
    // console.log(viewer?.scene);
  };

  /** 需要监听rackInfoList更新监听点击事件的函数 */
  useEffect(() => {
    if (!viewerRef.current) return;
    const viewer = viewerRef.current;
    viewer.emitter.off(Event.click.raycaster); //防止重复监听
    viewer?.emitter.on(Event.click.raycaster, (list: THREE.Intersection[]) => {
      onMouseClick(list);
    });
  }, [deviceListData, viewerRef]);
  /** 监听rackInfoList更新标签 */
  useEffect(() => {
    console.log("监听rackInfoList更新标签", deviceListData);
    const viewer = viewerRef.current;
    let showNames = [] as string[];
    let CSS2DObjectList = [] as CSS2DObject[];
    tagRefs?.current?.map((item, index) => {
      createTags(item?.dom as HTMLElement, item.addData);
      if (item?.addData?.visible) {
        showNames.push(item?.name);
      }
    });
  }, [deviceListData]);

  // 加载模型
  const initModel = () => {
    modelLoader.loadModelToScene("/models/datacenter.glb", (baseModel) => {
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
      dispatchDeviceListData({ type: "INIT", initData: rackList });
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

      {deviceListData?.map((item, index) => {
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
          queryDeviceDatas(current);
          inc();
        }}
      >
        获取mock数据
      </Button>
    </div>
  );
};

export default ThreeDemo;
