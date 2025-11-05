class GameObject {
    constructor(geometry, material) {
        this.geometry = geometry;
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.components = []; // Array to hold components

        this.position = this.mesh.position;
        this.rotation = this.mesh.rotation;
        this.scale = this.mesh.scale;
    }

    addComponent(component) {
        this.components.push(component);
        component.gameObject = this; // Set a reference to the game object on the component
        component.start(); // Call the start method on the component, if it exists
    }

    update() {
        this.components.forEach(component => {
            if (component.update) {
                component.update();
            }
        });
    }
}