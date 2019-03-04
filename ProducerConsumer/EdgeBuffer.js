class EdgeBuffer {
    constructor(x, y) {
        this.pos = createVector(x, y);
    }

    add(color) {
        // do nothing
    }

    pop() {
        colorMode(HSB, 255);
        return color(random(255), 255, 255);
    }

    update() {
        // do nothing
    }

    draw() {
        // do nothing
    }

    isEmpty() {
        //never empty
        return false;
    }

    isFull() {
        //never full
        return false;
    }

    getAddPosition() {
        return this.pos;
    }

    getPopPosition() {
        return this.pos;
    }
}
