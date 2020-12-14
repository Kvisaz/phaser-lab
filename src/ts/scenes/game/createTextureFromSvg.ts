import 'phaser';

import { constants } from '../../constants';
import { SvgPhaser } from '../../lib-candidates/svg/SvgPhaser';
import { ButtonFabric } from '../../lib/ButtonFabric';

export class Svg2TextureScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Svg2TextureScene' });
  }

  init() {}

  create() {
    console.log('Svg2TextureScene', this);
    console.log(this.scene.key);
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
    console.log('start game');

    // обычный спрайт из svg
    const svgImage = this.add.image(0, 0, constants.images.preload.logo);
    svgImage.setPosition(
      svgImage.displayWidth * svgImage.originX,
      svgImage.displayHeight * svgImage.originY,
    );

    console.log('svgImage', svgImage);

    const scene = this;
    // как добыть SVG элемент?
    const t1 = Date.now();
    //language=CSS
    /*     const svgCode = `<svg xmlns="http://www.w3.org/2000/svg"  width="400" height="110">
    <rect width="300" height="100" fill="#dedede" rx='12' ry='12'  />
    </svg>`; */

    const svgCode2 = `<rect width="300" height="100" fill="#dedede" rx='12' ry='12'  />`;
    const svgCode4 = `<svg height="140" width="140"  xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="f3" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3" fill="yellow" filter="url(#f3)" />
</svg>
`;
    const svgCode3 = `
<svg width="324" height="90" viewBox="0 0 162 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<g filter="url(#filter0_d)">
<path d="M1 5L54 5V23.5L54 42L1 42L9.4471 23.5L1 5Z" fill="#00566D"/>
<path d="M3.33387 6.5L52.5 6.5V23.5L52.5 40.5L3.33387 40.5L10.8116 24.123L11.0961 23.5L10.8116 22.877L3.33387 6.5Z" stroke="#A1C3CE" stroke-width="3"/>
</g>
<g filter="url(#filter1_d)">
<path d="M161 5L108 5V23.5V42L161 42L152.553 23.5L161 5Z" fill="#00566D"/>
<path d="M158.666 6.5L109.5 6.5V23.5V40.5L158.666 40.5L151.188 24.123L150.904 23.5L151.188 22.877L158.666 6.5Z" stroke="#A1C3CE" stroke-width="3"/>
</g>
<g filter="url(#filter2_d)">
<path d="M13 2L149 2L143.953 22L149 42L13 42L18.0474 22L13 2Z" fill="#016B88"/>
<path d="M13 1L11.7163 1L12.0304 2.2447L17.016 22L12.0304 41.7553L11.7163 43H13L149 43H150.284L149.97 41.7553L144.984 22L149.97 2.2447L150.284 1L149 1L13 1Z" stroke="#001E26" stroke-width="2"/>
</g>
<path d="M18.9766 6.5L143.023 6.5L138.805 21.5963L138.692 22L138.805 22.4037L143.023 37.5L18.9766 37.5L23.1951 22.4037L23.3079 22L23.1951 21.5963L18.9766 6.5Z" stroke="white" stroke-width="3"/>
<path d="M93.7648 43.9612C93.9814 42.878 95.035 42.1756 96.1182 42.3922L99.0599 42.9804C101.226 43.4136 102.631 45.5209 102.198 47.6871L102.002 48.6677C101.352 51.9171 98.1911 54.0245 94.9418 53.3747C93.3171 53.0498 92.2634 51.4694 92.5883 49.8447L93.7648 43.9612Z" fill="#003847" fill-opacity="0.35"/>
<path d="M125.527 24.9946C125.13 26.6425 123.234 27.4153 121.799 26.5139C120.253 25.5432 119.787 23.5032 120.758 21.9575L123.959 16.8601C124.951 15.2805 127.035 14.8042 128.615 15.7961L129.103 16.1026C130.265 16.8326 130.364 18.4898 129.296 19.3522L128.154 20.2747C126.953 21.2441 126.107 22.5829 125.746 24.0829L125.527 24.9946Z" fill="#003847" fill-opacity="0.35"/>
<path d="M38.546 42.9601C36.7886 44.7175 33.9394 44.7175 32.182 42.9601L31.1214 41.8994C29.9498 40.7279 29.9498 38.8284 31.1214 37.6568L35.364 33.4142C36.1451 32.6331 37.4114 32.6331 38.1924 33.4142L39.9602 35.1819C41.7176 36.9393 41.7176 39.7885 39.9602 41.5459L38.546 42.9601Z" fill="#003847" fill-opacity="0.35"/>
</g>
<defs>
<filter id="filter0_d" x="0" y="5" width="55" height="39" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter1_d" x="107" y="5" width="55" height="39" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter2_d" x="9.43262" y="0" width="143.135" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="3"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<clipPath id="clip0">
<rect width="162" height="45" fill="white"/>
</clipPath>
</defs>
</svg>
`;

    const svgCode5 = `
<svg width="324" height="90" viewBox="0 0 162 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 5L54 5V23.5L54 42L1 42L9.4471 23.5L1 5Z" fill="#00566D"/>
<path d="M3.33387 6.5L52.5 6.5V23.5L52.5 40.5L3.33387 40.5L10.8116 24.123L11.0961 23.5L10.8116 22.877L3.33387 6.5Z" stroke="#A1C3CE" stroke-width="3"/>
<path d="M161 5L108 5V23.5V42L161 42L152.553 23.5L161 5Z" fill="#00566D"/>
<path d="M158.666 6.5L109.5 6.5V23.5V40.5L158.666 40.5L151.188 24.123L150.904 23.5L151.188 22.877L158.666 6.5Z" stroke="#A1C3CE" stroke-width="3"/>
<path d="M13 2L149 2L143.953 22L149 42L13 42L18.0474 22L13 2Z" fill="#016B88"/>
<path d="M13 1L11.7163 1L12.0304 2.2447L17.016 22L12.0304 41.7553L11.7163 43H13L149 43H150.284L149.97 41.7553L144.984 22L149.97 2.2447L150.284 1L149 1L13 1Z" stroke="#001E26" stroke-width="2"/>
<path d="M18.9766 6.5L143.023 6.5L138.805 21.5963L138.692 22L138.805 22.4037L143.023 37.5L18.9766 37.5L23.1951 22.4037L23.3079 22L23.1951 21.5963L18.9766 6.5Z" stroke="white" stroke-width="3"/>
<path d="M93.7648 43.9612C93.9814 42.878 95.035 42.1756 96.1182 42.3922L99.0599 42.9804C101.226 43.4136 102.631 45.5209 102.198 47.6871L102.002 48.6677C101.352 51.9171 98.1911 54.0245 94.9418 53.3747C93.3171 53.0498 92.2634 51.4694 92.5883 49.8447L93.7648 43.9612Z" fill="#003847" fill-opacity="0.35"/>
<path d="M125.527 24.9946C125.13 26.6425 123.234 27.4153 121.799 26.5139C120.253 25.5432 119.787 23.5032 120.758 21.9575L123.959 16.8601C124.951 15.2805 127.035 14.8042 128.615 15.7961L129.103 16.1026C130.265 16.8326 130.364 18.4898 129.296 19.3522L128.154 20.2747C126.953 21.2441 126.107 22.5829 125.746 24.0829L125.527 24.9946Z" fill="#003847" fill-opacity="0.35"/>
<path d="M38.546 42.9601C36.7886 44.7175 33.9394 44.7175 32.182 42.9601L31.1214 41.8994C29.9498 40.7279 29.9498 38.8284 31.1214 37.6568L35.364 33.4142C36.1451 32.6331 37.4114 32.6331 38.1924 33.4142L39.9602 35.1819C41.7176 36.9393 41.7176 39.7885 39.9602 41.5459L38.546 42.9601Z" fill="#003847" fill-opacity="0.35"/>
</svg>
`;

    let T = Date.now();

    T = Date.now();
    SvgPhaser.createTextureFromSvg(this, svgCode4, (key: string) => {
      const image2 = scene.add.image(420, 50, key);
      image2.setOrigin(0, 0);
      console.log(`T = ${T}`);
      console.log(`time svgCode4 create = ${Date.now() - T} ms`);
    });

    const T100 = Date.now();
    for (let i = 0; i < 100; i += 1) {
      SvgPhaser.createTextureFromSvg(this, svgCode5, (key: string) => {
        const image2 = scene.add.image(400, 50 + i * 5, key);
        image2.setOrigin(0, 0);
        if (i == 99) {
          console.log(`T100 = ${T100}`);
          console.log(`time 100 svgCode create = ${Date.now() - T100} ms`);
        }
      });
    }

    const TsvgCode3 = Date.now();
    SvgPhaser.createTextureFromSvg(this, svgCode3, (key: string) => {
      const image2 = scene.add.image(400, 50, key);
      image2.setOrigin(0, 0);
      console.log(`TsvgCode3 = ${TsvgCode3}`);
      console.log(`time svgCode3 create = ${Date.now() - TsvgCode3} ms`);
    });

    const tHundred = Date.now();
    const commonSvg1 = `<svg fill="none" xmlns="http://www.w3.org/2000/svg">`;
    const commonSvg2 = `</svg>`;
    let svgBuffer = '';
    for (let i = 0; i < 100; i += 1) {
      svgBuffer += svgCode3;
    }
    const hundredSvg = commonSvg1 + svgBuffer + commonSvg2;

    SvgPhaser.createTextureFromSvg(this, hundredSvg, (key: string) => {
      const image2 = scene.add.image(100, 50, key);
      image2.setOrigin(0, 0);
      console.log(`tHundred = ${tHundred}`);
      console.log(`time hundredSvgBuffer create = ${Date.now() - tHundred} ms`);
    });
  }
}

/**
 *   тайминги
 *    100 аналогичных фигур
 *    Konva - 300-320 ms
 *    Phaser - 397ms + немгновенное появление из-за подгрузки картинок
 *    но из-за асинхронности подгрузок время Phaser глючит, отсчитывается от последнего T
 *    поэтому кажется, что операция все медленнее и медленнее
 *
 */
