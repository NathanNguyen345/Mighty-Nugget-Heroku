export default class Player {
    constructor(scene) {
        this.speed = 500;

        this.preLoadAsset = () => {
            scene.load.spritesheet('char', "image/spritesheet.png", {
                frameWidth: 50,
                frameHeight: 85
            });
        }

        this.createAsset = () => {
            this.player = scene.physics.add.sprite(1600, 300, 'char');
            scene.anims.create({
                key: 'down',
                frames: scene.anims.generateFrameNumbers('char', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            })
            scene.anims.create({
                key: 'left',
                frames: scene.anims.generateFrameNumbers('char', { start: 3, end: 5 }),
                frameRate: 10,
                repeat: -1
            })
            scene.anims.create({
                key: 'right',
                frames: scene.anims.generateFrameNumbers('char', { start: 6, end: 8 }),
                frameRate: 10,
                repeat: -1
            })
            scene.anims.create({
                key: 'up',
                frames: scene.anims.generateFrameNumbers('char', { start: 9, end: 12 }),
                frameRate: 10,
                repeat: -1
            })
        }

        this.updateAssets = () => {
            const cursors = scene.input.keyboard.createCursorKeys();
            if (cursors.left.isDown) {
                this.player.anims.play('left', true);
                this.player.setVelocityX(-this.speed)
            } else if (cursors.right.isDown) {
                this.player.anims.play('right', true);
                this.player.setVelocityX(this.speed)
            } else if (cursors.up.isDown) {
                this.player.anims.play('up', true);
                this.player.setVelocityY(-this.speed)
            } else if (cursors.down.isDown) {
                this.player.anims.play('down', true);
                this.player.setVelocityY(this.speed)
            } else {
                this.player.anims.stop();
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
            }
        }
    }
}