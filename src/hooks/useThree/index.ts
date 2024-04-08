import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import ThreeBase from "./core";
import TWEEN, { Tween } from "three/examples/jsm/libs/tween.module.js";
import { isFunction, throttle } from "lodash";
import useLoading from "../useLoading";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const useThree = () => {
  const { loading, openLoading, closeLoading } = useLoading(true, 500);
  const container = useRef<HTMLDivElement>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.Camera | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const CSSRenderer = useRef<CSS2DRenderer | null>();
  const control = useRef<OrbitControls>();
  const mixers: THREE.AnimationMixer[] = [];
  const mouse = useRef<THREE.Vector2 | null>(null);
  const clock = new THREE.Clock();
  const composers = new Map();
  const renderMixins = new Map();
  const raycaster = new THREE.Raycaster();
  // const mouse = new THREE.Vector2(
  //   (event.clientX / el.offsetWidth) * 2 - 1,
  //   -(event.clientY / el.offsetHeight) * 2 + 1
  // );
  const initRaycaster = () => {
    const el = container.current as HTMLElement;
    const initRaycasterEvent: Function = (
      eventName: keyof HTMLElementEventMap
    ) => {
      //这里的container就是画布所在的div，也就是说，这个是要拿整个scene所在的容器来界定的
      let getBoundingClientRect = el.getBoundingClientRect();
      let offsetWidth = el.offsetWidth;
      let offsetHeight = el.offsetHeight;
      const funWrap = throttle((event: any) => {
        const canvasX = event.clientX - getBoundingClientRect.left;
        const canvasY = event.clientY - getBoundingClientRect.top;
        const threeX = (canvasX / offsetWidth) * 2 - 1;
        const threeY = -(canvasY / offsetHeight) * 2 + 1;
        mouse.current = new THREE.Vector2(threeX, threeY);
        raycaster.setFromCamera(mouse.current, camera.current!);
      }, 50);
      // funWrap()
      el.addEventListener(eventName, funWrap);
    };
    initRaycasterEvent("click");
    initRaycasterEvent("dblclick");
    initRaycasterEvent("mousemove");
  };
  const destroy = () => {
    scene?.current?.traverse((child: any) => {
      if (child.material) {
        child.material.dispose();
      }
      if (child.geometry) {
        child.geometry.dispose();
      }
      child = null;
    });
    renderer?.current?.forceContextLoss();
    renderer?.current?.dispose();
    scene?.current?.clear();
  };
  useEffect(() => {
    const el = container.current as HTMLElement;
    scene.current = ThreeBase.initScene();
    camera.current = ThreeBase.initCamera(el);
    renderer.current = ThreeBase.initRenderer(el);
    CSSRenderer.current = ThreeBase.initCSSRender(el);
    control.current = ThreeBase.initControl(
      camera.current,
      CSSRenderer.current.domElement
    );
    initRaycaster();
  }, []);

  const render = () => {
    const delta = new THREE.Clock().getDelta();
    renderer.current!.render(scene.current!, camera.current!);
    const mixerUpdateDelta = clock.getDelta();
    mixers.forEach((mixer: THREE.AnimationMixer) =>
      mixer.update(mixerUpdateDelta)
    );
    composers.forEach((composer) => composer.render(delta));
    renderMixins.forEach((mixin) => isFunction(mixin) && mixin());
    CSSRenderer.current!.render(scene.current!, camera.current!);
    TWEEN.update();
    requestAnimationFrame(() => render());
  };
  const loadModels = async (tasks: Promise<any>[]) => {
    openLoading();
    await Promise.all(tasks);
    closeLoading();
  };
  const loadGLTF = (url: string): Promise<GLTF> => {
    const loader = new GLTFLoader();
    const onCompleted = (object: GLTF, resolve: any) => resolve(object);
    return new Promise<GLTF>((resolve) => {
      loader.load(url, (object: GLTF) => onCompleted(object, resolve));
    });
  };

  const loadAnimate = (
    mesh: THREE.Mesh | THREE.AnimationObjectGroup | THREE.Group,
    animations: Array<THREE.AnimationClip>,
    animationName: string
  ) => {
    const mixer = new THREE.AnimationMixer(mesh);
    const clip = THREE.AnimationClip.findByName(animations, animationName);
    if (!clip) return undefined;
    const action = mixer.clipAction(clip);
    action.play();
    mixers.push(mixer);
    return undefined;
  };
  return {
    container,
    loading,
    scene,
    camera,
    renderer,
    CSSRenderer,
    control,
    mixers,
    clock,
    composers,
    renderMixins,
    raycaster,
    render,
    loadGLTF,
    loadAnimate,
    loadModels,
    destroy,
  };
};

export default useThree;
