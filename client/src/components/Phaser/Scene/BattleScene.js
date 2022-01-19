import Phaser from "phaser";
import CardManager from "../Managers/CardManager";
import AttackBox from "../GameObject/AttackBox";
import DamageCalculatorBox from "../GameObject/DamageCalculatorBox";

export default class BattleScene extends Phaser.Scene {

    constructor() {
        super('battle-scene');
        this.mapData = null;
        this.card = null;
        this.CardManager = null;
        this.AttackBox = null;
        this.DamageCalculatorBox = null;
    }

    init(data) {
        this.mapData = data.map;
        // this.mapData = 'Forest';
        this.DamageCalculatorBox = new DamageCalculatorBox(this);
        this.CardManager = new CardManager(this, this.DamageCalculatorBox);
        this.AttackBox = new AttackBox(this);
    }

    preload() {
        this.load.image('cave', "image/CaveBattle.jpg");
        this.load.image('forest', "image/ForestBattle.jpg");
        this.load.image('solider', "image/solider.png");

        // Preload our cards
        this.CardManager.preloadCards();

    }

    create() {

        // Scene selection
        switch (this.mapData) {
            case 'Forest':
                this.add.image(800, 500, 'forest');
                break;
            case 'Caves':
                this.add.image(800, 500, 'cave');
                break
            default:
                break;
        }

        // // Creete dropzone for attacking
        this.dropZone = this.AttackBox.renderZone();
        this.dropZoneOutline = this.AttackBox.renderOutline(this.dropZone);

        // Create Damage Box Calculator
        this.DamageCalculatorBox.create();

        // Card manager to deal cards onto the scene
        this.card = this.CardManager.createCard(100, 900);
        this.CardManager.createCard(300, 900);
        this.CardManager.createCard(500, 900);
        this.CardManager.createCard(700, 900);
        this.CardManager.createCard(900, 900);
    }

    update() {

    }
}