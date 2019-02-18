function drawRightArrow(x, y, height, width, thickness) {
    let widthTriangle = width>>1;
    beginShape();
    vertex(x+width, y+height/2);
    vertex(x+widthTriangle, y);
    vertex(x+widthTriangle, y+(height/2)-thickness);
    vertex(x, y+(height/2)-thickness);
    vertex(x, y+(height/2)+thickness);
    vertex(x+widthTriangle, y+(height/2)+thickness);
    vertex(x+widthTriangle, y+height);
    endShape();
}
function drawLeftArrow(x, y, height, width, thickness) {
    translate(x+width,y+height);
    rotate(PI);
    drawRightArrow(0, 0, height, width, thickness);
    rotate(-PI);
    translate(-x-width,-y-height);
}

function drawUpArrow(x, y, height, width, thickness) {
    translate(x+width,y);
    rotate(PI/2);
    drawRightArrow(0, 0, height, width, thickness);
    rotate(-PI/2);
    translate(-x-width,-y);
}
function drawDownArrow(x, y, height, width, thickness) {
    translate(x,y+height);
    rotate(-PI/2);
    drawRightArrow(0, 0, height, width, thickness);
    rotate(PI/2);
    translate(-x,-y-height);
}