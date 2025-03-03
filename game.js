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
  width: 80,
  height: 100,
  speed: 5, // Movement speed
  sprite: new Image(),
  spriteWidth: 80, // Width of one frame in the sprite sheet
  spriteHeight: 100, // Height of one frame in the sprite sheet
  currentFrame: 0, // Index of the current frame in the sprite
  moving: false, // Flag to indicate if the player is moving
  direction: "down", // Initial direction is 'down'
};

// Load the sprite sheet (replace with your sprite image file)
player.sprite.src = "sprites.png"; // Replace with your sprite image path

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
  player.moving = false; // Assume the player is not moving initially

  // Prevent the player from going outside the canvas boundaries
  if (keys.up && player.y > 0) {
    player.y -= player.speed;
    player.moving = true;
    player.direction = "up"; // Moving up
  }
  if (keys.down && player.y + player.height < canvas.height) {
    player.y += player.speed;
    player.moving = true;
    player.direction = "down"; // Moving down
  }
  if (keys.left && player.x > 0) {
    player.x -= player.speed;
    player.moving = true;
    player.direction = "left"; // Moving left
  }
  if (keys.right && player.x + player.width < canvas.width) {
    player.x += player.speed;
    player.moving = true;
    player.direction = "right"; // Moving right
  }
}

// Update the current frame for the sprite animation
function updateAnimation() {
  if (player.moving) {
    // Change frames based on the direction
    player.currentFrame = (player.currentFrame + 1) % 4; // Loop through 4 frames
  } else {
    player.currentFrame = 0; // If not moving, show the first frame (idle)
  }
}

// Draw the player (sprite) on the canvas
function drawPlayer() {
  let row = 0; // Default row is 0 (moving down)

  // Determine the row based on the direction
  switch (player.direction) {
    case "down":
      row = 0;
      break;
    case "up":
      row = 1;
      break;
    case "right":
      row = 2;
      break;
    case "left":
      row = 3;
      break;
  }

  // Draw the current frame of the sprite for the given direction
  ctx.drawImage(
    player.sprite,
    player.currentFrame * player.spriteWidth, // Source X (frame position)
    row * player.spriteHeight, // Source Y (frame position)
    player.spriteWidth, // Width of the frame
    player.spriteHeight, // Height of the frame
    player.x, // Destination X on the canvas
    player.y, // Destination Y on the canvas
    player.width, // Destination width
    player.height // Destination height
  );
}

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = "image.webp";

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

  // Update player position and animation
  movePlayer();
  updateAnimation();

  // Draw the player
  drawPlayer();

  // Request the next frame
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
