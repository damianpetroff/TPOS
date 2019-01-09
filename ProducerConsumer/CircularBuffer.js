class CircularBuffer {
    constructor(x, y, width, height, size, shape) {
        this.pos = createVector(x, y);
        this.dim = createVector(width, height);
        this.data = Array(size);

        this.firstFree = 0;
        this.lastFree = 0;
        this.used = 0;

        this.shape = shape;
    }

    add() {
        if (this.used >= this.data.length)
            return false;
        this.data[this.firstFree] = color(random(0, 255));
        this.firstFree = (this.firstFree + 1) % this.data.length;
        this.used++;
        return true;
    }

    remove() {
        if (this.used <= 0)
            return false;
        this.data[this.lastFree] = false;
        this.lastFree = (this.lastFree + 1) % this.data.length;
        this.used--;
        return true;
    }

    update() {

    }

    getNextPickPosition() {

    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        for (let i = 0; i < this.data.length; i++) {
            stroke(255);
            if (this.data[i])
                fill(127);
            else
                noFill();

            rect(0, i * this.dim.y, this.dim.x, this.dim.y);

            noStroke();

            let height = 5;

            let xArrow = this.dim.x + 5;
            let yArrow = i * this.dim.y + this.dim.y / 2;
            let heightArrow = 15;
            let widthArrow = 30;
            let thicknessArrow = 5;

            if (i == this.firstFree) {
                fill(0, 255, 0);
                drawArrow(xArrow, yArrow, heightArrow, widthArrow, thicknessArrow);
                xArrow += widthArrow + widthArrow * 0.3;
            }
            if (i == this.lastFree) {
                fill(255, 0, 0);
                drawArrow(xArrow, yArrow, heightArrow, widthArrow, thicknessArrow);
            }
        }
        pop();
    }


}