import { throttle } from "lodash";
import useThree from "../useThree";
import * as THREE from "three";
import { useEffect } from "react";

const useThreeRaycaster = (el?: HTMLElement) => {
  if (!el) return;
  const raycaster = new THREE.Raycaster();

  const initRaycaster = (
    camera: THREE.Camera,
    eventType: keyof HTMLElementEventMap
  ) => {
    const initRaycasterEvent = (eventName: keyof HTMLElementEventMap) => {
      //这里的container就是画布所在的div，也就是说，这个是要拿整个scene所在的容器来界定的
      let getBoundingClientRect = el.getBoundingClientRect();
      let offsetWidth = el.offsetWidth;
      let offsetHeight = el.offsetHeight;
      const funWrap = throttle((event: any) => {
        const canvasX = event.clientX - getBoundingClientRect.left;
        const canvasY = event.clientY - getBoundingClientRect.top;
        const threeX = (canvasX / offsetWidth) * 2 - 1;
        const threeY = -(canvasY / offsetHeight) * 2 + 1;
        const mouse = new THREE.Vector2(threeX, threeY);
        raycaster.setFromCamera(mouse, camera);
      }, 50);
      // funWrap()
      el.addEventListener(eventName, funWrap);
    };
    initRaycasterEvent(eventType);
  };
  const removeEventListener = (el: HTMLElement, eventType: string) => {
    el.removeEventListener(eventType, () => {});
  };

  return {
    initRaycaster,
  };
};
