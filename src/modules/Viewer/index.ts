import {
  Scene,
  PerspectiveCamera,
  AxesHelper,
  WebGLRenderer,
  Camera,
  SRGBColorSpace,
  AmbientLight,
  Raycaster,
  Vector2,
} from "three";
import * as THREE from "three";
import mitt, { type Emitter } from "mitt";
import Events from "./Events";
import { isFunction, throttle } from "lodash";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import TWEEN, { Tween } from "three/examples/jsm/libs/tween.module.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import SkyBoxs from "../SkyBoxs";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
// import SkyBoxs from '../SkyBoxs'

export type Animate = {
  fun: (arg: any) => any;
  content: any;
};

export default class Viewer {
  public id: string;
  public viewerDom!: HTMLElement;
  public scene!: Scene;
  public camera!: PerspectiveCamera;
  public renderer!: WebGLRenderer;
  public controls!: OrbitControls;
  public skyboxs!: SkyBoxs;
  public animateEventList = new Map();
  public statsControls!: Stats;
  public raycaster!: Raycaster;
  public mouse!: Vector2;
  public emitter!: Emitter<any>;
  public mouseEvent: MouseEvent | undefined;
  public raycasterObjects: THREE.Object3D[] = [];
  public isDestroy = false;
  public tween!: Tween<THREE.Vector3>;
  public css2Renderer: CSS2DRenderer | undefined;

  constructor(id: string) {
    this.id = id;
    this.initViewer();
  }
  /**坐标轴辅助 */
  public addAxis() {
    const axis = new AxesHelper(1000);
    this.scene?.add(axis);
  }

  public addAnimate(id: string, animate: Animate) {
    this.animateEventList.set(id, animate);
  }
  public removeAnimate(id: string) {
    this.animateEventList?.delete(id);
  }
  /**
   * 添加性能状态监测
   */
  public addStats() {
    if (!this.statsControls) this.statsControls = new Stats();
    this.statsControls.dom.style.position = "absolute";
    this.viewerDom.appendChild(this.statsControls.dom);

    // 添加到动画
    this.addAnimate("stats", {
      fun: this.statsUpdate,
      content: this.statsControls,
    });
  }
  /**
   * 添加2D标签
   */
  public addCss2Renderer() {
    if (!this.css2Renderer) return;
    this.css2Renderer.render(this.scene, this.camera);
    this.css2Renderer.setSize(1000, 1000);
    this.css2Renderer.domElement.style.position = "absolute";
    this.css2Renderer.domElement.style.top = "0px";
    this.css2Renderer.domElement.style.pointerEvents = "none";
    this.viewerDom.appendChild(this.css2Renderer?.domElement);
  }
  /**
   * 初始化补间动画库tween
   */
  public initCameraTween() {
    if (!this.camera) return;
    this.tween = new Tween(this.camera.position);
  }

  /**
   * 添加补间动画
   * @param targetPosition
   * @param duration
   */
  public addCameraTween(
    targetPosition = new THREE.Vector3(1, 1, 1),
    duration = 1000,
    onComplete: () => void
  ) {
    this.initCameraTween();
    this.tween.to(targetPosition, duration).start().onComplete(onComplete);
  }

  /**注册鼠标事件监听 */
  public initRaycaster() {
    this.raycaster = new Raycaster();

    // eslint-disable-next-line @typescript-eslint/ban-types
    const initRaycasterEvent: Function = (
      eventName: keyof HTMLElementEventMap
    ): void => {
      //这里的container就是画布所在的div，也就是说，这个是要拿整个scene所在的容器来界定的
      let getBoundingClientRect = this.viewerDom.getBoundingClientRect();
      let offsetWidth = this.viewerDom.offsetWidth;
      let offsetHeight = this.viewerDom.offsetHeight;
      const funWrap = throttle((event: any) => {
        this.mouseEvent = {
          ...event,
          //真正的鼠标相对于画布的位置
          x: event.clientX - getBoundingClientRect.left,
          y: event.clientY - getBoundingClientRect.top,
        };
        // this.mouse.x = (event.clientX  / window.innerWidth) * 2 - 1;
        // this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.mouse.x =
          ((event.clientX - getBoundingClientRect.left) / offsetWidth) * 2 - 1;
        this.mouse.y =
          -((event.clientY - getBoundingClientRect.top) / offsetHeight) * 2 + 1;
        this.emitter.emit(
          (Events as any)[eventName].raycaster,
          this.getRaycasterIntersectObjects()
        );
      }, 100);
      this.viewerDom.addEventListener(eventName, funWrap, false);
    };

    initRaycasterEvent("click");
    initRaycasterEvent("dblclick");
    initRaycasterEvent("mousemove");
  }

  /**销毁场景 */
  public destroy() {
    this.scene.traverse((child: any) => {
      if (child.material) {
        child.material.dispose();
      }
      if (child.geometry) {
        child.geometry.dispose();
      }
      child = null;
    });
    this.renderer.forceContextLoss();
    this.renderer.dispose();
    this.scene.clear();

    this.isDestroy = true;
  }

  private statsUpdate(statsControls: any) {
    statsControls.update();
  }

