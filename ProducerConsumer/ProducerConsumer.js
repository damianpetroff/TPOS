class ProducerConsumer {

    constructor(nbBuffers) {
        this.buffers = [];
        this.entities = [];

        this.nbBuffers = nbBuffers;

        this.marginX = 300;
        this.marginY = 10;

        let remainingWidth = width - ((this.nbBuffers + 1) * this.marginX);
        let remainingHeight = height - 2 * this.marginY;

        this.bufferWidth = remainingWidth / this.nbBuffers;
        this.bufferHeight = remainingHeight;

        this.buffers.push(new EdgeBuffer(0, HEIGHT / 2));
        for (let i = 0; i < this.nbBuffers; i++) {
            let x = (i + 1) * this.marginX + this.bufferWidth * i;
            let y = this.marginY;
            this.buffers.push(new Buffer(x, y, this.bufferWidth, this.bufferHeight, 4, 'vertical'));
        }
        this.buffers.push(new EdgeBuffer(WIDTH, HEIGHT / 2));


        for (let i = 0; i < this.nbBuffers + 1; i++) {
            let consumerBuffer = this.buffers[i];
            let producerBuffer = this.buffers[i + 1];
            this.entities.push(new Entity(consumerBuffer.pos.x, consumerBuffer.pos.y, consumerBuffer, producerBuffer));
        }

        this.entities[0].debug = true;
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

}