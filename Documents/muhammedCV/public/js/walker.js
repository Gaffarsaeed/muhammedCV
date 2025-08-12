const canvas = document.getElementById("walkerCanvas");
const ctx = canvas.getContext("2d");

// ----- Tweaks you’ll likely edit -----
let stepLength   = 3;          // speed
let turnChance   = 0.15;       // 0..1 (higher = more turns)
let lineWidth    = 2;
let lineColor = "rgba(46,196,255,0.85)";  // cyan accents
const possibleAngles = [0, Math.PI/2, Math.PI, 3*Math.PI/2];
const BACKGROUND_COLOR = "#0b1d3a";   

// Tail fade
const FADE_ENABLED = true;
// You can override via CSS var: --walker-fade-amount
const FADE_AMOUNT  =
  parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue("--walker-fade-amount")) || 0.03;
// -------------------------------------

let width, height, x, y, angle, rafId;
const bgRGB = hexToRgb(BACKGROUND_COLOR);

function setup() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);

  // size canvas to viewport
  width  = canvas.clientWidth  = window.innerWidth;
  height = canvas.clientHeight = window.innerHeight;

  // internal pixel size for crispness
  canvas.width  = Math.floor(width  * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // start position + angle
  x = Math.random() * width;
  y = Math.random() * height;
  angle = possibleAngles[Math.floor(Math.random() * possibleAngles.length)];

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = lineWidth;

  // hard fill once if fading disabled
  if (!FADE_ENABLED) {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, width, height);
  }
}

function draw() {
  rafId = requestAnimationFrame(draw);

  // fade the previous frame a touch
  if (FADE_ENABLED) {
    ctx.fillStyle = `rgba(${bgRGB.r},${bgRGB.g},${bgRGB.b},${FADE_AMOUNT})`;
    ctx.fillRect(0, 0, width, height);
  }

  const oldX = x, oldY = y;

  x += Math.cos(angle) * stepLength;
  y += Math.sin(angle) * stepLength;

  // wrap around edges
  if (x < 0) x += width; else if (x > width) x -= width;
  if (y < 0) y += height; else if (y > height) y -= height;

  ctx.beginPath();
  ctx.moveTo(oldX, oldY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  if (Math.random() < turnChance) {
    angle = possibleAngles[Math.floor(Math.random() * possibleAngles.length)];
  }
}

function hexToRgb(hex) {
  const h = hex.replace(/^#/, "");
  const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function onResize() {
  cancelAnimationFrame(rafId);
  setup();
  draw();
}

window.addEventListener("resize", onResize);

// Pause when tab is hidden (save CPU)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) cancelAnimationFrame(rafId);
  else draw();
});

setup();
draw();
