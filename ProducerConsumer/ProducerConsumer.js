class ProducerConsumer {

	constructor(nbBuffers, bufferSize, entitiesLabels, sync) {
		this.buffers = [];
		this.entities = [];

		this.nbBuffers = nbBuffers;
		this.sync = sync;

		if (!sync && nbBuffers > 1) {
			console.error("invalid ProducerConsumer, nbBuffers can't be > 1 in async mode");
		}

		let marginY = HEIGHT * 0.1;
		let nbCols = 2 * this.nbBuffers + 1;
		let colWidth = WIDTH / nbCols;

		let bufferHeight = HEIGHT - 2 * marginY;

		this.buffers.push(new EdgeBuffer(0, HEIGHT / 2));
		for (let i = 0; i < this.nbBuffers; i++) {
			let x = (2 * i + 1) * colWidth;
			let y = marginY;
			this.buffers.push(new Buffer(x, y, colWidth, bufferHeight, bufferSize));
		}
		this.buffers.push(new EdgeBuffer(WIDTH, HEIGHT / 2));

		for (let i = 0; i < this.nbBuffers + 1; i++) {
			let consumerBuffer = this.buffers[i];
			let producerBuffer = this.buffers[i + 1];
			this.entities.push(new Entity(i, consumerBuffer, producerBuffer, entitiesLabels[i], sync));
		}
	}

	update() {
		for (let i = 0; i < this.buffers.length; i++) {
			let buffer = this.buffers[i]
			buffer.update();
		}

		for (let i = 0; i < this.entities.length; i++) {
			let entity = this.entities[i]
			entity.preupdate();
		}
		for (let i = 0; i < this.entities.length; i++) {
			let entity = this.entities[i]
			entity.update();
		}
	}

	draw() {
		for (let i = 0; i < this.buffers.length; i++) {
			let buffer = this.buffers[i]
			buffer.draw();
		}

		for (let i = 0; i < this.entities.length; i++) {
			let entity = this.entities[i]
			entity.draw();
		}
	}
}
