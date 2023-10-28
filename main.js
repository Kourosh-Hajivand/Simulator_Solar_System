import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 2, 10);
scene.add(camera);
// AxesHelper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// BoxGeometry
const Geometry = new THREE.BoxGeometry();
const Material = new THREE.MeshBasicMaterial({ color: "#00ff83" });
const box = new THREE.Mesh(Geometry, Material);
scene.add(box);
//  PlaneGeometry
const PlaneGeometry = new THREE.PlaneGeometry(10, 10);
const PlaneMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
// SepherGeometry
const SepherGeometry = new THREE.SphereGeometry(2, 64, 64);
const SepherMaterial = new THREE.MeshLambertMaterial({
  color: 0xfcf33,
  wireframe: false,
});
const SepherMesh = new THREE.Mesh(SepherGeometry, SepherMaterial);
SepherMesh.position.x = 3;
scene.add(SepherMesh);
// Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(0, 1, 0); // Set the light's position
scene.add(directionalLight);
// GridHepler

const GridHepler = new THREE.GridHelper();
scene.add(GridHepler);
const PlaneMesh = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
PlaneMesh.rotation.x = -0.5 * Math.PI;
scene.add(PlaneMesh);
const animtaion = () => {
  box.rotation.y += 0.05;

  renderer.render(scene, camera);
};
const canvas = document.querySelector(".webgl");
const orbitcontrol = new OrbitControls(camera, canvas);
orbitcontrol.update();
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animtaion);
