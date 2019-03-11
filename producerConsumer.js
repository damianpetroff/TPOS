let producerConsumer;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    producerConsumer = new ProducerConsumer(3, 1, 1);
    reset(DEFAULT_VALUE_BUFFER_QTE);
}

function reset(nbBuffers)
{
    producerConsumer = new ProducerConsumer(nbBuffers, 1, 1);
}

function draw() {
    background(42);
    producerConsumer.update();
    producerConsumer.draw();
}

function mousePressed() {
    //let fs = fullscreen();
    //fullscreen(!fs);
}
