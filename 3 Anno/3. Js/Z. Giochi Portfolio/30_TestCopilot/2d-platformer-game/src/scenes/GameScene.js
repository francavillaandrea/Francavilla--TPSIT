// GameScene.js
// This file contains the main game logic, including player movement, jumping, and interactions with the environment.

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' }); // Set the scene key for identification
    }

    preload() {
        // Load player sprite
        this.load.image('player', 'assets/images/player.png'); // Path to player image
    }

    create() {
        // Set up the game world
        this.physics.world.setBounds(0, 0, 800, 600); // Set the bounds of the world

        // Create the player sprite
        this.player = this.physics.add.sprite(100, 450, 'player'); // Initial position and sprite key
        this.player.setBounce(0.2); // Set bounce for the player
        this.player.setCollideWorldBounds(true); // Prevent the player from leaving the world bounds

        // Set up player controls
        this.cursors = this.input.keyboard.createCursorKeys(); // Create cursor keys for movement
    }

    update() {
        // Update the player's movement based on input
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160); // Move left
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160); // Move right
        } else {
            this.player.setVelocityX(0); // Stop movement
        }

        // Handle jumping
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330); // Jump
        }
    }
}

// Export the GameScene class for use in other files
export default GameScene;