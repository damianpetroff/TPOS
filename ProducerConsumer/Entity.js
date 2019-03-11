class Entity {
    constructor(x, y, consumerBuffer, productionBuffer) {
        this.pos = createVector(x, y);
        this.size = 50;
        this.target = productionBuffer.getAddPosition();
        this.speed = 4;
        this.data = false;

        this.consumerBuffer = consumerBuffer;
        this.productionBuffer = productionBuffer;

        this.handleTarget();
    }

    update() {
        let hasReached = this.updatePosition();
        if (hasReached)
            this.handleTarget();
    }

    handleTarget() {
        if (this.data) {
            this.productionBuffer.add(this.data);
            this.data = false;
            this.goTo(this.consumerBuffer.getRemovePosition());
        } else {
            this.data = this.consumerBuffer.pick();
            this.goTo(this.productionBuffer.getAddPosition());
        }
    }

    updatePosition() {
        if (this.target != null) {
            //check if the position is near the target
            if (this.pos.dist(this.target) >= this.speed) {
                let dist = p5.Vector.sub(this.target, this.pos);
                dist.normalize();
                dist.mult(this.speed);
                this.pos.add(dist);
            } else {
                this.pos = this.target; // set it to the target
                return true; //target reached
            }
        }
        return false;
    }

    goTo(pos) {
        this.target = createVector(pos.x, pos.y);
    }

    draw() {
        push();
        ellipseMode(CENTER);
        if (this.data)
            fill(this.data);
        else
            fill(255);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        pop();
    }
}
