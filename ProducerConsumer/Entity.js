class Entity {
    constructor(x, y, consumerBuffer, productionBuffer, label) {
        this.label = label;
        this.pos = consumerBuffer.getPopPosition();
        this.size = min(WIDTH, HEIGHT) * 0.05;
        this.target = null;
        this.speed = DEFAULT_SPEED_ENTITY;
        this.relativeSpeed = this.speed;
        this.data = false;
        this.sync = DEFAULT_MODE_SYNC;

        this.consumerBuffer = consumerBuffer;
        this.productionBuffer = productionBuffer;

        this.handleTarget();
    }

    update() {
        this.handleTarget();
        this.updatePosition();
    }

    handleTarget() {
        let previousTarget = this.target;
        if (this.data == false) {
            this.target = this.consumerBuffer;
        } else {
            this.target = this.productionBuffer;
        }
        // if (this.target != previousTarget) {
        //     let d = p5.Vector.sub(this.target.pos, this.pos).mag();
        //     this.relativeSpeed = d * this.speed * 0.005;
        //     console.log(this.relativeSpeed);
        // }
    }

    setSync(b) {
        this.sync = b;
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
        if (d.mag() >= this.relativeSpeed) {
            d.normalize();
            d.mult(this.relativeSpeed);
            this.pos.add(d);
        }
        //has reached the target
        else {
            this.pos = createVector(targetPosition.x, targetPosition.y); // set it to the target

            if (this.sync) {
                this.syncLogic();
            } else {
                this.asyncLogic();
            }
        }
        return false;
    }

    asyncLogic() {
        if (this.data == false) {
            if (!this.consumerBuffer.isEmpty()) {
                this.pick();
            }
        } else {
            if (!this.productionBuffer.isFull()) {
                this.add();
            }
        }
    }

    syncLogic() {
        if (this.data == false) {
            if (this.consumerBuffer.isEmpty()) {
                // TODO
                // console.log("error");
                // noLoop();
            } else {
                this.pick();
            }
        } else {
            let hasOverride = this.add();
            if (hasOverride) {
                // TODO
            }
        }
    }

    add() {
        let hasOverride = this.productionBuffer.add(this.data);
        this.data = false;
        this.label.style.cssText = "background-color: white;";
        return hasOverride;
    }

    pick() {
        this.data = this.consumerBuffer.pick();
        let r = this.data.levels[0];
        let g = this.data.levels[1];
        let b = this.data.levels[2];
        this.label.style.cssText = "background-color: rgb(" + r + "," + g + "," + b + ");";
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