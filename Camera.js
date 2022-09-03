class Camera {

  constructor(fixed=false) {
    this.fixed = fixed;
  }

  update(ctx, position_x, position_y) {
    ctx.save();
    ctx.translate(position_x, position_y);
  }

}
