let currentScreen = 0;
let screens = ["welcome", "balloon-game", "cake-scene", "slideshow", "video-scene", "finale"];
let popped = 0;
let slideIndex = 1;

window.onload = () => {
  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
    showScreen("welcome");
    document.getElementById("bg-music").play();
  }, 2000);
};

function showScreen(id) {
  screens.forEach(s => document.getElementById(s).classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function startJourney() {
  showScreen("balloon-game");
  createBalloons();
}

function createBalloons() {
  let container = document.getElementById("balloons");
  container.innerHTML = "";
  popped = 0;
  for (let i = 0; i < 5; i++) {
    let balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.onclick = () => popBalloon(balloon);
    container.appendChild(balloon);
  }
}

function popBalloon(balloon) {
  popped++;
  balloon.style.visibility = "hidden";
  if (popped >= 3) {
    setTimeout(() => showScreen("cake-scene"), 1000);
  }
}

function cutCake() {
  showScreen("slideshow");
}

function nextSlide() {
  slideIndex++;
  if (slideIndex > 8) {
    showScreen("video-scene");
  } else {
    document.getElementById("slide").src = `images/${slideIndex}.jpg`;
  }
}

function nextVideo() {
  showScreen("finale");
  startFireworks();
}

// Fireworks animation
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = 400;

  let particles = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFirework() {
    let x = random(100, canvas.width - 100);
    let y = random(50, 200);
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: x,
        y: y,
        dx: random(-3, 3),
        dy: random(-3, 3),
        life: 100
      });
    }
  }

  function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      ctx.fillStyle = "hsl(" + random(0, 360) + ",100%,50%)";
      ctx.fillRect(p.x, p.y, 2, 2);
      p.x += p.dx;
      p.y += p.dy;
      p.life--;
      if (p.life <= 0) particles.splice(i, 1);
    });

    if (Math.random() < 0.05) createFirework();

    requestAnimationFrame(draw);
  }

  draw();
}
