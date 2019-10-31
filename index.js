var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 4);
renderer.setClearColor("dodgerblue");
document.body.appendChild(renderer.domElement);
var player, worldCollide;
var keydown = false;

function setup() {
    player = new Player();
    worldCollide = {
        all: [],
        allMesh: [],
        front: [],
        back: [],
        left: [],
        right: [],
        up: [],
        down: [],
        items: []
    }
    for (let x = -10; x < 10; x++) {
        for (let z = 10; z > -10; z--) {
            for (let y = -2; y < 0; y++) {
                createBloc({x: x, y: y, z: z, rotx: 0, roty: 0, rotz: 0}, blocsTextures[Math.floor(Math.random() * blocsTextures.length)]);
            }
        }
    }
    createBloc({x: 0, y: 3, z: 0, rotx: 0, roty: 0, rotz: 0}, blocsTextures[Math.floor(Math.random() * blocsTextures.length)]);
    renderer.render(scene, player.camera);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    player.collideWorld();
    player.move();
    player.drawHud();
    worldCollide.items.forEach(item => {
        item.move();
    });
    renderer.render(scene, player.camera);
}

setup();