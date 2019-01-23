class ProducerConsumer {

    constructor(nbBuffers, nbProducers, nbConsumers) {
        this.buffers = [];
        this.entities = [];

        this.nbBuffers = nbBuffers;
        this.nbConsumers = nbConsumers;
        this.nbProducers = nbProducers;

        this.marginX = 300;
        this.marginY = 10;

        let remainingWidth = width - ((this.nbBuffers + 1) * this.marginX);
        let remainingHeight = height - 2 * this.marginY;

        this.bufferWidth = remainingWidth / this.nbBuffers;
        this.bufferHeight = remainingHeight;

        for (let i = 0; i < this.nbBuffers; i++) {
            let x = (i+1) * this.marginX + this.bufferWidth * i - this.bufferWidth / 2;
            let y = this.marginY;
            this.buffers.push(new Buffer(x, y, this.bufferWidth, this.bufferHeight , 4, 'vertical', this.nbProducers, this.nbConsumers));
        }
    }

    update() {
        for (let i = 0; i < this.buffers.length; i++) {
            let buffer = this.buffers[i]
            buffer.update();
        }
    }

    draw() {
        for (let i = 0; i < this.buffers.length; i++) {
            let buffer = this.buffers[i]
            buffer.draw();
        }
    }

}