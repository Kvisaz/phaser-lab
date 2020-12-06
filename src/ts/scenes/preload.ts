import "phaser"
import {gameConfig} from '../phaser-game-config';
import {ColorUtils} from '../lib/ColorUtils';
import {ButtonFabric} from '../lib/ButtonFabric';
import {constants} from '../constants';

export class Preload extends Phaser.Scene {
    private logo: Phaser.GameObjects.Image;
    private logoTween: Phaser.Tweens.Tween;

    constructor() {
        super({key: constants.scenes.preload});
    }

    preload() {
        this.createBg();
        this.setupLoad();
        this.createProgressbar();
        this.createLogo();
    }

    createProgressbar() {

        const centerX = gameConfig.width / 2;
        const centerY = gameConfig.height / 2;

        // size & position
        let width = 400;
        let height = 20;
        let xStart = centerX - width / 2;
        let yStart = centerY - height / 2;

        const BAR_COLOR = ColorUtils.cssToNumber('#2d8e27');
        const FRAME_COLOR = ColorUtils.cssToNumber('#aaaaaa');

        // border size
        let borderOffset = 2;

        let borderRect = new Phaser.Geom.Rectangle(
            xStart - borderOffset,
            yStart - borderOffset,
            width + borderOffset * 2,
            height + borderOffset * 2);

        let border = this.add.graphics({
            lineStyle: {
                width: 5,
                color: FRAME_COLOR
            }
        });
        border.strokeRectShape(borderRect);

        let progressbar = this.add.graphics();

        /**
         * Updates the progress bar.
         *
         * @param {number} percentage
         */
        let updateProgressbar = function (percentage) {
            progressbar.clear();
            progressbar.fillStyle(BAR_COLOR, 1);
            progressbar.fillRect(xStart, yStart, percentage * width, height);
        };

        this.load.on('progress', updateProgressbar);

        this.load.once('complete', function () {
            this.onLoadEnd();
            this.load.off('progress', updateProgressbar);
            progressbar.setVisible(false);
            border.setVisible(false);
            //
        }, this);
    }

    private createBg() {
        const whiteBg = this.add.rectangle(0, 0, gameConfig.width, gameConfig.height, 0xffffff);
        whiteBg.setOrigin(0, 0);
        const bg = this.add.image(0, 0, constants.images.backgroundSky);
        bg.setOrigin(0, 0);
        bg.alpha = 0.61;
    }

    private setupLoad() {
        // подгрузка кнопок и других картинок
        this.loadAssets(constants.images);
        this.loadAssets(constants.sounds);
    }

    private loadAssets(obj: object) {
        console.log('loadAssets', obj);
        Object.values(obj).forEach(value=>{
            console.log("value", typeof value, value);
            switch (typeof value) {
                case 'object':
                    this.loadAssets(value);
                    break;
                case 'string':
                    this.loadAsset(value);
                    break;
                default:
                    console.warn('loader error: unknown asset field', value);
            }
        })
    }

    private loadAsset(url: string) {
        console.log('loadAsset', url);
        const last3Chars = url.substring(url.length - 3);
        console.log('last3Chars', last3Chars);
        switch (last3Chars) {
            case 'png':
                this.load.image(url,url);
                break;
            case 'svg':
                this.load.svg(url, url);
                break;
            case 'ogg':
            case 'mp3':
                this.load.audio(url, url);
                break;
        }
    }

    private createLogo() {
        const centerX = gameConfig.width / 2;
        const centerY = gameConfig.height / 2;

        const X = centerX;
        const Y = centerY - 87;

        this.logo = this.add.image(X, Y, constants.images.preload.logo);
        this.logoTween = this.tweens.add({
            targets: [
                this.logo
            ],
            props: {
                y: Y - 20,
            },
            duration: 150,
            yoyo: true,
            repeat: -1,
        });

        // @ts-ignore
        const scene = this.logo.scene;
        console.log('logo scene', scene);
        console.log('scene', this);
        console.log('is', this == scene);

    }

    private onLoadEnd() {
        this.stopLogoAnimation();
        this.scene.start(constants.scenes.start);
    }

    private stopLogoAnimation() {
        this.logoTween.complete();
        const centerX = gameConfig.width / 2;
        const centerY = gameConfig.height / 2;

        const X = centerX;
        const Y = centerY - 87;
        this.logoTween = this.tweens.add({
            targets: [
                this.logo
            ],
            props: {
                y: Y,
            },
            duration: 150,
        });
    }
}