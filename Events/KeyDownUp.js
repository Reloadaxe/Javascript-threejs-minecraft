var mouseClicked = false;

window.addEventListener("keydown", function(e) {
    keydown = true;
    if (e.key == "z")
        player.moving[0] = true;
    else if (e.key == "s")
        player.moving[1] = true;
    else if (e.key == "q")
        player.moving[2] = true;
    else if (e.key == "d")
        player.moving[3] = true;
    else if (e.keyCode == 38)
        player.turning[0] = true;
    else if (e.keyCode == 40)
        player.turning[1] = true;
    else if (e.keyCode == 37)
        player.turning[2] = true;
    else if (e.keyCode == 39)
        player.turning[3] = true;
    else if (e.keyCode == 32 && !player.jumping[0] && player.colliding[5]) {
        player.jumping[0] = true;
        player.jumping[1] = true;
        player.jumpingVit = 0.6;
    } else if (e.key == "a")
        player.isBreaking = true;
});

window.addEventListener("keyup", function(e) {
    keydown = false;
    if (e.key == "z")
        player.moving[0] = false;
    else if (e.key == "s")
        player.moving[1] = false;
    else if (e.key == "q")
        player.moving[2] = false;
    else if (e.key == "d")
        player.moving[3] = false;
    else if (e.keyCode == 38)
        player.turning[0] = false;
    else if (e.keyCode == 40)
        player.turning[1] = false;
    else if (e.keyCode == 37)
        player.turning[2] = false;
    else if (e.keyCode == 39)
        player.turning[3] = false;
    else if (e.key == "a") {
        player.isBreaking = false;
        if (player.breaking[0] != undefined)
            player.breaking[0].mesh.material = player.breaking[0].baseTexture;
        player.breaking = [undefined, undefined];
    }
});