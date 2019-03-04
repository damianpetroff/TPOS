let producerConsumer;

function setup() {
    createCanvas(screen.width-18, screen.height-10);
    producerConsumer = new ProducerConsumer(3, 1, 1);
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

function mousePressed() {
    //let fs = fullscreen();
    //fullscreen(!fs);
}
