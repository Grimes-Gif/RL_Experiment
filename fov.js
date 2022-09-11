class FOV {

  constructor(numRays=3, length, car) {
    this.numRays = numRays;
    this.castAngle = Math.PI / 4;
    this.length = length;
    this.car = car;
    this.rays = [];
  }

  update() {
    this.#castRays();
  }

  #castRays() {
    this.rays = [];

    for (let i = 0; i < this.numRays; i++) {
      const rayAngle = linearInterpolation(this.castAngle/2, -this.castAngle/2, i/(this.numRays-1)) + this.car.angle;
      const start = {x:this.car.x, y:this.car.y};
      const end = {
        x:this.car.x - Math.sin(rayAngle)*this.length,
        y:this.car.y - Math.cos(rayAngle)*this.length
      }

      this.rays.push([start, end])
    }
  }

  findIntersection() {

  }

  draw(ctx) {
    for (let i = 0; i < this.numRays; i++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.stroke();
    }
  }


}
