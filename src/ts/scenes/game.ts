import 'phaser';

import { constants } from '../constants';
import { ButtonFabric } from '../lib/ButtonFabric';
import { Svg2TextureScene } from './game/createTextureFromSvg';
import { DomSvgScene } from './game/DomSvgScene';
import { Path2dScene } from './game/Path2d';

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: constants.scenes.game });
  }

  init() {}

  create() {
    this.cameras.main.setBackgroundColor('#DEDEDE');
    console.log('start game');

    const buttons = [
      this.addSceneButton('Svg2Texture', 'Svg2TextureScene', Svg2TextureScene),
      this.addSceneButton('Dom Svg', 'DomSvgScene', DomSvgScene),
      this.addSceneButton('Path 2d', Path2dScene.key, Path2dScene),
    ];

    Phaser.Actions.GridAlign(buttons, {
      x: 150,
      y: 90,
      width: 3,
      cellWidth: 250,
      cellHeight: 100,
    });
  }

  private addSceneButton(text: string, sceneKey: string, sceneClass: new () => Phaser.Scene) {
    const button = this.add.text(0, 0, text, {
      fontFamily: 'Verdana',
      fontSize: '32px',
      backgroundColor: 'gold',
      color: 'black',
      padding: {
        x: 10,
        y: 10,
      },
    });
    button.setOrigin(0.5, 0.5);
    ButtonFabric.makeButton(button, () => this.addAndStartScene(sceneKey, sceneClass));
    return button;
  }

  private addAndStartScene(key: string, sceneClass: new () => Phaser.Scene) {
    const isExist = this.scene.get(key) != null;
    if (!isExist) this.scene.add(key, new sceneClass(), false);
    this.scene.start(key);
  }
}
