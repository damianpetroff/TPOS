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

    getAddPosition() {
        return this.pos;
    }

    getRemovePosition() {
        return this.pos;
    }
}
