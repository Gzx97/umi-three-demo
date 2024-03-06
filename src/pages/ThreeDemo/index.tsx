import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//引入lil-gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
const ThreeDemo: React.FC = () => {
  return (
    <div>
      <h2>Yay! Welcome to three!</h2>
    </div>
  );
};

export default ThreeDemo;
