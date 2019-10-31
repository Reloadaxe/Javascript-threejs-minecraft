var blocsTextures = [];

var bedrockBlocInfos = {
    texture : [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/bedrock.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/bedrock.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/bedrock.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/bedrock.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/bedrock.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/bedrock.png"), side: THREE.DoubleSide})
    ],
    canBeBroke: false,
    timeToBreak: 10000
};
var grassBlocInfos = {
    texture : [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/grassSide.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/grassSide.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/grassTop.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/dirt.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/grassSide.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/grassSide.png"), side: THREE.DoubleSide})
    ],
    canBeBroke: true,
    timeToBreak: 1
};
var stoneBlocBreaksInfos = [];
for (let i = 0; i < 10; i++) {
    stoneBlocBreaksInfos.push({
        texture : [
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/stone_break_"+i+".png"), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/stone_break_"+i+".png"), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/stone_break_"+i+".png"), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/stone_break_"+i+".png"), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/stone_break_"+i+".png"), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/stone_break_"+i+".png"), side: THREE.DoubleSide})
        ],
        canBeBroke: true,
        timeToBreak: 9
    });
}
var stoneBlocInfos = {
    texture: [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/Stone.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/Stone.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/Stone.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/Stone.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/Stone.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("Images/Stone.png"), side: THREE.DoubleSide})
    ],
    canBeBroke: true,
    timeToBreak: 9,
    breakTextures: stoneBlocBreaksInfos
};
blocsTextures.push(bedrockBlocInfos, stoneBlocInfos);