import * as THREE from "three";
// Add scene
const scene = new THREE.Scene();
// The Shape
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
const Mesh = new THREE.Mesh(geometry, material);
scene.add(Mesh);

// Light
const Light = new THREE.PointLight(0xffffff, 1, 100);
Light.position.set(0, 10, 10);
scene.add(Light);

const camara = new THREE.PerspectiveCamera(45, 800 / 600);
camara.position.z = 20;
scene.add(camara);
// Rendrer
const canvas = document.querySelector(".webGl");
const Rendrer = new THREE.WebGLRenderer({ canvas });
Rendrer.setSize(800, 600);
Rendrer.render(scene, camara);
