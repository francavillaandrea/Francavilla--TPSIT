// PreloadScene.js
// This scene is responsible for loading all game assets before the main game starts.
// It displays a loading screen while assets are being loaded.

class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Display a loading text while assets are being loaded
        this.load.image('loading', 'assets/images/loading.png'); // Load loading image
        this.add.text(400, 300, 'Loading...', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Load game assets here
        this.load.image('player', 'assets/images/player.png'); // Load player sprite
        this.load.image('background', 'assets/images/background.png'); // Load background image
        this.load.audio('jump', 'assets/audio/jump.wav'); // Load jump sound effect
        this.load.audio('bgMusic', 'assets/audio/background.mp3'); // Load background music
    }

    create() {
        // Once assets are loaded, transition to the GameScene
        this.scene.start('GameScene');
    }
}

// Export the PreloadScene class for use in other files
export default PreloadScene;