  private initViewer() {
    this.emitter = mitt();

    this.initRenderer();
    this.initScene();
    this.initLight();
    this.initCamera();
    this.initControl();
    this.initCss2Renderer();
    // this.initSkybox();
    // this.addAxis();

    this.raycaster = new Raycaster();
    this.mouse = new Vector2();

    const animate = () => {
      if (this.isDestroy) return;
      requestAnimationFrame(animate);
      TWEEN.update();
      this.css2Renderer?.render(this.scene, this.camera);
      this.updateDom();
      this.renderDom();

      // 全局的公共动画函数，添加函数可同步执行
      this.animateEventList.forEach((event) => {
        // console.log("animateEventList");
        if (event.fun && event.content) {
          event.fun(event.content);
        }
      });
    };
    animate();
  }
  private initCss2Renderer() {
    this.css2Renderer = new CSS2DRenderer();
  }
  private initScene() {
    this.scene = new Scene();
  }

  private initCamera() {
    // 渲染相机
    this.camera = new PerspectiveCamera(
      25,
      // window.innerWidth / window.innerHeight,
      1,
      1,
      2000
    );
    //设置相机位置
    // this.camera.position.set(5, 1, -5);
    this.camera.position.set(4, 2, -3);
    //设置相机方向
    this.camera.lookAt(0, 0, 0);
  }

  private initRenderer() {
    // 获取画布dom
    this.viewerDom = document.getElementById(this.id) as HTMLElement;
    // 初始化渲染器
    this.renderer = new WebGLRenderer({
      logarithmicDepthBuffer: true,
      antialias: true, // true/false表示是否开启反锯齿
      alpha: true, // true/false 表示是否可以设置背景色透明
      precision: "mediump", // highp/mediump/lowp 表示着色精度选择
      premultipliedAlpha: true, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
      // preserveDrawingBuffer: false, // true/false 表示是否保存绘图缓冲
      // physicallyCorrectLights: true, // true/false 表示是否开启物理光照
    });
    this.renderer.clearDepth(); //清除深度缓冲区。在渲染之前，这通常用于重置深度缓冲区，以确保正确的深度测试

    // 开启模型对象的局部剪裁平面功能
    // 如果不设置为true，设置剪裁平面的模型不会被剪裁
    this.renderer.localClippingEnabled = true;

    this.renderer.shadowMap.enabled = true;
    this.renderer.outputColorSpace = SRGBColorSpace; // 可以看到更亮的材质，同时这也影响到环境贴图。
    this.viewerDom.appendChild(this.renderer.domElement);
  }

  private initControl() {
    this.controls = new OrbitControls(
      this.camera as Camera,
      this.renderer?.domElement
    );
    this.controls.enableDamping = false;
    this.controls.screenSpacePanning = false; // 定义平移时如何平移相机的位置 控制不上下移动
    this.controls.minDistance = 2;
    this.controls.maxDistance = 1000;
    this.controls.addEventListener("change", () => {
      // console.log(this.camera.position);
      // console.log(this.controls.target);
      this.renderer.render(this.scene, this.camera);
    });
  }

  private initSkybox() {
    if (!this.skyboxs) this.skyboxs = new SkyBoxs(this);
    this.skyboxs.addSkybox("night");
    this.skyboxs.addFog();
  }

  private initLight() {
    const ambient = new AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 200, 100);
    light.castShadow = true;

    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.left = -120;
    light.shadow.camera.right = 400;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 400;
    // 设置mapSize属性可以使阴影更清晰，不那么模糊
    light.shadow.mapSize.set(1024, 1024);
    light.name = "initLight";

    this.scene.add(light);
  }

  // 渲染dom
  private renderDom() {
    this.renderer?.render(this.scene as Scene, this.camera as Camera);
  }

  private updateDom() {
    this.controls.update();
    // 更新参数
    this.camera.aspect =
      this.viewerDom.clientWidth / this.viewerDom.clientHeight; // 摄像机视锥体的长宽比，通常是使用画布的宽/画布的高
    this.camera.updateProjectionMatrix(); // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用,来使得这些改变生效
    this.renderer.setSize(
      this.viewerDom.clientWidth,
      this.viewerDom.clientHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比
  }

  /**自定义鼠标事件触发的范围，给定一个模型组，对给定的模型组鼠标事件才生效 */
  public setRaycasterObjects(objList: THREE.Object3D[]): void {
    this.raycasterObjects = objList;
  }

  private getRaycasterIntersectObjects(): THREE.Intersection[] {
    if (!this.raycasterObjects.length) return [];
    this.raycaster.setFromCamera(this.mouse, this.camera);
    // console.log(this.raycaster.intersectObjects(this.raycasterObjects, true));
    return this.raycaster.intersectObjects(this.raycasterObjects, true);
  }

  public animation = (props: {
    from: Record<string, any>;
    to: Record<string, any>;
    duration: number;
    easing?: any;
    onUpdate: (params: Record<string, any>) => void;
    onComplete?: (params: Record<string, any>) => void;
  }) => {
    const {
      from,
      to,
      duration,
      easing = TWEEN.Easing.Quadratic.Out,
      onUpdate,
      onComplete,
    } = props;
    return new TWEEN.Tween(from)
      .to(to, duration)
      .easing(easing)
      .onUpdate((object) => isFunction(onUpdate) && onUpdate(object))
      .onComplete((object) => isFunction(onComplete) && onComplete(object))
      .start();
  };
}
