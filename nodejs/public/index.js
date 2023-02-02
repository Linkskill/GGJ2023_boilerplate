import * as THREE from '/build/three.module.js';
import Stats from './jsm/libs/stats.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
console.log(THREE);
console.log(OrbitControls);

const canvas = document.querySelector('.web-gl');

// showing fps
const stats = new Stats();
document.body.appendChild(stats.domElement);

// Scene Setup
const scene = new THREE.Scene();
console.log(scene);

// Camera Setup
const fov = 50;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 25);
scene.add(camera);
console.log(camera);

// Render Setup
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor = (0x000000, 0.0);
console.log(renderer);

// Adding orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

controls.minDistance = 10;
controls.maxDistance = 40;

let loader = new THREE.TextureLoader();

let textureArray = [];

let frontTexture = loader.load('./models/MarriottMadisonWest/front.jpg')
let backTexture = loader.load('./models/MarriottMadisonWest/back.jpg')
let topTexture = loader.load('./models/MarriottMadisonWest/top.jpg')
let bottomTexture = loader.load('./models/MarriottMadisonWest/bottom.jpg')
let leftTexture = loader.load('./models/MarriottMadisonWest/left.jpg')
let rightTexture = loader.load('./models/MarriottMadisonWest/right.jpg')

textureArray.push(new THREE.MeshBasicMaterial({ map: frontTexture }));
textureArray.push(new THREE.MeshBasicMaterial({ map: backTexture }));
textureArray.push(new THREE.MeshBasicMaterial({ map: topTexture }));
textureArray.push(new THREE.MeshBasicMaterial({ map: bottomTexture }));
textureArray.push(new THREE.MeshBasicMaterial({ map: leftTexture }));
textureArray.push(new THREE.MeshBasicMaterial({ map: rightTexture }));

for(let i = 0; i < textureArray.length; i++) {
    textureArray[i].side = THREE.BackSide;
}

const cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
const skyBox = new THREE.Mesh(cubeGeometry, textureArray);
scene.add(skyBox);

// render function to render the scene
const render = () => {
    renderer.render(scene, camera);
}

// Recursion function for animation
const animate = () => {
    requestAnimationFrame(animate);
    render();
    stats.update();
}
animate();

// Resizing window to make responsive
const windowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

window.addEventListener('resize', windowResize, false);