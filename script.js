import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Create the character (a simple cube)
const characterGeometry = new THREE.BoxGeometry(1, 1, 1);
const characterMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 }); // Use MeshLambertMaterial
const character = new THREE.Mesh(characterGeometry, characterMaterial);
scene.add(character);

// Character starting position
character.position.set(0, 0, 0);

// Create cubes
const cubes = [];
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 }); // Use MeshLambertMaterial
function spawnCube() {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = (Math.random() - 0.5) * 10; // Random x position
    cube.position.y = (Math.random() - 0.5) * 10; // Random y position
    cube.position.z = (Math.random() - 0.5) * 10; // Random z position
    scene.add(cube);
    cubes.push(cube);
}

// Initial cube spawn
for (let i = 0; i < 5; i++) {
        spawnCube();
    }

// Movement speed
const moveSpeed = 0.1;

// Key state
const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // An animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
// Set camera position
camera.position.z = 5;

// Game loop
function animate() {
    requestAnimationFrame(animate);

    // Movement
    if (keys['ArrowUp']) {
        character.position.z -= moveSpeed;
}
    if (keys['ArrowDown']) {
        character.position.z += moveSpeed;
    }
    if (keys['ArrowLeft']) {
        character.position.x -= moveSpeed;
    }
    if (keys['ArrowRight']) {
        character.position.x += moveSpeed;
    }

    // Cube pickup logic
    for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i];
        const distance = character.position.distanceTo(cube.position);

        if (distance < 1) {
            scene.remove(cube);
            cubes.splice(i, 1);
            console.log('Cube picked up!');
            spawnCube(); // Spawn a new cube
        }
    }

    // Update OrbitControls
    controls.update();

    renderer.render(scene, camera);
}

animate();

