// 1. Setup (global)
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// 2. Particle class (global)
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.life = 60;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// 3. Firework logic (global)
let particles = [];

function explode(x, y) {
  const colors = ["#ff4d6d", "#ffd166", "#4cc9f0", "#cdb4db"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < 40; i++) {
    particles.push(new Particle(x, y, color));
  }
}

// 4. Animation loop (global)
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.life > 0);

  for (let p of particles) {
    p.update();
    p.draw();
  }

  requestAnimationFrame(animate);
}

animate();

// 5. Button handler (GLOBAL — VERY IMPORTANT)
function celebrate() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      explode(
        Math.random() * canvas.width,
        Math.random() * canvas.height / 2
      );
    }, i * 300);
  }
}
