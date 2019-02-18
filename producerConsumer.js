let producerConsumer;

function setup() {
    createCanvas(screen.width-18, screen.height-10);
    producerConsumer = new ProducerConsumer(3, 1, 1);
}

function draw() {
    background(10);
    producerConsumer.update();
    producerConsumer.draw();
}

function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
}
