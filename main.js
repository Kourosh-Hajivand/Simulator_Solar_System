import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 15;
camera.position.set(0, 2, 10);
scene.add(camera);
// Controler

// light
const ambitionLight = new THREE.AmbientLight(0x00ff00);
scene.add(ambitionLight);
// Helper
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);
// animation
const animation = () => {
  Rendrer.render(scene, camera);
};
// Rendrer
const canvas = document.querySelector(".webgl");
const orbit = new OrbitControls(camera, canvas);
orbit.update();
const Rendrer = new THREE.WebGL1Renderer({ canvas });
Rendrer.setSize(window.innerWidth, window.innerHeight);
Rendrer.setAnimationLoop(animation);
