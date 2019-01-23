let producerConsumer;

function setup() {
    createCanvas(1700, 800);
    producerConsumer = new ProducerConsumer(5, 1, 1);
}

function draw() {
    background(10);
    producerConsumer.update();
    producerConsumer.draw();
}