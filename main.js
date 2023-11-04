import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stars from "/img/stars.jpg";
import sunTexture from "/img/sun.jpg";
// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(-190, 140, 140);
scene.add(camera);

const sceneTexture = new THREE.CubeTextureLoader();
scene.background = sceneTexture.load([
  Stars,
  Stars,
  Stars,
  Stars,
  Stars,
  Stars,
]);

// sunGeo
const textureLoader = new THREE.TextureLoader();
const SunGeo = new THREE.SphereGeometry(20, 64, 64);
const SunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const SunMesh = new THREE.Mesh(SunGeo, SunMat);
scene.add(SunMesh);
//
// light
const ambitionLight = new THREE.AmbientLight(0x404040);
scene.add(ambitionLight);
// animation
const animation = () => {
  SunMesh.rotateY(0.004);
  Rendrer.render(scene, camera);
};
// Rendrer
const canvas = document.querySelector(".webgl");
const orbit = new OrbitControls(camera, canvas);
orbit.update();
const Rendrer = new THREE.WebGL1Renderer({ canvas });
Rendrer.setSize(window.innerWidth, window.innerHeight);
Rendrer.setAnimationLoop(animation);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  Rendrer.setSize(window.innerWidth, window.innerHeight);
});
