let canvas = document.getElementsByTagName("canvas")[0];
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
canvas.onclick = function() {
    canvas.requestPointerLock();
};

function unlockMouse() {
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
    document.exitPointerLock();
}