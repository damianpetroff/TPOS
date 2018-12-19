let buffers = [];
let entities = [];

let NB_BUFFERS = 1;

let NB_CONSUMER = 2;
let NB_PRODUCER = 2;

function setup() {
    createCanvas(600, 600);

    for (let i = 0; i < NB_BUFFERS; i++) {
        buffers.push(new CircularBuffer(i*10, i*10));
    }

    for (let i = 0; i < NB_CONSUMER; i++) {
        entities.push(new Consumer(10, 10));
    }

    for (let i = 0; i < NB_PRODUCER; i++) {
        entities.push(new Producer(10, 10));
    }
}

function draw() {
    background(10);

    for (let i = 0; i < entities.length; i++) {
        let entity = entities[i]
        entity.update();
    }

    for (let i = 0; i < buffers.length; i++) {
        let buffer = buffers[i]
        buffer.update();
    }

    for (let i = 0; i < buffers.length; i++) {
        let buffer = buffers[i]
        buffer.draw();
    }

    for (let i = 0; i < entities.length; i++) {
        let entity = entities[i]
        entity.draw();
    }

}