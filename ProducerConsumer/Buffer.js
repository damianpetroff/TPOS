class Buffer {
    constructor(x, y, width, height, size, shape, producer, consumer) {
        this.pos = createVector(x, y);
        this.dim = createVector(width, height / size);
        //this.data = Array(size);
        this.bufferCells = Array(size);

        for(let i = 0; i < this.bufferCells.length; i++)
        {
          this.bufferCells[i] = new BufferCell(0, i * this.dim.y, this.dim.x, this.dim.y, false);
        }

        this.firstFree = 0;
        this.lastFree = 0;
        this.used = 0;

        this.shape = shape;

        this.producer = producer;
        this.consumers = consumer;
    }

    // Update data ---
    add(color) {
        if (this.used >= this.bufferCells.length)
            return false;
        //this.bufferCells[this.firstFree].data = color(random(0,255), 255, 255);
        this.bufferCells[this.firstFree].data = color;
        this.firstFree = (this.firstFree + 1) % this.bufferCells.length; //
        this.used++;
        return true;
    }

    remove() {
        if (this.used <= 0)
            return false;
        this.bufferCells[this.lastFree].data = false;
        this.lastFree = (this.lastFree + 1) % this.bufferCells.length;
        this.used--;
        return true;
    }

    update() {
        if(this.producer)
            this.updateProducer();
        if(this.consumer)
            this.updateConsumer();
    }

    updateProducer()
    {
        let isTargetReached = this.producer.update();
        if(isTargetReached)
        {
            if(this.producer.holdData)
            {
                push();
                colorMode(HSB, 255);
                this.add(color(random(0,255), 255, 255));
                pop();
                // target 1
                this.producer.target = createVector(random(width), random(height));
            }
            else
            {
                // target 2
                this.producer.target = createVector(random(width), random(height));
            }
            this.producer.holdData ^= true;
        }
    }

    updateConsumer()
    {
        let isTargetReached = this.consumer.update();
        if(isTargetReached)
        {
            if(this.consumer.holdData)
            {
                this.remove();
                this.consumer.target = createVector(random(width), random(height));
            }
            else
            {
                this.consumer.target = createVector(random(width), random(height));
            }
            this.consumer.holdData ^= true;
        }
    }

    getNextPickPosition() {

    }

    draw() {
        this.drawBuffer();
        this.drawEntities();
    }

    drawEntities() {
        if(this.producer)
            this.producer.draw();
        if(this.consumer)
            this.consumer.draw();
    }

    drawBuffer() {
        push();
        translate(this.pos.x, this.pos.y);
        for (let i = 0; i < this.bufferCells.length; i++) {
            stroke(255);
            if (this.bufferCells[i].data)
                fill(this.bufferCells[i].data);
            else
                noFill();

            // draw bufferCell
            //rect(0, i * this.dim.y, this.dim.x, this.dim.y);
            this.bufferCells[i].drawBufferCell();

            noStroke();

            // draw Arrow
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
