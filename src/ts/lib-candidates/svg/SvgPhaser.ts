export class SvgPhaser {
  private static textureId = 0;

  static get currentTextureKey(): string {
    return `SvgPhaser_${this.textureId}`;
  }

  private static get nextTextureKey(): string {
    return `SvgPhaser_${this.textureId++}`;
  }

  /**
   *
   * @param scene {Phaser.Scene}
   * @param svgCode {string } = "<rect width='300' height='100' fill='#daa520' rx='12' ry='12'"
   */
  static createTextureFromSvg(scene: Phaser.Scene, svgCode: string, onCreate: Function) {
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const image = document.createElement('img');

    /* console.log('image', image);
    document.body.appendChild(image); */

    image.addEventListener(
      'load',
      () => {
        URL.revokeObjectURL(url);
        const KEY = SvgPhaser.nextTextureKey; // ключ повторяется
        const texture = scene.textures.addImage(KEY, image);
        onCreate(KEY);
      },
      { once: true },
    );
    image.src = url;
  }
}
