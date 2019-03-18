class ProducerConsumer {

    constructor(nbBuffers, bufferSize, entitiesLabels) {
        this.buffers = [];
        this.entities = [];

        this.nbBuffers = nbBuffers;

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
            this.entities.push(new Entity(consumerBuffer.pos.x, consumerBuffer.pos.y, consumerBuffer, producerBuffer, entitiesLabels[i]));
        }
    }

    update() {
        for (let i = 0; i < this.buffers.length; i++) {
            let buffer = this.buffers[i]
            buffer.update();
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

    setSync(b){
        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i]
            entity.setSync(b);
        }
    }

}