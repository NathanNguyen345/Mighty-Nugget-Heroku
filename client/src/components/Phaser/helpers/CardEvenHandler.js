export default class CardEventHandler {
    constructor(_card, _scene, _damageCalculator) {
        this.card = _card;
        this.scene = _scene;
        this.clicked = false;
        this.dropped = false;
        this.startX = this.card.x - 20;
        this.startY = this.card.y - 20;
        this.card.setInteractive({ draggable: true });
        this.card.setInteractive().on('pointerover', this.mouseOverHandler, this)
        this.card.setInteractive().on('pointerout', this.mouseOutHandler, this);
        this.card.setInteractive().on('dragstart', this.dragStart, this);
        this.card.setInteractive().on('drag', this.dragCard, this);
        this.card.setInteractive().on('drop', this.dropCard, this);
        this.damageCalculator = _damageCalculator;
    }

    mouseOverHandler() {
        /***
         * Mouse hover will lift up card
         */
        this.card.y -= 20;
    }

    mouseOutHandler() {
        /***
         * Mouse exit wil ldrop card back to original spot
         */
        if (!this.clicked) {
            this.card.y += 20;
        }
        this.clicked = false;
    }

    dragStart() {
        /***
         * This function will start the drag event listener
         */
        this.card.setTint(0xff69b4);
        this.card.depth = 100;
        this.card.setInteractive().on('dragend', this.dragEnd, this);

        // Check to see if card has already been dropped
        if (this.dropped) {
            this.dropped = false;

            // Remove card from damage calculator
            delete this.scene.dropZone.data.values.cardData[this.card.data.cardIndex];
            this.damageCalculator.removeAttack(this.card.data.cardNumber);
        }
    }

    dragCard(pointer, dragX, dragY) {
        /***
         * This function will change the sprite x,y cords with the current 
         * drag corrdinates
         */
        this.card.x = dragX;
        this.card.y = dragY;
        this.clicked = true;
    }

    dragEnd() {
        /***
         * This function will be called when endding the drag. It will check to
         * see if the drop sprite is within the drop zone.
         */
        this.card.setTint();
        this.card.depth = 10

        if (!this.dropped) {
            this.card.x = this.startX + 20;
            this.card.y = this.startY + 20;
        }
    }

    dropCard(pointer, dropZone) {
        /***
         * This function increments the dropzone counter and set the trigger on
         * the sprite to be dropped.
         */
        if (Object.keys(dropZone.data.values.cardData).length < 3) {
            this.card.data.cardIndex = dropZone.data.values.cards
            dropZone.data.values.cards++
            dropZone.data.values.cardData[dropZone.data.values.cards] = this.card.data;
            this.card.x = (dropZone.x - 350) + (dropZone.data.values.cards * 150);
            this.card.y = dropZone.y;
            this.dropped = true;

            this.damageCalculator.addAttack(this.card.data.cardNumber);
        }
    }
}