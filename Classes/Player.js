function Player() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.rotation.order = "YXZ";
    this.moving = [false, false, false, false];
    this.turning = [false, false, false, false];
    this.vit = [0.5, Math.PI / 90];
    this.colliding = [false, false, false, false, false, false];
    this.camera.position.y = 7.5;
    this.falling = false;
    this.fallingVit = 0.1;
    this.jumping = [false, false];
    this.jumpingVit;
    this.breaking = [undefined, undefined];
    this.isBreaking = false;
    this.mineStrength = 5;
    this.inventory = [];
    this.gamemode = 0;

    this.fall = function() {
        this.camera.position.y -= this.fallingVit;
        if (this.fallingVit < 1)
            this.fallingVit *= 1.1;
    }

    this.jump = function() {
        if (!this.colliding[4]) {
            this.camera.position.y += this.jumpingVit;
            if (this.jumpingVit > 0.05)
                this.jumpingVit *= 0.9;
            else
                this.jumping[1] = false;
        } else {
            this.jumping[1] = false;
            this.jumpingVit = 0.05;
        }
    }

    this.break = function() {
        var selectedObject;
        var raycaster = new THREE.Raycaster();
        var lookAt = new THREE.Vector2();
        lookAt.x = 0;
        lookAt.y = 0;
        raycaster.setFromCamera(lookAt, player.camera);
        var intersects = raycaster.intersectObjects(worldCollide.allMesh, true);
        if (intersects.length > 0) {
            selectedObject = worldCollide.all[worldCollide.allMesh.indexOf(intersects[0].object)];
            if (player.breaking[0] == selectedObject) {
                selectedObject.break();
            }
            else {
                if (player.breaking[0] != undefined)
                    player.breaking[0].mesh.material = player.breaking[0].baseTexture;
                player.breaking = [selectedObject, Date.now()];
            }
        }
    }

    this.move = function() {
        if (this.moving[0]) {
            if (!this.colliding[0] && Math.cos(this.camera.rotation.y) > 0 || !this.colliding[1] && Math.cos(this.camera.rotation.y) < 0)
                this.camera.position.z -= 0.2 * Math.cos(this.camera.rotation.y);
            if (!this.colliding[3] && Math.sin(this.camera.rotation.y) > 0 || !this.colliding[2] && Math.sin(this.camera.rotation.y) < 0)
                this.camera.position.x -= 0.2 * Math.sin(this.camera.rotation.y);
        } 
        if (this.moving[1]) {
            if (!this.colliding[0] && Math.cos(this.camera.rotation.y) < 0 || !this.colliding[1] && Math.cos(this.camera.rotation.y) > 0)
                this.camera.position.z += 0.2 * Math.cos(this.camera.rotation.y);
            if (!this.colliding[3] && Math.sin(this.camera.rotation.y) < 0 || !this.colliding[2] && Math.sin(this.camera.rotation.y) > 0)
                this.camera.position.x += 0.2 * Math.sin(this.camera.rotation.y);
        }
        if (this.moving[2]) {
            if (!this.colliding[3] && Math.cos(this.camera.rotation.y) > 0 || !this.colliding[2] && Math.cos(this.camera.rotation.y) < 0)
                this.camera.position.x -= 0.2 * Math.cos(this.camera.rotation.y);
            if (!this.colliding[0] && Math.sin(this.camera.rotation.y) < 0 || !this.colliding[1] && Math.sin(this.camera.rotation.y) > 0)
                this.camera.position.z += 0.2 * Math.sin(this.camera.rotation.y);
        }
        if (this.moving[3]) {
            if (!this.colliding[3] && Math.cos(this.camera.rotation.y) < 0 || !this.colliding[2] && Math.cos(this.camera.rotation.y) > 0)
                this.camera.position.x += 0.2 * Math.cos(this.camera.rotation.y);
            if (!this.colliding[0] && Math.sin(this.camera.rotation.y) > 0 || !this.colliding[1] && Math.sin(this.camera.rotation.y) < 0)
                this.camera.position.z -= 0.2 * Math.sin(this.camera.rotation.y);
        }
        if (this.turning[0] && this.camera.rotation.x <= Math.PI / 2)
            this.camera.rotation.x += 0.05;
        if (this.turning[1] && this.camera.rotation.x >= -Math.PI / 2)
            this.camera.rotation.x -= 0.05;
        if (this.turning[2])
            this.camera.rotation.y += 0.05;
        if (this.turning[3])
            this.camera.rotation.y -= 0.05;
        if (this.jumping[1])
            this.jump();
        else if (!this.colliding[5])
            this.fall();
        if (this.isBreaking)
            this.break();
    }

    this.drawCursor = function() {
        let canvas = document.getElementById("hud");
        let context = canvas.getContext("2d");
        let image = new Image();
        image.src = "Images/CrossHair.png";
        context.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
    }

    this.drawHud = function() {
        this.drawCursor();
    }

    this.collideWorld = function() {
        var playerCollideBox = {
            min: {
                x: this.camera.position.x - 1,
                y: this.camera.position.y - 7,
                z: this.camera.position.z - 1,
            },
            max:{
                x: this.camera.position.x + 1,
                y: this.camera.position.y + 1,
                z: this.camera.position.z + 1,
            }
        };
        this.colliding = [false, false, false, false, false, false];
        worldCollide.front.forEach(cube => {
            if (collideBetween(playerCollideBox, cube))
                this.colliding[0] = true;
        });
        worldCollide.back.forEach(cube => {
            if (collideBetween(playerCollideBox, cube))
                this.colliding[1] = true;
        });
        worldCollide.left.forEach(cube => {
            if (collideBetween(playerCollideBox, cube))
                this.colliding[2] = true;
        });
        worldCollide.right.forEach(cube => {
            if (collideBetween(playerCollideBox, cube))
                this.colliding[3] = true;
        });
        playerCollideBox.max.y = this.camera.position.y;
        worldCollide.down.forEach(cube => {
            if (collideBetween(playerCollideBox, cube))
                this.colliding[4] = true;
        });
        playerCollideBox.min.y = this.camera.position.y - 7.5;
        playerCollideBox.max.y = this.camera.position.y - 5;
        worldCollide.up.forEach(cube => {
            if (collideBetween(playerCollideBox, cube)) {
                this.colliding[5] = true;
                if (!this.jumping[1]) {
                    this.jumping[0] = false;
                    this.fallingVit = 0.1;
                }
            }
        });
        playerCollideBox = {
            min: {
                x: this.camera.position.x - 5,
                y: this.camera.position.y - 8,
                z: this.camera.position.z - 5,
            },
            max:{
                x: this.camera.position.x + 5,
                y: this.camera.position.y + 2,
                z: this.camera.position.z + 5,
            }
        };
        worldCollide.items.forEach(item => {
            var itemCollideBox = new THREE.Box3().setFromObject(item.mesh);
            if (collideBetween(playerCollideBox, itemCollideBox)) {
                player.inventory.push(item);
                worldCollide.items.splice(worldCollide.items.indexOf(item), 1);
                scene.remove(item.mesh);
            }
        });
    }
}