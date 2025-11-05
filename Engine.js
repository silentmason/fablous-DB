class Engine {
    constructor() {
        // Initialize Three.js components
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Camera controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.camera.position.z = 5;

        // Game objects array
        this.gameObjects = [];

        // Start the game loop
        this.gameLoop();
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
        this.scene.add(gameObject.mesh); // Assuming gameObject has a 'mesh' property
    }

    removeGameObject(gameObject) {
        const index = this.gameObjects.indexOf(gameObject);
        if (index > -1) {
            this.gameObjects.splice(index, 1);
            this.scene.remove(gameObject.mesh);
        }
    }

    gameLoop() {
        requestAnimationFrame(this.gameLoop.bind(this));

        // Update game objects
        this.gameObjects.forEach(gameObject => {
            gameObject.update();
        });

        // Update camera controls
        this.controls.update();

        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }
}