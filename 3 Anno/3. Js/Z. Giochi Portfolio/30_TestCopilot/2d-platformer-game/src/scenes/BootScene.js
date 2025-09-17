// BootScene.js
// This scene initializes the game and transitions to the PreloadScene after the boot process is complete.

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load any assets needed for the boot process here (if any)
        // For example, loading a logo or splash screen image
        this.load.image('logo', 'assets/images/logo.png');
    }

    create() {
        // Display the logo on the screen
        const logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'logo');
        logo.setOrigin(0.5, 0.5);

        // Transition to the PreloadScene after a short delay
        this.time.delayedCall(2000, () => {
            this.scene.start('PreloadScene');
        });
    }
}

// Export the BootScene class for use in other files
export default BootScene;