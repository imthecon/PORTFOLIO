window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});

// THREE.JS
import './style.css';
import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: true,
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render(scene, camera);


// loads custom textures
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('assets/normal.png');


// loads custom gltf/glb objects (created by me in Blender)
const color1 = new THREE.Color(0x92001e);
const color2 = new THREE.Color(0xb70328);    
const t = Math.random();

let monitor;
const gltfLoader = new GLTFLoader();
gltfLoader.load('https://sarder.ca/public/assets/monitor.glb', function(gltf) {
  monitor = gltf.scene;
  monitor.rotation.y = Math.PI / -3;
  monitor.rotation.x = Math.PI / 1;
  monitor.rotation.z = Math.PI / 1;
  monitor.scale.set(5, 5, 5);
  monitor.position.y = 1;
  
  monitor.traverse((child) => {
    if (child.isMesh) {
      const color = color1.clone().lerp(color2, t);
      const standardMaterial = new THREE.MeshStandardMaterial( { map: texture, color: color } );
      child.material = standardMaterial;
    };
  });

  scene.add(monitor);
  addObjects(monitor, 25);
  monitor.visible = false;
});

let phone;
gltfLoader.load('https://sarder.ca/public/assets/phone.glb', function(gltf) {
  phone = gltf.scene;
  phone.rotation.y = Math.PI / -3;
  phone.rotation.x = Math.PI / -1.1;
  phone.rotation.z = Math.PI / 1;
  phone.position.y = -3.5;
  phone.position.x = -1.5;
  phone.scale.set(5, 5, 5);
  
  phone.traverse((child) => {
    if (child.isMesh) {
      const color = color1.clone().lerp(color2, t);
      const standardMaterial = new THREE.MeshStandardMaterial( { map: texture, color: color } );
      child.material = standardMaterial;
    }
  });

  scene.add(phone);
  addObjects(phone, 25);
  phone.visible = false;
});

let briefcase;
gltfLoader.load('https://sarder.ca/public/assets/briefcase.glb', function(gltf) {
  briefcase = gltf.scene;
  briefcase.rotation.y = Math.PI / -4;
  briefcase.rotation.x = Math.PI / 8;
  briefcase.rotation.z = Math.PI / 1;
  briefcase.scale.set(5, 5, 5);
  
  briefcase.traverse((child) => {
    if (child.isMesh) {
      const color = color1.clone().lerp(color2, t);
      const standardMaterial = new THREE.MeshStandardMaterial( { map: texture, color: color } );
      child.material = standardMaterial;
    };
  });
  scene.add(briefcase);
  addObjects(briefcase, 25);
  briefcase.visible = false;
});

let mug;
gltfLoader.load('https://sarder.ca/public/assets/mug.glb', function(gltf) {
  mug = gltf.scene;
  mug.rotation.y = Math.PI / -3;
  mug.rotation.x = Math.PI / 1;
  mug.rotation.z = Math.PI / 1.1;
  mug.position.y = -4;
  mug.scale.set(5, 5, 5);
  
  mug.traverse((child) => {
    if (child.isMesh) {
      const color = color1.clone().lerp(color2, t);
      const standardMaterial = new THREE.MeshStandardMaterial( { map: texture, color: color} );
      child.material = standardMaterial;
    };
  });
  scene.add(mug);
  addObjects(mug, 25);
  mug.visible = false;
});

// adds a bunch of objects in the background (spaced randomly)
function addObjects(obj, numberOfObj) {
  const color1 = new THREE.Color(0xfa8128);
  const color2 = new THREE.Color(0xed820e);

  for (let i = 0; i < numberOfObj; i++) {
    const scaleNumber = Math.random() * (1 - 0.75) + 0.75;

    const objClone = obj.clone();

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    objClone.position.set(x, y, z);
    objClone.scale.set(scaleNumber, scaleNumber, scaleNumber);
    objClone.traverse((child) => {
      if (child.isMesh) {
        const t = Math.random();
        const color = color1.clone().lerp(color2, t);
        const standardMaterial = new THREE.MeshBasicMaterial( { map: texture, color: color, transparent: true } );
        child.material = standardMaterial;
        child.material.opacity = 0.15;
      };
    });
    objClone.rotation.y = Math.random() * Math.PI;
    objClone.rotation.x = Math.random() * Math.PI;
    objClone.rotation.z = Math.random() * Math.PI;

    scene.add(objClone);
  }
}

