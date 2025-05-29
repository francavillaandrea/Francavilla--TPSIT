// Configuration settings for the 2D platformer game

// Game dimensions
const GAME_WIDTH = 800; // Width of the game canvas
const GAME_HEIGHT = 600; // Height of the game canvas

// Physics settings
const PHYSICS_GRAVITY = 980; // Gravity applied to the player (in pixels per second squared)
const PHYSICS_FRICTION = 0.5; // Friction applied to the player movement

// Player settings
const PLAYER_SPEED = 200; // Speed of the player movement (in pixels per second)
const PLAYER_JUMP_FORCE = 400; // Force applied when the player jumps

// Asset paths
const ASSET_PATHS = {
    PLAYER_SPRITE: 'assets/images/player.png', // Path to the player sprite
    BACKGROUND_IMAGE: 'assets/images/background.png', // Path to the background image
    // Add more asset paths as needed
};

// Exporting the configuration settings for use in other files
export {
    GAME_WIDTH,
    GAME_HEIGHT,
    PHYSICS_GRAVITY,
    PHYSICS_FRICTION,
    PLAYER_SPEED,
    PLAYER_JUMP_FORCE,
    ASSET_PATHS
};