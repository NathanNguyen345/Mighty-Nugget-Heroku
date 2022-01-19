import Cards from "../GameObject/Cards";
import CardEventHandler from "../helpers/CardEvenHandler";

export default class CardManager {

    constructor(_secne, _damageCalculator) {
        this.scene = _secne;
        this.cards = null;
        this.cardQueue = [];
        this.deckSize = 51;
        this.shuffleDeck();
        this.damageCalculator = _damageCalculator
    }

    preloadCards() {
        /**
         * This function will reload the sprite sheet into the scene
         */
        this.scene.load.spritesheet("cards", "image/cards.png", {
            frameWidth: 334,
            frameHeight: 440
        })
    }

    shuffleDeck() {
        /**
         * This function will shuffle the cards
         */

        // Randomize an array with int representing each framerate
        do {
            let randomNumber = Math.floor(Math.random() * this.deckSize) + 1

            if (!(this.cardQueue.includes(randomNumber))) {
                this.cardQueue.push(randomNumber)
            }
        } while (this.cardQueue.length < this.deckSize);
    }

    createCard(x, y) {
        /***
         * This function will create the card.
         * @param {int} x   X coordinate within the scene
         * @param {int} y   Y coordinate within the scene
         */
        let frame = this.getTopCard();

        this.cardData = new Cards(frame);
        this.cardSprite = this.scene.add.sprite(x, y, 'cards');
        this.cardSprite.setScale(.35, .35);
        this.cardSprite.setFrame(frame);
        this.cardSprite.data = 100;

        this.cardSprite.data = this.cardData;

        new CardEventHandler(this.cardSprite, this.scene, this.damageCalculator);
    }

    getTopCard() {
        /**
         * This function will return the first element within the queue.
         * @returns {int}   Random number within the queue
         */
        if (this.cardQueue.length != 0) {
            return this.cardQueue.pop();
        }
    }
}