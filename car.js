/*
Defines the car in the carsim
*/
class Car {

  //Get values necessary to draw the car
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width
    this.height = height

    //Create physical constraints for the car
    this.speed = 0;
    this.acceleration = 0.1;
    this.maxSpeed = 2.5;
    this.friction = 0.03;
    this.angle = 0;
    this.turningSpeed = .003;

    this.controls = new Controls();
    this.fov = new FOV(30, 100, this);
  }

  //update the state of the car
  update() {
    this.#moveCar();
    this.fov.update()
  }

  //movement logic
  #moveCar() {

    //Allow the car to move forward and backwards
    if (this.controls.forward) {
      if (this.speed > this.maxSpeed) {
        this.speed = this.maxSpeed;
      }  else {
        this.speed += this.acceleration;
      }
    } else if (this.controls.reverse) {
      if (this.speed < -this.maxSpeed/2) {
        this.speed = -this.maxSpeed/2;
      } else {
        this.speed -= this.acceleration;
      }
    }

    //car should not turn while standing still
    if (this.speed != 0) {

      //flip controls when backingup
      const flip = this.speed > 0 ? 1:-1;

      //Cars dont move horizontally, they turn, so add angular movement
      if (this.controls.left) {
        this.angle += this.turningSpeed * flip;
      } else if (this.controls.right) {
        this.angle -= this.turningSpeed * flip;
      }
    }

    //Add friction
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    } else if (this.speed > 0) {
      this.speed -= this.friction;
    } else if (this.speed < 0) {
      this.speed += this.friction;
    }

    //move in direction of new angle, cos and sin and inverted since zero is towards the top of the screen
    this.x -= Math.sin(this.angle)*this.speed;
    this.y -= Math.cos(this.angle)*this.speed;
  }

  //Draw car
  draw(ctx) {

    ///draw car with x and y at the center with rotation
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(
      -this.width/2,
      -this.height/2,
      this.width,
      this.height
    );

    //fill in rectangle with color
    ctx.fill();

    //return car to original position
    ctx.restore();

    this.fov.draw(ctx);
  }
}


class Controls {
  constructor() {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    this.#addKeyboardListeners();
  }

  #addKeyboardListeners() {
    const setKeys = (event, param) => {
      switch(event.key) {
        case "ArrowUp":
          this.forward = param;
          break;
        case "ArrowDown":
          this.reverse = param;
          break;
        case "ArrowLeft":
          this.left = param;
          break;
        case "ArrowRight":
          this.right = param;
          break;
      }
    }

    document.onkeyup = (event) => {
      setKeys(event, false)
    }

    document.onkeydown = (event) => {
      setKeys(event, true)
    }

  }

}
