class Entity {
    constructor(consumerBuffer, productionBuffer, label) {
        this.consumerBuffer = consumerBuffer;
        this.productionBuffer = productionBuffer;

        this.label = label;

        this.step = 0;
        this.max_steps = 100;

        this.size = min(WIDTH, HEIGHT) * 0.05;

        this.origin = this.consumerBuffer;
        this.target = this.productionBuffer;

        this.data = false;
        this.sync = DEFAULT_MODE_SYNC;


        this.handleTarget();
    }

    update() {
        this.handleTarget();
        let hasReached = this.updatePosition();
        if (hasReached) {
            this.addPickLogic();
        }
    }

    handleTarget() {
        if (this.data == false) {
            this.origin = this.productionBuffer;
            this.target = this.consumerBuffer;
        } else {
            this.origin = this.consumerBuffer;
            this.target = this.productionBuffer;
        }
    }

    setSync(b) {
        this.sync = b;
    }

    updatePosition() {
        this.step += 1;
        //has reached the target
        if (this.step >= this.max_steps) {
            this.step = 0;
            return true;
        }
        return false;
    }

    addPickLogic() {
        if (this.sync) {
            this.syncLogic();
        } else {
            this.asyncLogic();
        }
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

        let targetPosition;
        let originPosition;
        if (this.target == this.consumerBuffer) {
            targetPosition = this.target.getPopPosition();
            originPosition = this.origin.getAddPosition();
        } else {
            targetPosition = this.target.getAddPosition();
            originPosition = this.origin.getPopPosition();
        }

        let diff = p5.Vector.sub(targetPosition, originPosition);
        diff.div(this.max_steps);
        diff.mult(this.step);
        ellipse(originPosition.x + diff.x, originPosition.y + diff.y, this.size, this.size);
        pop();
    }
}