import 'phaser';

import { constants } from '../../constants';
import { ButtonFabric } from '../../lib/ButtonFabric';

export class Path2dScene extends Phaser.Scene {
  static key = 'Path2dScene';
  constructor() {
    super({ key: Path2dScene.key });
  }

  init() {}

  create() {
    console.log(`${this.scene.key} start`);
    this.createCloseButton();
    this.createContent();
  }

  private createCloseButton() {
    const closeButton = this.add.text(0, 0, 'Close', {
      fontFamily: 'Open Sans',
      fontSize: '32px',
      color: 'black',
    });
    closeButton.setOrigin(1, 0);
    closeButton.setPosition(this.cameras.main.width, 0);
    ButtonFabric.makeButton(closeButton, () => {
      this.scene.start(constants.scenes.game);
    });
  }

  private createContent() {
    this.cameras.main.setBackgroundColor('#DEDEDE');
  }
}
