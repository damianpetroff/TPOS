function drawArrow(x, y, height, width, thickness) {
    let widthTriangle = width>>1;
    beginShape();
    vertex(x, y);
    vertex(x+widthTriangle, y-height);
    vertex(x+widthTriangle, y-thickness);
    vertex(x+width, y-thickness);
    vertex(x+width, y+thickness);
    vertex(x+widthTriangle, y+thickness);
    vertex(x+widthTriangle, y+height);
    endShape();
}