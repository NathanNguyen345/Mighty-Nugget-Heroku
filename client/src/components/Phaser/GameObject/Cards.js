const SPADE = "heart";
const HEART = "heart";
const CLUB = "club";
const DIAMOND = 'diamond';
const RED = 'red';
const BLACK = "black";

export default class Cards {

    constructor(_frame) {
        this.frame = _frame;
        this.cardNumber = null;
        this.cardShape = null;
        this.cardColor = null;
        this.cardIndex = null;

        this.setCardAttributes();
    }

    setCardAttributes() {
        if (this.frame >= 0 && this.frame < 13) {
            this.cardShape = SPADE;
            this.cardColor = BLACK;
        } else if (this.frame >= 13 && this.frame < 26) {
            this.cardShape = CLUB;
            this.cardColor = BLACK;
        } else if (this.frame >= 26 && this.frame < 39) {
            this.cardShape = DIAMOND;
            this.cardColor = RED;
        } else {
            this.cardShape = HEART;
            this.cardColor = RED;
        };

        this.cardIndex = -1;

        this.cardNumber = (this.frame % 13) + 1;
    }

    update(frame) {
        this.cards.setFrame(frame)
    }
}