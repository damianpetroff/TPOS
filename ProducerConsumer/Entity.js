class Entity {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.size = 20;
        this.target = undefined;
        this.speed = 3;

        this.holdData = false;
    }

    update() {
        return this.updatePosition();
    }

    updatePosition() {
        if(this.target != undefined)
        {
            //check if the position is near the target
            if (this.pos.dist(this.target) >= this.speed) {
                let dist = p5.Vector.sub(this.target, this.pos);
                dist.normalize();
                dist.mult(this.speed);
                this.pos.add(dist);
            }
            else {
                this.pos = this.target; // set it to the target
                this.target = undefined;
                return true; //target reached
            }
        }
        else
        {
            this.target = createVector(random(width),random(height))
        }
        //Else stay still
        return false;
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