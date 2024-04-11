import React, { useEffect, useReducer, useRef, useState } from "react";
import * as THREE from "three";
import Viewer, { Animate } from "@/modules/Viewer";
import ModelLoader from "@/modules/ModelLoder";
import BoxHelperWrap from "@/modules/BoxHelperWrap";
import styles from "./index.less";
import Floors from "@/modules/Floors";
import { checkNameIncludes, findChildren, findParent } from "@/utils";
import Event from "@/modules/Viewer/Events";
import { ModelExtendsData, Object3DExtends } from "@/types";
import Popover from "./components/Popover";
import { useCounter, useRequest } from "ahooks";
import axios from "axios";
import { Button, Space } from "antd";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { v4 as uuid } from "uuid";

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
    async (id) => {
      const res = await axios.post(`/api/getDeviceDatas/${id}`);
      return res.data?.data;
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
    if (!intersects.length) return;
    const selectedObject = intersects?.[0].object || {};
    onClickRack(selectedObject);
    onClickChair(selectedObject);
  };
  const onClickChair = (selectedObject: THREE.Object3D) => {
    if (!checkNameIncludes(selectedObject, "chair")) return;
    const viewer = viewerRef.current;

    viewer?.addCameraTween(new THREE.Vector3(0.05, 0.66, -2.54), 1000, () => {
      console.log("动画完成");
      console.log(viewer?.scene?.children);
      const sceneModels = viewer?.scene?.children;
      // const model = sceneModels?.find((model) => {
      //   return model.name === "机房";
      // })!;
      // const floorModel = sceneModels?.find((model) => {
      //   return model.name === "机房";
      // })
      viewer?.setRaycasterObjects([]); //
      sceneModels?.forEach((model) => {
        viewer?.scene.remove(model);
      });

      createRoom("room", new THREE.Vector3(0, 0, 0));
    });
  };
  const onClickRack = (selectedObject: THREE.Object3D) => {
    if (!checkNameIncludes(selectedObject, "rack")) return;
    const rack = findParent(selectedObject, checkIsRack);
    if (!rack) return;
    updateRackInfo(rack.name);
  };
  const onMouseMove = (intersects: THREE.Intersection[]) => {
    if (!intersects.length) {
      boxHelperWrap?.setVisible(false);
      return;
    }
    const selectedObject = intersects[0].object || {};
    const findHoverModel = (object: THREE.Object3D) => {
      if (object.parent && object.type !== "Scene") {
        findHoverModel(object.parent);
      }
    };
    findHoverModel(selectedObject);
    const rack = findParent(selectedObject, checkIsRack);
    if (rack) {
      boxHelperWrap.attach(rack);
    }
  };

  const updateRackInfo = (name: string) => {
    if (!name) return;
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
        if (child instanceof CSS2DObject && child?.name === info?.name) {
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
  }, [deviceListData, viewerRef, viewerRef.current?.scene]);
  /** 监听rackInfoList更新标签 */
  useEffect(() => {
    // console.log("监听rackInfoList更新标签", deviceListData);
    let showNames = [] as string[];
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
      model.name = "机房";
      model.uuid = "机房";
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
    });
  };
  const createRoom = (name: string, position: THREE.Vector3) => {
    const textLoader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(16, 256, 256); //创建一个球体贴全景图
    geometry.scale(1, 1, -1); //它实际上是在将球体的内部翻转到外部，而外部翻转到内部。
    const map = textLoader.load("/map/map_living_room.jpg", (a) => {
      console.log(a);
    });
    // return;
    const roomMaterial = new THREE.MeshBasicMaterial({
      map: map,
      side: THREE.DoubleSide,
    });
    const room = new THREE.Mesh(geometry, roomMaterial);
    room.name = name;
    room.position.set(position.x, position.y, position.z);
    room.rotation.y = Math.PI / 2;
    viewerRef.current?.scene.add(room);
    return room;
  };
  const onDismantle = () => {
    const viewer = viewerRef.current;
    const sceneModels = viewer?.scene?.children;
    const targetModel = sceneModels?.find((model) => {
      return model.name === "机房";
    })!;

    const clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.3); //创建一个裁剪平面
    const helper = new THREE.PlaneHelper(clippingPlane, 300, 0xffff00);
    viewer?.scene.add(helper);
    targetModel?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return;
      if (mesh.name === "chair") {
        mesh.material = new THREE.MeshPhysicalMaterial({
          ...mesh.material,
          clipIntersection: true, //改变剪裁方式，剪裁所有平面要剪裁部分的交集
          clipShadows: true,
          clippingPlanes: [clippingPlane],
        });
      }
    });
    const fnOnj = {
      fun: () => {
        if (clippingPlane.constant <= -0.1) {
          // viewer?.scene.remove(targetModel);
          viewer?.removeAnimate("clippingPlane");
          // viewer?.setRaycasterObjects([]); //

          console.log(viewer?.scene);
        }
        clippingPlane.constant -= 0.001;
      },
      content: viewer,
    };
    viewer?.addAnimate("clippingPlane", fnOnj);
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
      <Space>
        <Button
          onClick={() => {
            queryDeviceDatas(current);
            inc();
          }}
        >
          获取mock数据
        </Button>
        <Button onClick={onDismantle}>开始拆解</Button>
      </Space>
    </div>
  );
};

export default ThreeDemo;
