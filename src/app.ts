import { GameLoop } from './GameLoop.js';
import KeepYourSecrets from './KeepYourSecrets.js';
// import Level from './Level.js';

const game = new KeepYourSecrets(document.getElementById('game') as HTMLCanvasElement);

const gameLoop = new GameLoop(game);
window.addEventListener('load', () => {
  gameLoop.start();
});
