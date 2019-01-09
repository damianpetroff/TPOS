class ProducerConsumer {

    constructor(nbBuffers, nbProducer, nbConsumer) {
        this.buffers = [];
        this.entities = [];

        this.nbBuffers = nbBuffers;
        this.nbConsumer = nbConsumer;
        this.nbProducer = nbProducer;

        for (let i = 0; i < this.nbBuffers; i++) {
            this.buffers.push(new CircularBuffer(20, 10, 50, 100, 4, 'vertical'));
        }


        for (let i = 0; i < this.nbProducer; i++) {
            this.entities.push(new Producer(random(0, width), random(0, height)));
        }

        for (let i = 0; i < this.nbConsumer; i++) {
            this.entities.push(new Consumer(random(0, width), random(0, height)));
        }

        this.entities[0].goTo(100, 100);
        this.entities[0].holdData = true;
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