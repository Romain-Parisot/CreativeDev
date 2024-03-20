const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // context type: https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/getContext#typedecontexte

/**
 *  CONFIG
 */

const ROWS = 5;
const COLS = 6;

const red = "#E83A4E";
const yellow = "#FFE800";
const blue = "#3B76F5";
const green = "#71E394";
const colors = [red, yellow, blue, green];

/**
 *  METHODS
 */
const drawRectangle = (cWidth, cHeight, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(-cWidth / 2, -cHeight / 2, cWidth, cHeight);
  ctx.fill();
  ctx.closePath();
};

const deg2rad = (deg) => {
  return (deg * 2 * Math.PI) / 360;
};

// parcourir les lignes et les colognes pour dessiner un damier (multicolore)
// si 30% de chance : la dalle pivote de 45°
const cellWidth = canvas.width / COLS;
const cellHeight = canvas.height / ROWS;

for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    ctx.save();
    ctx.translate(
      j * cellWidth + cellWidth / 2,
      i * cellHeight + cellHeight / 2
    );
    if (Math.random() < 0.3) {
      ctx.rotate(deg2rad(45));
    }
    drawRectangle(cellWidth, cellHeight, colors[(i + j) % colors.length]);
    ctx.restore();
  }
}
