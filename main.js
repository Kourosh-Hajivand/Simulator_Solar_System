import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stars from "/img/stars.jpg";
import sunTexture from "/img/sun.jpg";
import MercuryTexture from "/img/mercury.jpg";
import saturnTexture from "/img/saturn.jpg";
import saturnRingTexture from "/img/saturn ring.png";
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
const CreatePlanet = (size, position, haveRing, RingTexture) => {
  const MercuryGeo = new THREE.SphereGeometry(3.2, 64, 64);
  const MercuryMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(MercuryTexture),
  });
  const MercuryMesh = new THREE.Mesh(MercuryGeo, MercuryMat);
  MercuryMesh.position.x = 28;
  const MercuryObj = new THREE.Object3D();
  scene.add(MercuryObj);
  MercuryObj.add(MercuryMesh);
};
// sunGeo
const textureLoader = new THREE.TextureLoader();
const SunGeo = new THREE.SphereGeometry(16, 64, 64);
const SunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const SunMesh = new THREE.Mesh(SunGeo, SunMat);
scene.add(SunMesh);
// mercury
const MercuryGeo = new THREE.SphereGeometry(3.2, 64, 64);
const MercuryMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(MercuryTexture),
});
const MercuryMesh = new THREE.Mesh(MercuryGeo, MercuryMat);
MercuryMesh.position.x = 28;
const MercuryObj = new THREE.Object3D();
scene.add(MercuryObj);
MercuryObj.add(MercuryMesh);
// saturn
const SaturnGeo = new THREE.SphereGeometry(10, 64, 64);
const SaturnMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(saturnTexture),
});
const SaturnMesh = new THREE.Mesh(SaturnGeo, SaturnMat);
SaturnMesh.position.x = 70;
const SaturnObj = new THREE.Object3D();
scene.add(SaturnObj);
SaturnObj.add(SaturnMesh);

const SaturnRingGeo = new THREE.RingGeometry(12, 20, 32);
const SaturnRingMat = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: textureLoader.load(saturnRingTexture),
});
const SaturnRingMesh = new THREE.Mesh(SaturnRingGeo, SaturnRingMat);
SaturnRingMesh.position.x = 70;
SaturnRingMesh.rotation.x = -0.5 * Math.PI;
SaturnObj.add(SaturnRingMesh);
// light
const AmbitionLight = new THREE.AmbientLight(0x404040);
scene.add(AmbitionLight);
const pointLight = new THREE.PointLight(0xffffff, 1000, 1000, 1.8);
scene.add(pointLight);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 100);
// scene.add(pointLightHelper);
// animation
const animation = () => {
  SunMesh.rotateY(0.004);
  MercuryMesh.rotateY(0.004);
  MercuryObj.rotateY(0.014);
  SaturnObj.rotateY(0.0009);
  Rendrer.render(scene, camera);
};
// Rendrer
const canvas = document.querySelector(".webgl");
const orbit = new OrbitControls(camera, canvas);
orbit.update();
const Rendrer = new THREE.WebGLRenderer({ canvas });
Rendrer.setSize(window.innerWidth, window.innerHeight);
Rendrer.setAnimationLoop(animation);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  Rendrer.setSize(window.innerWidth, window.innerHeight);
});
