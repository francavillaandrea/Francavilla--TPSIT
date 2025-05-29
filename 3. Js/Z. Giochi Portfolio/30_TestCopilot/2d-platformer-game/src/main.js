// Importa la libreria Phaser
import Phaser from 'phaser';
// Importa la configurazione del gioco
import gameConfig from './config/gameConfig';
// Importa le scene del gioco
import BootScene from './scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';

// Crea un array di scene da utilizzare nel gioco
const sceneArray = [BootScene, PreloadScene, GameScene];

// Inizializza l'istanza di Phaser con la configurazione del gioco
const game = new Phaser.Game({
    ...gameConfig, // Spread operator per includere le configurazioni
    scene: sceneArray // Aggiunge le scene al gioco
});

// Commento finale per indicare che il file è l'entry point del gioco
// Questo file avvia l'applicazione e gestisce le scene del gioco.