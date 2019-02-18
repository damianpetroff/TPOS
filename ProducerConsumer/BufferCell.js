class BufferCell
{
  constructor(x, y, dimx, dimy, data)
  {
    this.pos = createVector(x, y);
    this.dim = createVector(dimx, dimy);
    this.data = data;
  }

  drawBufferCell()
  {
    push();
    translate(this.pos.x, this.pos.y);
    rect(0, 0, this.dim.x, this.dim.y);
    pop();
  }

  add()
  {
    this.data = true;
  }

  remove()
  {
    this.data = false;
  }

  center()
  {
    let dim = this.dim;
    dim.x /= 2;
    dim.y /= 2;
    return dim;
  }
}
