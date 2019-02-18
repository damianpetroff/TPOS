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

        let producer = null;
        let consumer = null;

        for (let i = 0; i < this.nbBuffers; i++) {
            let x = (i+1) * this.marginX + this.bufferWidth * i - this.bufferWidth / 2;
            let y = this.marginY;
            producer = new Entity(0, 0);
            this.buffers.push(new Buffer(x, y, this.bufferWidth, this.bufferHeight , 4, 'vertical', producer, consumer));
            consumer = new Entity(0, 0);
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