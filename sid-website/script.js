const titleText = "Siddharth Word Counter";
const titleEl = document.getElementById("title");
let charIndex = 0;

function typeWriter() {
  if (charIndex < titleText.length) {
    titleEl.textContent += titleText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

const textInput = document.getElementById("text-input");
const wordCountEl = document.getElementById("word-count");
const sound = document.getElementById("keystroke-sound");

textInput.addEventListener("input", () => {
  const words = textInput.value.trim().split(/\s+/).filter(Boolean);
  wordCountEl.textContent = `Words: ${words.length}`;

  // Play sound effect
  sound.currentTime = 0;
  sound.play();
});

// Particle background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5
}));

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0ff";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", () => {
  textInput.value = "";
  wordCountEl.textContent = "Words: 0";
});

const themeSelect = document.getElementById("theme-select");

themeSelect.addEventListener("change", () => {
  const selected = themeSelect.value;
  document.body.className = selected;
});
