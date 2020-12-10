import 'phaser';
import { constants } from '../constants';
import { gameConfig } from '../phaser-game-config';
import { ButtonFabric } from '../lib/ButtonFabric';

export class Start extends Phaser.Scene {
  private logo: Phaser.GameObjects.Image;

  constructor() {
    super({ key: constants.scenes.start });
  }

  init() {}

  create() {
    console.log('start game');
    this.createBg();
    this.createLogo();
    this.createPlayButton();

    // todo remove it for start game
    this.scene.start(constants.scenes.game);
  }

  private createBg() {
    const whiteBg = this.add.rectangle(0, 0, gameConfig.width, gameConfig.height, 0xffffff);
    whiteBg.setOrigin(0, 0);
    const bg = this.add.image(0, 0, constants.images.backgroundSky);
    bg.setOrigin(0, 0);
    bg.alpha = 0.61;
  }

  private createLogo() {
    const centerX = gameConfig.width / 2;
    const centerY = gameConfig.height / 2;

    const X = centerX;
    const Y = centerY - 87;

    this.logo = this.add.image(X, Y, constants.images.preload.logo);
  }

  private createPlayButton() {
    const centerX = gameConfig.width / 2;
    const centerY = gameConfig.height / 2;

    const X = centerX;
    const Y = centerY + 5;

    const button = this.add.image(X, Y, constants.images.preload.playButton);
    button.setScale(0.2, 0.2);
    this.tweens.timeline({
      targets: [button],
      onComplete: (tween, targets) => {
        this.buttonAnimationOn(button);
      },
      tweens: [
        {
          props: {
            scaleX: 0.2,
            scaleY: 0.2,
          },
          duration: 25,
        },
        {
          props: {
            scaleX: 1.2,
            scaleY: 1.1,
          },
          duration: 170,
        },
        {
          props: {
            scaleX: 1,
            scaleY: 1,
          },
          duration: 150,
        },
      ],
    });
  }

  private buttonAnimationOn(button: Phaser.GameObjects.Image) {
    ButtonFabric.makeButton(button, () => this.onButtonClick());
  }

  private onButtonClick() {
    this.sound.play(constants.sounds.confirmation);
    this.scene.start(constants.scenes.game);
  }
}
