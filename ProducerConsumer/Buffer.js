class Buffer {
    constructor(x, y, width, height, size, shape) {
        this.pos = createVector(x, y);
        this.dim = createVector(width, height);
        this.cellDim = createVector(width, height / size);

        this.data = Array(size);

        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = false;
        }

        this.firstFree = 0;
        this.lastFree = 0;
        this.used = 0;

        this.shape = shape;
    }

    // Update data ---
    add(color) {
        if (this.used >= this.data.length)
            return false;
        this.data[this.firstFree] = color;
        this.firstFree = (this.firstFree + 1) % this.data.length; //
        this.used++;
        return true;
    }

    pop() {
        if (this.used <= 0)
            return false;
        let data = this.data[this.lastFree];
        this.data[this.lastFree] = false;
        this.lastFree = (this.lastFree + 1) % this.data.length;
        this.used--;
        return data;
    }

    isEmpty() {
        return this.used <= 0;
    }

    isFull() {
        return this.used >= this.data.length;
    }

    getAddPosition() {
        let posX = this.pos.x;
        let posY = this.pos.y + this.firstFree * this.cellDim.y + this.cellDim.y / 2;
        return createVector(posX, posY);
    }

    getPopPosition() {
        let posX = this.pos.x + this.dim.x;
        let posY = this.pos.y + this.lastFree * this.cellDim.y + this.cellDim.y / 2;
        return createVector(posX, posY);
    }

    update() {}

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        for (let i = 0; i < this.data.length; i++) {

            if(this.data[i])
                fill(this.data[i]);
            else
                noFill();
            rect(0, this.cellDim.y * i, this.cellDim.x, this.cellDim.y);

            // draw Arrow
            let height = 5;


            let heightArrow = 30;
            let widthArrow = 30;
            let thicknessArrow = 5;

            let xArrow = 0;
            let yArrow = i * this.dim.y + this.dim.y/2 - heightArrow/2;
            if (i == this.firstFree) {
                fill(0, 255, 0);
                drawRightArrow(xArrow, yArrow, heightArrow, widthArrow, thicknessArrow);
            }
            if (i == this.lastFree) {
                fill(255, 0, 0);
                drawRightArrow(xArrow+this.dim.x-widthArrow, yArrow, heightArrow, widthArrow, thicknessArrow);
            }
        }
        pop();
    }


}
