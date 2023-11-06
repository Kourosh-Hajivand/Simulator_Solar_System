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
const CreatePlanet = (size, position, texture, haveRing, RingTexture) => {
  const textureLoader = new THREE.TextureLoader();
  const Geometry = new THREE.SphereGeometry(size, 64, 64);
  const Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const Mesh = new THREE.Mesh(Geometry, Material);
  Mesh.position.x = position;
  const Object = new THREE.Object3D();
  scene.add(Object);
  if (haveRing) {
    const RingGeo = new THREE.RingGeometry(12, 20, 32);
    const RingMat = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: textureLoader.load(RingTexture),
    });
    const RingMesh = new THREE.Mesh(RingGeo, RingMat);
    RingMesh.position.x = 70;
    RingMesh.rotation.x = -0.5 * Math.PI;
    Object.add(RingMesh);
  }
  Object.add(Mesh);
  return { Mesh, Object };
};
const SunPlanet = CreatePlanet(16, 0, sunTexture);
const mercury = CreatePlanet(6, 40, MercuryTexture);
const saturn = CreatePlanet(10, 70, saturnTexture, true, saturnRingTexture);
// light
const AmbitionLight = new THREE.AmbientLight(0xffffff);
scene.add(AmbitionLight);

const pointLight = new THREE.PointLight(0xffffff, 10199, 1000);
pointLight.castShadow = true;
scene.add(pointLight);

// animation
const animation = () => {
  SunPlanet.Mesh.rotateY(0.004);
  mercury.Mesh.rotateY(0.0104);
  mercury.Object.rotateY(0.009);
  saturn.Object.rotateY(0.0009);
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
