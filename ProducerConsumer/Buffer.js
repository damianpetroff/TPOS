class Buffer {
    constructor(x, y, width, height, size, shape, nbProducers, nbConsumers) {
        this.pos = createVector(x, y);
        this.dim = createVector(width, height / size);
        //this.data = Array(size);
        this.bufferCells = Array(size);

        for(let i=0; i<this.bufferCells.length; i++)
        {
          this.bufferCells[i] = new BufferCell(0, i * this.dim.y, this.dim.x, this.dim.y, false);
        }

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
    // ---

    update() {
        for (let i = 0; i < this.producers.length; i++) {
            let producer = this.producers[i];
            let isTargetReached = producer.update();
            if(isTargetReached)
            {
                if(producer.holdData)
                {
                    push();
                    colorMode(HSB, 255);
                    this.add(color(random(0,255), 255, 255));
                    pop();
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

            
            let heightArrow = 30;
            let widthArrow = 30;
            let thicknessArrow = 5;

            let xArrow = 0;
            let yArrow = i * this.dim.y + this.dim.y/2 - heightArrow/2;
            if (i == this.firstFree) {
                fill(0, 255, 0);
                drawRightArrow(xArrow, yArrow, heightArrow, widthArrow, thicknessArrow);
            }
            if (i == this.lastFree) {
                fill(255, 0, 0);
                drawRightArrow(xArrow+this.dim.x-widthArrow, yArrow, heightArrow, widthArrow, thicknessArrow);
            }
        }
        pop();
    }


}
