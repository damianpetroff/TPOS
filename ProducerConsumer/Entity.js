class Entity {
    constructor(x, y, consumerBuffer, productionBuffer) {
        this.pos = consumerBuffer.getPopPosition();
        this.size = min(WIDTH, HEIGHT) * 0.05;
        this.target = null;
        this.speed = 5;
        this.data = false;

        this.consumerBuffer = consumerBuffer;
        this.productionBuffer = productionBuffer;

        this.handleTarget();
    }

    update() {
        this.handleTarget();
        this.updatePosition();
    }

    handleTarget() {
        if (this.data == false && !this.consumerBuffer.isEmpty()) {
            this.target = this.consumerBuffer;
        } else if (this.data != false && !this.productionBuffer.isFull()) {
            this.target = this.productionBuffer;
        } else {
            this.target = null;
        }
    }

    updatePosition() {
        if (this.target == null)
            return false;

        let targetPosition = null;
        if (this.target == this.consumerBuffer) {
            targetPosition = this.target.getPopPosition();
        } else if (this.target == this.productionBuffer) {
            targetPosition = this.target.getAddPosition();
        }

        let d = p5.Vector.sub(targetPosition, this.pos);

        //must go to the target
        if (d.mag() >= this.speed) {
            d.normalize();
            d.mult(this.speed);
            this.pos.add(d);
        }
        //has reached the target
        else {
            this.pos = createVector(targetPosition.x, targetPosition.y); // set it to the target

            if (this.data == false) {
                this.data = this.consumerBuffer.pop();
            } else {
                this.productionBuffer.add(this.data);
                this.data = false;
            }
        }

        return false;
    }

    draw() {
        push();
        ellipseMode(CENTER);
        if (this.data) {
            fill(this.data);
        } else {
            fill(255);
        }
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        pop();
    }
}
