class EdgeBuffer {
    constructor(x, y) {
        this.pos = createVector(x, y);
    }

    add(color) {
        // do nothing
    }

    pick() {
        push();
        colorMode(HSB, 255);
        let c = color(random(255), 255, 255);
        pop();
        return c;
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
