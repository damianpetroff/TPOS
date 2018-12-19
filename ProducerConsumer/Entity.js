class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
    }

    update() {
        
    }

    draw() {
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.size, this.size);
    }
}