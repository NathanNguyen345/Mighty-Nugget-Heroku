import Phaser from 'phaser';
import tileSet from '../../../assets/image/spritesheet_tiles.png';
import tileSetJson from '../../../assets/json/WorldMap.json';
import Player from '../GameObject/Player';
import EntranceCollisionHandler from '../helpers/EntranceCollisionHandler';

const PIER_INDEX = 8;
const FOREST_INDEX = 19;
const CAVE_INDEX = 41;

export default class WorldScene extends Phaser.Scene {

    constructor() {
        super('world-scene');
        this.Player = new Player(this);
    }

    preload() {
        // Load spritesheet and json
        this.load.image('tiles', tileSet);
        this.load.tilemapTiledJSON('tilemap', tileSetJson);

        // Preload Player
        this.Player.preLoadAsset();
    }

    create() {
        // create the layers of our tiles
        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('spritesheet_tiles', 'tiles');

        const grassLayer = map.createLayer('Grass', tileset, 0, 0);
        const waterLayer = map.createLayer('Water', tileset, 0, 0);
        const forestLayer = map.createLayer('Forest', tileset, 0, 0);
        const caveLayer = map.createLayer('Caves', tileset, 0, 0);
        const pierLayer = map.createLayer('Piers', tileset, 0, 0);

        // Scale down map and set left top corner
        map.scene.cameras.cameras[0].zoom = .5;
        map.scene.cameras.cameras[0].originX = 0;
        map.scene.cameras.cameras[0].originY = 0;

        this.Player.createAsset();

        // Set Collisions
        this.physics.add.collider(this.Player.player, waterLayer);
        waterLayer.setCollisionBetween(88, 89);
        this.physics.add.collider(this.Player.player, forestLayer, new EntranceCollisionHandler(forestLayer, this).collisionDectected);
        forestLayer.setCollisionBetween(FOREST_INDEX, FOREST_INDEX);
        this.physics.add.collider(this.Player.player, caveLayer, new EntranceCollisionHandler(caveLayer, this).collisionDectected);
        caveLayer.setCollisionBetween(CAVE_INDEX, CAVE_INDEX);
        this.physics.add.collider(this.Player.player, pierLayer, new EntranceCollisionHandler(pierLayer, this).collisionDectected);
        pierLayer.setCollisionBetween(PIER_INDEX, PIER_INDEX);
    }

    update() {
        this.Player.updateAssets();
    }

}

