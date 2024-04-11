import React, { useEffect, useRef } from "react";
import styles from "./index.less";
import Viewer from "@/modules/Viewer";
import * as THREE from "three";
const PAGE_ID = "ROOM_CONTAINER";

const Room: React.FC = () => {
  const viewerRef = useRef<Viewer>();

  const createRoom = (name: string, position: THREE.Vector3) => {
    const textLoader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(16, 256, 256);
    geometry.scale(1, 1, -1);
    const material = new THREE.MeshBasicMaterial({
      map: textLoader.load("/map/map_living_room.jpg"),
      side: THREE.DoubleSide,
    });
    const room = new THREE.Mesh(geometry, material);
    room.name = name;
    room.position.set(position.x, position.y, position.z);
    room.rotation.y = Math.PI / 2;
    viewerRef.current?.scene.add(room);
    return room;
  };
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
    createRoom("living", new THREE.Vector3(0, 0, 0));
  };
  useEffect(() => {
    init();
    return () => {
      const viewer = viewerRef.current;
      viewer?.destroy();
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <div
        id={PAGE_ID}
        style={{ width: 1500, height: 1000, border: "1px solid red" }}
      ></div>
      全景图
    </div>
  );
};
export default Room;
