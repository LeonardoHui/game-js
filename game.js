// Get the canvas element and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size to full window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player settings
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 50,
  height: 50,
  speed: 5, // Movement speed
  color: "yellow",
};

// Handle player movement
const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

// Background sound settings
const backgroundMusic = new Audio("House In a Forest Loop.ogg");
backgroundMusic.loop = true; // Make the sound loop
backgroundMusic.volume = 0.1; // Set the volume to a reasonable level (0 to 1)
let musicStarted = false;

// Listen for keydown and keyup events
document.addEventListener("keydown", (e) => {
  if (!musicStarted) {
    backgroundMusic.play(); // Play audio when any key is pressed
    musicStarted = true; // Set the flag to true so it only plays once
  }

  if (e.key === "ArrowUp") keys.up = true;
  if (e.key === "ArrowDown") keys.down = true;
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowRight") keys.right = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") keys.up = false;
  if (e.key === "ArrowDown") keys.down = false;
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
});

// Update player position based on key input
function movePlayer() {
  // Prevent the player from going outside the canvas boundaries
  if (keys.up && player.y > 0) player.y -= player.speed;
  if (keys.down && player.y + player.height < canvas.height)
    player.y += player.speed;
  if (keys.left && player.x > 0) player.x -= player.speed;
  if (keys.right && player.x + player.width < canvas.width)
    player.x += player.speed;
}

// Draw the player on the canvas
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = "image.webp"; // Replace with your background image path

// Draw background image on the canvas
function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

document.addEventListener("click", () => {
  backgroundMusic.play(); // Play audio when user clicks anywhere
});

// Game loop to update the game every frame
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background first
  drawBackground();

  // Update player position
  movePlayer();

  // Draw the player
  drawPlayer();

  // Request the next frame
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
