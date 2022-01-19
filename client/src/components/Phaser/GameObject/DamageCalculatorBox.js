export default class DamageCalculatorBox {

    constructor(_scene) {
        this.scene = _scene;
        this.damageBox = null;
        this.textCounter = 0;

        this.atkPoints = 0;
        this.bonus = 0;
        this.total = 0;

        this.atkText = null;
        this.bonusText = null;
        this.totalText = null;
    }

    preload() {
    }

    create() {
        let screenCenterX = this.scene.cameras.cameras[0].worldView.x + this.scene.cameras.cameras[0].worldView.width / 2;
        let screenCenterY = this.scene.cameras.cameras[0].worldView.y + this.scene.cameras.cameras[0].worldView.height / 3;

        this.damageBox = this.scene.add.rectangle(screenCenterX, screenCenterY, 300, 75, 0x000000)
        this.damageBox.setStrokeStyle(2, 0x1a65ac);

        this.atkText = this.addTextToBox(`Atk Points: ${this.atkPoints}`);
        this.bonusText = this.addTextToBox(`Bonus     : ${this.bonus}`);
        this.totalText = this.addTextToBox(`Total     : ${this.total}`);

    }

    addTextToBox(text) {
        const tempText = this.scene.add.text(
            this.damageBox.x - this.damageBox.width / 2,
            this.damageBox.y - this.damageBox.height / 2 + (this.textCounter * 20),
            text)
            .setFontSize(20);

        this.textCounter++;

        return tempText;
    }

    addAttack(_atkPoint) {
        this.atkPoints += _atkPoint;
        this.atkText.setText(`Atk Points: ${this.atkPoints}`);
    }

    removeAttack(_atkPoints) {
        this.atkPoints -= _atkPoints;
        this.atkText.setText(`Atk Points: ${this.atkPoints}`);
    }

    setBonus() {
        this.bonusText.this.addTextToBox(`Bonus     : ${this.bonus}`);
    }

    setTotal() {
        this.totalText.this.addTextToBox(`Total     : ${this.total}`);
    }
}