// functions to alternate between objects (by section)
function showObject(scrollPosition, section1Top, section2Top, section3Top, section4Top) {
  if (scrollPosition >= section1Top && scrollPosition < section2Top) {
    monitor.visible = true;
    briefcase.visible = false;
    mug.visible = false;
    phone.visible = false;
    scaleObject(monitor, 4);
    scaleObject(briefcase, 0);
  } else if (scrollPosition >= section2Top && scrollPosition < section3Top) {
    monitor.visible = false;
    briefcase.visible = true;
    mug.visible = false;
    phone.visible = false;
    scaleObject(monitor, 0);
    scaleObject(briefcase, 4);
    scaleObject(mug, 0);
  } else if (scrollPosition >= section3Top && scrollPosition < section4Top) {
    monitor.visible = false;
    briefcase.visible = false;
    mug.visible = true;
    phone.visible = false;
    scaleObject(briefcase, 0);
    scaleObject(mug, 4);
    scaleObject(phone, 0);
  } else if (scrollPosition >= section4Top) {
    monitor.visible = false;
    briefcase.visible = false;
    mug.visible = false;
    phone.visible = true;
    scaleObject(mug, 0);
    scaleObject(phone, 4);
  }
}

function scaleObject(object, targetScale, duration = 250) {
  let currentScale = object.scale.x;
  const scaleStep = (targetScale - currentScale) / (duration / (1000 / 60)); // determines how quickly the animation is going to go

  function animateScale() {
    if ((scaleStep > 0 && currentScale < targetScale) || (scaleStep < 0 && currentScale > targetScale)) {
      currentScale += scaleStep;
      object.scale.set(currentScale, currentScale, currentScale);
      requestAnimationFrame(animateScale); // runs as many times equivalent to the device's refresh rate every second (e.g., 60, 144, etc.)
    } else {
      object.scale.set(targetScale, targetScale, targetScale);
    }
  }

  animateScale();
}

document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', function() {
    const section1Top = document.getElementById('home').offsetTop - 1000;
    const section2Top = document.getElementById('work-experience').offsetTop;
    const section3Top = document.getElementById('portfolio').offsetTop;
    const section4Top = document.getElementById('contact').offsetTop;

    const scrollPosition = (window.scrollY + window.innerHeight / 2);

    showObject(scrollPosition, section1Top, section2Top, section3Top, section4Top);
  });
});


// function updatePlaceholder(model) {
//   clones.forEach(function(clone) {
//     clone.traverse(function(child) {
//       if (child.isMesh) {
//         if (child.geometry) {
//           child.geometry.dispose();
//         }
        
//         const newGeometry = model.geometry.clone();
//         child.geometry = newGeometry;
//       }
//     });
//   });
// }

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1, 1, 1)

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 0, 1);
scene.add(ambientLight, directionalLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper)

// const controls = new OrbitControls(camera, renderer.domElement)


// moves the camera relative to the user's position (from the top of the screen)
let targetZ = camera.position.z;
let currentScroll = 0;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  currentScroll = t * -0.01;
  targetZ = currentScroll;
}

window.addEventListener('scroll', moveCamera);

let mouseX = 0;
let mouseY = 0;

// function that calculates the X and Y movement of the mouse and updates its value every time a frame is refreshed
document.addEventListener('mousemove', function(e) {
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;
  mouseX = (e.clientX - windowHalfX) / 75;
  mouseY = (e.clientY - windowHalfY) / 75;
});


// rotates the centered object (fix)
function animate() {
  camera.position.z += (targetZ - (camera.position.z * 1.5)) * 0.05;
  camera.position.x += (mouseX - camera.position.x) * 0.025;
  camera.position.y += (-mouseY - camera.position.y) * 0.025;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


// resizes the canvas according to the window size
window.addEventListener("resize", function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// // prevents the user from seeing every center object loaded in on top of each other if page is refreshed in the middle.
// window.addEventListener('load', function() {
//   var element = document.getElementById('bg');
//   element.style.opacity = '0.1';
// });