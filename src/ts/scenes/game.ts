import 'phaser';
import { constants } from '../constants';
import { SvgGenerator } from '../lib-candidates/svg/SvgGenerator';
import { SvgPhaser } from '../lib-candidates/svg/SvgPhaser';
import { ButtonFabric } from '../lib/ButtonFabric';
import { Svg2TextureScene } from './game/createTextureFromSvg';

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: constants.scenes.game });
  }

  init() {}

  create() {
    this.cameras.main.setBackgroundColor('#DEDEDE');
    console.log('start game');

    const but1 = this.add.text(0, 0, 'Svg2Texture', {
      fontFamily: 'Open Sans',
      fontSize: '32px',
    });
    ButtonFabric.makeButton(but1, () => {
      const key = 'Svg2TextureScene';
      this.addAndStartScene(key, Svg2TextureScene);
    });
  }

  private addAndStartScene(key: string, scene: new () => Phaser.Scene) {
    const isExist = this.scene.get(key) != null;
    if (!isExist) this.scene.add(key, new scene(), false);
    this.scene.start(key);
  }
}
