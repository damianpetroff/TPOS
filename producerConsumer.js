let producerConsumer;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    reset(DEFAULTVALUEBUFFERQTE);
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