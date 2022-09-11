
class Road {

  constructor(x, width, numLanes=3) {
    this.x = x;
    this.width = width;
    this.numLanes = numLanes;

    this.leftBorder = x - (width / 2);
    this.rightBorder = x + (width / 2);

    const inf = 100000;
    this.top = -inf
    this.bottom = inf

  }

  /*
  Index of the lane, zero aligned
  */
  getCenterLanes(index) {
    if (index >= this.numLanes) {
      index %= this.numLanes
    }

    const laneWidth = this.width / this.numLanes;
    let reference_center = this.leftBorder + (laneWidth / 2);
    //reference_center = this.rightBorder - (laneWidth / 2);
    //return reference_center - (index * laneWidth)
    return reference_center + (index * laneWidth);
  }

  draw(ctx) {

    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    for (let i = 0; i <= this.numLanes; i++) {
      const x = linearInterpolation(this.leftBorder, this.rightBorder, i / this.numLanes);

      if (i > 0 && i < this.numLanes) {
        ctx.setLineDash([20, 20])
      } else {
        ctx.setLineDash([])
      }

      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();

    }
  }
}



//TODO: map class, random intersection generator, off-road, road rules
class Intersection {

  constructor() {

  }

}
