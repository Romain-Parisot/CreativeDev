import { GUI } from "dat.gui";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // context type: https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/getContext#typedecontexte
const canvasWidth = canvas.getBoundingClientRect().width;
const canvasHeight = canvas.getBoundingClientRect().height;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const params = {
  nBubbles: 500,
  lineWidth: 1,
  speed: 1000,
};

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;

    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
  }

  update(speed = 1) {
    this.x += this.vx * speed;
    this.y += this.vy * speed;

    if (this.x < 0 || this.x > canvas.width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > canvas.height) {
      this.vy *= -1;
    }
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}
const generate = () => {
  // sytle
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = params.lineWidth;
  // setup
  const bubbles = [];
  for (let i = 0; i < params.nBubbles; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const bubble = new Bubble(x, y);
    bubbles.push(bubble);
  }
  // draw
  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach((bubble) => {
      bubble.update(params.speed);
      bubble.draw();
    });
    window.requestAnimationFrame(update);
  };

  update();
};

const gui = new GUI();
gui.add(params, "nBubbles", 1, 100).step(1);
gui.add(params, "speed", -2, 2).step(0.1);
generate();
