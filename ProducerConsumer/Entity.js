class Entity {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.size = 20;
        this.target = createVector(0, 0);
        this.deltaMinTarget = 5;
        this.speed = 2;
    }

    update() {
        this.updatePosition();
    }

    updatePosition() {
        if (this.pos.dist(this.target) >= this.deltaMinTarget) {
            let dist = p5.Vector.sub(this.pos, this.target);
            dist.normalize();
            dist.mult(this.speed);
            this.pos.add(dist);
        }
        //Else stay still
    }

    goTo(x, y) {
        this.target = createVector(x, y);
    }

    draw() {
        ellipseMode(CENTER);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}