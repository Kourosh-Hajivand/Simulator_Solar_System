import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.3,
  1000
);

camera.position.set(0, 15, 30);
scene.add(camera);
// AxesHelper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const cubeTexture = new THREE.CubeTextureLoader()
  .setPath("/")
  .load([
    "nebula.jpg",
    "nebula.jpg",
    "nebula.jpg",
    "nebula.jpg",
    "nebula.jpg",
    "nebula.jpg",
  ]);
cubeTexture.generateMipmaps = false;
scene.background = cubeTexture;
// IcosahedronGeometry
const loader = new THREE.TextureLoader();
const IcosahedronGeometry = new THREE.IcosahedronGeometry();
const IcoMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/nebula.jpg"),
});

const boxtwo = new THREE.Mesh(IcosahedronGeometry, IcoMaterial);
boxtwo.castShadow = true;
boxtwo.position.set(0, 2, 10);
scene.add(boxtwo);
//  PlaneGeometry
const PlaneGeometry = new THREE.PlaneGeometry(40, 40);
const PlaneMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const PlaneMesh = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
PlaneMesh.rotation.x = -0.5 * Math.PI;
PlaneMesh.receiveShadow = true;
scene.add(PlaneMesh);
// SepherGeometry
const SepherGeometry = new THREE.SphereGeometry(2, 64, 64);
const SepherMaterial = new THREE.MeshLambertMaterial({
  color: 0xfcf33,
  wireframe: false,
});
const SepherMesh = new THREE.Mesh(SepherGeometry, SepherMaterial);
SepherMesh.castShadow = true;
scene.add(SepherMesh);
// Light
const AmbientLight = new THREE.AmbientLight(0x333333);
scene.add(AmbientLight);
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(-60, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.top = 10;
// directionalLight.shadow.camera.right = 50;
// scene.add(directionalLight);

// const DShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(DShadowHelper);
// const DLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(DLightHelper);
// GridHepler
// const GridHepler = new THREE.GridHelper();
// scene.add(GridHepler);

const spotLight = new THREE.SpotLight(0xffffff, 1);
scene.add(spotLight);
spotLight;
// Add Gui
const gui = new dat.GUI();
const option = {
  SepherColor: "#ffea00",
  speed: 0.01,
  positionX: 0,
  wireframe: false,
};
gui.addColor(option, "SepherColor").onChange((e) => {
  SepherMesh.material.color.set(e);
});
gui.add(option, "speed", 0, 0.1);
gui.add(option, "positionX").onChange((e) => {
  SepherMesh.position.x = e;
});
gui.add(option, "wireframe").onChange((e) => {
  SepherMesh.material.wireframe = e;
});
let step = 0;
const animtaion = () => {
  step += option.speed;
  SepherMesh.position.y = 5 * Math.abs(Math.sin(step));
  boxtwo.position.y = 5 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
};
const canvas = document.querySelector(".webgl");
const orbitcontrol = new OrbitControls(camera, canvas);
orbitcontrol.update();
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setAnimationLoop(animtaion);
