class Entity {
	constructor(id, consumerBuffer, productionBuffer, label, sync) {
		this.id = id;
		this.consumerBuffer = consumerBuffer;
		this.productionBuffer = productionBuffer;

		this.label = label;

		this.step = 0;
		this.max_steps = 100;

		this.size = min(WIDTH, HEIGHT) * 0.05;

		this.sync = sync;

		this.hasReached = false;

		this.data = false;
		if (this.id > 0) {
			this.originPosition = this.productionBuffer.getAddPosition();
			this.targetPosition = this.consumerBuffer.getPopPosition();
		} else {
			this.pick();
			this.originPosition = this.consumerBuffer.getPopPosition();
			this.targetPosition = this.productionBuffer.getAddPosition();
		}
	}

	setSpeed(s) {
		if (Number.isInteger(s) && s > 0) {
			this.percentStep = this.step / this.max_steps;
			this.max_steps = 1 / s * 500;
			this.step = this.percentStep * this.max_steps;
			return true;
		}
		return false;
	}

	preupdate() {
		this.hasReached = this.updatePosition();
	}

	update() {
		if (this.hasReached) {
			this.addPickLogic();
		}
		this.hasReached = false;
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

	syncLogic() {
		if (this.data == false) {
			if (!this.consumerBuffer.isEmpty()) {
				this.pick();
				this.originPosition = this.targetPosition;
				this.targetPosition = this.productionBuffer.getAddPosition();
			} else {
				this.step = this.max_steps; // to make it wait at near the target
			}
		} else {
			if (!this.productionBuffer.isFull()) {
				this.add();
				this.originPosition = this.targetPosition;
				this.targetPosition = this.consumerBuffer.getPopPosition();
			} else {
				this.step = this.max_steps; // to make it wait at near the target
			}
		}
	}

	asyncLogic() {
		if (this.data == false) {
			this.originPosition = this.targetPosition;
			this.targetPosition = this.productionBuffer.getAddPosition();
			if (!this.consumerBuffer.isEmpty()) {
				this.pick();
			} else {
				noLoop();
				console.log("error");
			}
		} else {
			this.add();
			this.originPosition = this.targetPosition;
			this.targetPosition = this.consumerBuffer.getPopPosition();
            if (this.productionBuffer.isFull()) {
                console.log("override");
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

		let diff = p5.Vector.sub(this.targetPosition, this.originPosition);
		diff.div(this.max_steps);
		diff.mult(this.step);
		ellipse(this.originPosition.x + diff.x, this.originPosition.y + diff.y, this.size, this.size);
		pop();
	}
}
