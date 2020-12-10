export class CircleAvatar extends Phaser.GameObjects.Image {
  private static id = 0;

  constructor(
    scene: Phaser.Scene,
    texture: string,
    radius: number,
    circleCenterX: number,
    circleCenterY: number,
    scale = 1,
  ) {
    const canvasTexture = CircleAvatar.createCropped(
      scene,
      texture,
      radius,
      circleCenterX,
      circleCenterY,
      scale,
    );
    super(scene, 0, 0, canvasTexture);
  }

  private static createCropped(
    scene: Phaser.Scene,
    texture: string,
    radius: number,
    circleCenterX: number,
    circleCenterY: number,
    scale: number,
  ) {
    const width = radius * 2;
    const height = radius * 2;

    const tempSprite = new Phaser.GameObjects.Image(scene, 0, 0, texture);
    const image = tempSprite.texture.getSourceImage() as HTMLImageElement;
    /**
     *  Готовим canvas и картинку для записи
     *  Canvas делается под размер круга
     *  поэтому для учета circleCenterX, circleCenterY
     *  нужно сдвинуть саму картинку
     */
    const uniqueCanvasKey = `circleAvatarCanvas_${CircleAvatar.id++}`;
    const canvasTexture = scene.textures.createCanvas(uniqueCanvasKey, width, height);
    const ctx = canvasTexture.context;

    clipCircle(ctx, radius, radius, radius);
    ctx.clip();

    /**
     *  Двигаем картинку для учета circleCenterX, circleCenterY
     */
    const offsetX = circleCenterX - radius;
    const offsetY = circleCenterY - radius;

    const w = tempSprite.displayWidth * scale;
    const h = tempSprite.displayHeight * scale;
    ctx.drawImage(image, -offsetX, -offsetY, w, h);
    canvasTexture.refresh();
    tempSprite.destroy();

    return canvasTexture;
  }
}

function clipCircle(
  ctx: CanvasRenderingContext2D,
  maskCenterX: number,
  maskCenterY: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.arc(maskCenterX, maskCenterY, radius, 0, Math.PI * 2, true);
}
