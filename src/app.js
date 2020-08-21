import './arm.js';
var config = {
    type: Phaser.AUTO,
    width: Math.ceil(window.innerWidth * 0.25),
    height: Math.ceil(window.innerHeight * 0.25),
    pixelArt: true,
    zoom: 4,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

function preload() {
    this.load.image('smiley', 'asset/smiley.png');
    this.load.image('upperarm', 'asset/upperarm.png');
    this.load.image('forearm', 'asset/forearm.png');
}

let smiley;
let arms = [];
var game = new Phaser.Game(config);
window.game = game;
function create() {
    this.cameras.main.backgroundColor = new Phaser.Display.Color(127, 127, 127)

    let centerX = this.cameras.main.centerX;
    let centerY = this.cameras.main.centerY;

    let total = 10;

    for (let i = 0; i < total; ++i) {
        let n = 1 - (i / total);
        let r = Math.PI * 2 * n;
        let d = 100;
        let arm = this.add.arm(centerX + Math.cos(r) * d, centerY + Math.sin(r) * d);
        arms.push(arm);
    }

    smiley = this.add.sprite(20, 20, 'smiley');
}


function update() {
    smiley.rotation += 0.01;

    smiley.x = game.input.mousePointer.x;
    smiley.y = game.input.mousePointer.y;

    let centerX = this.cameras.main.centerX;
    let centerY = this.cameras.main.centerY;

    for (let i in arms) {
        let n = 1 - (i / arms.length);
        let r = Math.PI * 2 * n + performance.now() * 0.001;
        let d = 100;

        arms[i].setPosition(centerX + Math.cos(r) * d, centerY + Math.sin(r) * d);
    }
}