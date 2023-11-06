import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stars from "/img/stars.jpg";
import sunTexture from "/img/sun.jpg";
import MercuryTexture from "/img/mercury.jpg";
import saturnTexture from "/img/saturn.jpg";
import saturnRingTexture from "/img/saturn ring.png";
import venusTexture from "/img/venus.jpg";
import earthTexture from "/img/earth.jpg";
import marsTexture from "/img/mars.jpg";
import jupiterTexture from "/img/jupiter.jpg";
import uranusTexture from "/img/uranus.jpg";
import uranusRingTexture from "/img/uranus ring.png";
import neptuneTexture from "/img/neptune.jpg";
import plutoTexture from "/img/pluto.jpg";
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
    RingMesh.position.x = position;
    RingMesh.rotation.x = -0.5 * Math.PI;
    Object.add(RingMesh);
  }
  Object.add(Mesh);
  return { Mesh, Object };
};
const SunPlanet = CreatePlanet(16, 0, sunTexture);
const mercury = CreatePlanet(6, 28, MercuryTexture);
const Venus = CreatePlanet(5.8, 44, venusTexture, false, saturnRingTexture);
const earth = CreatePlanet(6, 62, earthTexture, false, saturnRingTexture);
const mars = CreatePlanet(4, 78, marsTexture, false, saturnRingTexture);
const jupiter = CreatePlanet(12, 100, jupiterTexture, false, saturnRingTexture);
const saturn = CreatePlanet(10, 138, saturnTexture, false, saturnRingTexture);
const uranus = CreatePlanet(7, 176, uranusTexture, true, uranusRingTexture);
const neptune = CreatePlanet(7, 200, neptuneTexture, false, saturnRingTexture);
const pluto = CreatePlanet(2.8, 216, plutoTexture, false, saturnRingTexture);
// light
const AmbitionLight = new THREE.AmbientLight(0xffffff);
scene.add(AmbitionLight);

const pointLight = new THREE.PointLight(0xffffff, 10199, 1000);
pointLight.castShadow = true;
scene.add(pointLight);

// animation
const animation = () => {
  SunPlanet.Mesh.rotateY(0.004);
  mercury.Mesh.rotateY(0.004);
  Venus.Mesh.rotateY(0.002);
  earth.Mesh.rotateY(0.02);
  mars.Mesh.rotateY(0.018);
  mercury.Object.rotateY(0.04);
  saturn.Object.rotateY(0.0009);
  Venus.Object.rotateY(0.002);
  earth.Object.rotateY(0.01);
  mars.Object.rotateY(0.008);
  jupiter.Object.rotateY(0.0009);
  uranus.Object.rotateY(0.0004);
  neptune.Object.rotateY(0.0001);
  pluto.Object.rotateY(0.00007);
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
