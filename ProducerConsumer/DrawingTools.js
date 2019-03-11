function drawArrow(x, y, height, width, thickness, angle=0) {
    push();
    let widthTriangle = width >> 1;
    //to fix if useful
    // rotate(angle); //angle in radians
    beginShape();
    vertex(x + width, y + height / 2);
    vertex(x + widthTriangle, y);
    vertex(x + widthTriangle, y + (height / 2) - thickness);
    vertex(x, y + (height / 2) - thickness);
    vertex(x, y + (height / 2) + thickness);
    vertex(x + widthTriangle, y + (height / 2) + thickness);
    vertex(x + widthTriangle, y + height);
    endShape();
    pop();
}