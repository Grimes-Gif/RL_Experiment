//launch a particular canvas
const start = (canvas) => {

  canvas.width = 200;

  const ctx = canvas.getContext("2d");
  let road = new Road(canvas.width/2, canvas.width *.9)
  let car = new Car(road.getCenterLanes(1), 100, 30, 50);
  let camera = new Camera();

  function animate() {
    car.update();

    //erases cars previous position, and makes canvas run from top to bottom
    canvas.height = window.innerHeight;

    camera.update(ctx, 0, -car.y + canvas.height*.7);
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate();
}


const utility = () => {

  const linearInterpolation = (A, B, t) => A + (B - A) * t
  return {'lerp':linearInterpolation}

}

util = utility()

const canvas = document.getElementById("myCanvas");
start(canvas)
