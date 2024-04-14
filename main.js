import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from './img/stars.jpg';
import sunTexture from './img/sun.jpg';
import earthTexture from './img/earth.jpg';
import moonTexture from './img/moon.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x999999);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);


const earthGeo = new THREE.SphereGeometry(6, 30, 30);
const earthMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(earthTexture)
});

const earthMesh = new THREE.Mesh(earthGeo, earthMat);
const earthObj = new THREE.Object3D();
earthObj.add(earthMesh);

scene.add(earthObj);
earthMesh.position.x = 62;


const moonGeo = new THREE.SphereGeometry(4, 30, 30);
const moonMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(moonTexture)
});

const moonMesh = new THREE.Mesh(moonGeo, moonMat);
const moonObj = new THREE.Object3D();
moonObj.add(moonMesh);

scene.add(moonObj);
moonMesh.position.x = 78;

const pointLight = new THREE.PointLight(0xFFFFFF, 10, 300);
scene.add(pointLight);

function animate() {
    //Self-rotation
    sun.rotateY(0.004);
    earthMesh.rotateY(0.02);
    moonMesh.rotateY(0.018);

    //Around-sun-rotation
    earthObj.rotateY(0.01);
    moonObj.rotateY(0.008);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});