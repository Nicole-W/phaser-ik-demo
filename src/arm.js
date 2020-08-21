let armLength = 96;

class Arm extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {

        let upperarm = scene.add.sprite(0, 0, 'upperarm');
        let forearm = scene.add.sprite(48, 0, 'forearm');

        upperarm.setOrigin(9 / upperarm.width, 9 / upperarm.height);
        forearm.setOrigin(6 / forearm.width, 9 / forearm.height);

        armLength = upperarm.width + forearm.width - 9 - 6;

        super(scene, x, y, [upperarm, forearm]);

        this.upperarm = upperarm;
        this.forearm = forearm;
    }

    preUpdate() {
        let game = this.scene.game;

        let distance = Phaser.Math.Distance.Between(this.x, this.y, game.input.activePointer.x, game.input.activePointer.y);
        let angle = Phaser.Math.Angle.Between(this.x, this.y, game.input.activePointer.x, game.input.activePointer.y)

        distance = Math.min(distance, armLength);

        let upperLen = this.upperarm.width - 9;
        let foreLen = this.forearm.width - 6;

        let first = Math.acos((upperLen * upperLen + distance * distance - foreLen * foreLen) / (2 * upperLen * distance));
        let second = Math.acos((upperLen * upperLen + foreLen * foreLen - distance * distance) / (2 * upperLen * foreLen));

        this.rotation = angle + first;
        this.forearm.rotation = second + Math.PI;
    }
}

Phaser.GameObjects.GameObjectFactory.register('arm', function (x, y) {
    const arm = new Arm(this.scene, x, y)

    this.displayList.add(arm)
    this.updateList.add(arm)

    return arm
});