import 'phaser';
import { constants } from '../constants';

export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: constants.scenes.boot });
  }

  preload() {
    // Место для подгрузки логотипа
    this.load.svg(constants.images.preload.logo, constants.images.preload.logo);
    this.load.image(constants.images.backgroundSky, constants.images.backgroundSky);
  }

  create() {
    this.scene.start(constants.scenes.preload);
  }
}
