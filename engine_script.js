// engine_script.js (for engine_test.html)
const engine = new Engine();

// Create a cube using the GameObject class
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const cube = new GameObject(cubeGeometry, cubeMaterial);

// Add the cube to the engine
engine.addGameObject(cube);

//Move the cube
cube.position.x = 2;