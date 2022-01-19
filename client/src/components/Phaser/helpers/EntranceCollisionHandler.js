export default class EntranceCollisionHandler {
    constructor(layer, scene) {

        this.collisionDectected = () => {
            // Collision detected causes scene change
            scene.scene.start('battle-scene', { map: layer.layer.name });
        }
    }
}