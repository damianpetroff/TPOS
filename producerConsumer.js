let producerConsumer;

function setup() {
    createCanvas(1700, 800);
    producerConsumer = new ProducerConsumer(1, 10, 10);
}

function draw() {
    background(10);
    producerConsumer.update();
    producerConsumer.draw();
}