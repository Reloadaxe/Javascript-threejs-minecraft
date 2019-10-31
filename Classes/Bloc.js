function Bloc(mesh, canBeBroke, timeToBreak, baseTexture, breakTextures) {
    this.mesh = mesh;
    this.canBeBroke = canBeBroke;
    this.timeToBreak = timeToBreak * 1000;
    this.breakPoint = 0;
    this.baseTexture = baseTexture;
    this.breakTextures = breakTextures;
    this.isItem = false;
    this.vit = 0.1;

    this.move = function() {
        this.mesh.rotation.y += 0.01;
        var collide = false;
        var collideBox = new THREE.Box3().setFromObject(this.mesh);
        worldCollide.up.forEach(cube => {
            if (collideBetween(collideBox, cube)) {
                collide = true;
                return (0);
            }
        });
        if (!collide) {
            this.mesh.position.y -= this.vit;
            if (this.mesh.position.y < -100) {
                worldCollide.items.splice(worldCollide.items.indexOf(this), 1);
                scene.remove(this.mesh);
            }
            if (this.vit < 1)
                this.vit *= 1.1;
        } else
            this.vit = 0.1;
    }

    this.break = function() {
        if ((this.canBeBroke || player.gamemode == 1) && !this.isItem) {
            for (let i = 1; i < 11; i++) {
                if (player.breaking[1] + this.timeToBreak / player.mineStrength * i / 11 <= Date.now()) {
                    if (this.breakPoint != i) {
                        this.breakPoint = i;
                        this.mesh.material = this.breakTextures[i - 1].texture;
                    }
                }
            }
            if (player.breaking[1] + this.timeToBreak / player.mineStrength <= Date.now() || player.gamemode == 1 && player.breaking[1] + 200 <= Date.now()) {
                let index = worldCollide.allMesh.indexOf(this.mesh);
                worldCollide.allMesh.splice(index, 1);
                worldCollide.all.splice(index, 1);
                worldCollide.front.splice(index, 1);
                worldCollide.back.splice(index, 1);
                worldCollide.left.splice(index, 1);
                worldCollide.right.splice(index, 1);
                worldCollide.up.splice(index, 1);
                worldCollide.down.splice(index, 1);
                if (player.gamemode == 1) {
                    scene.remove(this.mesh);
                } else {
                    worldCollide.items.push(this);
                    this.isItem = true;
                    this.mesh.scale.x /= 5;
                    this.mesh.scale.y /= 5;
                    this.mesh.scale.z /= 5;
                }
            }
        }
    }
}

function createBloc(position, cubeInfos) {
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshFaceMaterial(cubeInfos.texture);
    var bloc = new THREE.Mesh(geometry, material);
    bloc.geometry.colorsNeedUpdate = true;
    bloc.position.x = position.x * 5;
    bloc.position.y = position.y * 5 - 2.5;
    bloc.position.z = position.z * 5;
    bloc.rotation.x = position.rotx;
    bloc.rotation.y = position.roty;
    bloc.rotation.z = position.rotz;
    worldCollide.all.push(new Bloc(bloc, cubeInfos.canBeBroke, cubeInfos.timeToBreak, cubeInfos.texture, cubeInfos.breakTextures));
    worldCollide.allMesh.push(bloc);
    var box = new THREE.Box3().setFromObject(bloc);
    worldCollide.front.push({
        min: {x: box.min.x, y: box.min.y, z: box.max.z},
        max: {x: box.max.x, y: box.max.y, z: box.max.z + 1}
    });
    worldCollide.back.push({
        min: {x: box.min.x, y: box.min.y, z: box.min.z - 1},
        max: {x: box.max.x, y: box.max.y, z: box.min.z}
    });
    worldCollide.left.push({
        min: {x: box.min.x - 1, y: box.min.y, z: box.min.z},
        max: {x: box.min.x, y: box.max.y, z: box.max.z}
    });
    worldCollide.right.push({
        min: {x: box.max.x, y: box.min.y, z: box.min.z},
        max: {x: box.max.x + 1, y: box.max.y, z: box.max.z}
    });
    worldCollide.up.push({
        min: {x: box.min.x, y: box.max.y, z: box.min.z},
        max: {x: box.max.x, y: box.max.y + 1, z: box.max.z}
    });
    worldCollide.down.push({
        min: {x: box.min.x, y: box.min.y - 1, z: box.min.z},
        max: {x: box.max.x, y: box.min.y, z: box.max.z}
    });
    scene.add(bloc);
}