class EdgeBuffer {
    constructor(x, y) {
        this.pos = createVector(x, y);
    }

    add(color) {
        // do nothing
        let log = document.getElementById("entitiesConsumed");
        let i = document.createElement("div");
        i.className = "p-2";
        i.style.cssText = "background-color: "+color+"; width: 41px; height: 41px; border: 1px solid black; border-radius: 50%;";
        log.appendChild(i);
        log.scrollTop = log.scrollHeight;
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
