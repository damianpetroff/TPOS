class Entity {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.size = 20;
        this.target = undefined;
        this.distMinToTarget = 1;
        this.speed = 2;

        this.holdData = false;
    }

    update() {
        this.updatePosition();
    }

    updatePosition() {
        if(this.target != undefined)
        {
            if (this.pos.dist(this.target) >= this.distMinToTarget) {
                let dist = p5.Vector.sub(this.target, this.pos);
                dist.normalize();
                dist.mult(this.speed);
                this.pos.add(dist);
            }
            else {
                this.target = undefined;
            }
        }
        //Else stay still
    }

    goTo(x, y) {
        this.target = createVector(x, y);
    }

    draw() {
        push();
        ellipseMode(CENTER);
        if(this.holdData)
            fill(127);
        else
            fill(255);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        pop();
    }
}