import 'phaser';
import { Boot } from './scenes/boot';
import { Preload } from './scenes/preload';
import { Game } from './scenes/game';
import { Start } from './scenes/start';

export const gameConfig = {
  type: Phaser.CANVAS, // Рендерер Canvas более предсказуемый
  width: 960, // размеры canvas в pixels
  height: 960,
  pixelArt: false,
  scale: {
    // для центрирования игры
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 700 },
    },
  },
  parent: 'body',
  scene: [Boot, Preload, Start, Game],
};
