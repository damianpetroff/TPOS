class Buffer {
    constructor(x, y, width, height, size, shape, nbProducers, nbConsumers) {
        this.pos = createVector(x, y);
        this.dim = createVector(width, height / size);
        this.data = Array(size);

        this.firstFree = 0;
        this.lastFree = 0;
        this.used = 0;

        this.shape = shape;

        this.producers = [];
        for (let i = 0; i < nbProducers; i++) {
            this.producers.push(new Entity(random(0, width), random(0, height)));
        }

        this.consumers = [];
        for (let i = 0; i < nbConsumers; i++) {
            this.consumers.push(new Entity(random(0, width), random(0, height)));
        }

        this.entities = this.consumers.slice().concat(this.producers); // merge both array in a new one
    }

    add() {
        if (this.used >= this.data.length)
            return false;
        this.data[this.firstFree] = color(random(0, 255));
        this.firstFree = (this.firstFree + 1) % this.data.length;
        this.used++;
        return true;
    }

    remove() {
        if (this.used <= 0)
            return false;
        this.data[this.lastFree] = false;
        this.lastFree = (this.lastFree + 1) % this.data.length;
        this.used--;
        return true;
    }

    update() {
        for (let i = 0; i < this.producers.length; i++) {
            let producer = this.producers[i];
            let isTargetReached = producer.update();
            if(isTargetReached)
            {
                if(producer.holdData)
                {
                    this.add();
                    // target 1
                    producer.target = createVector(random(width), random(height));
                }
                else
                {
                    // target 2
                    producer.target = createVector(random(width), random(height));
                }
                producer.holdData ^= true;
            }
        }
        for (let i = 0; i < this.consumers.length; i++) {
            let consumer = this.consumers[i];
            let isTargetReached = consumer.update();
            if(isTargetReached)
            {
                if(consumer.holdData)
                {
                    this.remove();
                    consumer.target = createVector(random(width), random(height));
                }
                else
                {
                    consumer.target = createVector(random(width), random(height));
                }
                consumer.holdData ^= true;
            }
        }
    }

    getNextPickPosition() {

    }

    draw() {
        this.drawBuffer();
        this.drawEntities();
    }

    drawEntities() {
        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            entity.draw();
        }
    }

    drawBuffer() {
        push();
        translate(this.pos.x, this.pos.y);
        for (let i = 0; i < this.data.length; i++) {
            stroke(255);
            if (this.data[i])
                fill(127);
            else
                noFill();

            rect(0, i * this.dim.y, this.dim.x, this.dim.y);

            noStroke();

            let height = 5;

            let xArrow = this.dim.x + 5;
            let yArrow = i * this.dim.y + this.dim.y / 2;
            let heightArrow = 15;
            let widthArrow = 30;
            let thicknessArrow = 5;

            if (i == this.firstFree) {
                fill(0, 255, 0);
                drawArrow(xArrow, yArrow, heightArrow, widthArrow, thicknessArrow);
                xArrow += widthArrow + widthArrow * 0.3;
            }
            if (i == this.lastFree) {
                fill(255, 0, 0);
                drawArrow(xArrow, yArrow, heightArrow, widthArrow, thicknessArrow);
            }
        }
        pop();
    }


}