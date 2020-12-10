import { WorldPosition } from './WorldPosition';
import Timeout = NodeJS.Timeout;

export type MaskableContent =
  | Phaser.GameObjects.Container
  | Phaser.GameObjects.Text
  | Phaser.GameObjects.Sprite
  | Phaser.GameObjects.Image;

/**
 * Updatable Mask on Phaser.GameObjects.Graphic base
 * move container -> move mask
 *
 * Это контейнер с маской, которая автоматически следует за ним
 * Позволяет использовать user input на отдельных элементах внутри
 * child
 *
 * Маски в Phaser задаются в глобальных координатах
 *
 * Маска следует за контейнером при setPosition()
 * Чтобы включить автоматическое обновление - startUpdate()
 * выключить обновление позиции маски - stopUpdate()
 * Единоразово обновить маску - updateMask()
 */
export class MaskContainer extends Phaser.GameObjects.Container {
  protected timer: Timeout;
  protected graphicsMask: Phaser.GameObjects.Graphics;

  protected maskWidth: number;
  protected maskHeight: number;

  protected child: MaskableContent;

  constructor(
    scene: Phaser.Scene,
    child: MaskableContent,
    width = 100,
    height = 100,
    interval = 0,
  ) {
    super(scene, 0, 0);
    this.graphicsMask = scene.make.graphics({});
    //  Create a hash shape Graphics object
    this.graphicsMask.fillStyle(0xffffff);
    this.graphicsMask.beginPath();
    this.graphicsMask.fillRect(0, 0, width, height);

    this.setMask(this.graphicsMask.createGeometryMask());
    this.add(child);

    this.child = child;
    this.maskWidth = width;
    this.maskHeight = height;

    if (interval > 0) {
      this.startUpdate(interval);
    }
  }

  destroy(fromScene?: boolean) {
    if (this.timer) clearInterval(this.timer);
    super.destroy(fromScene);
  }

  updateMask() {
    const globalPosition = WorldPosition.get(this);
    this.graphicsMask.x = globalPosition.x;
    this.graphicsMask.y = globalPosition.y;
  }

  setPosition(x?: number, y?: number, z?: number, w?: number): this {
    super.setPosition(x, y, z, w);
    setTimeout(() => {
      this.updateMask();
    });
    return this;
  }

  startUpdate(interval: number) {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.updateMask();
    }, interval);
  }

  stopUpdate() {
    if (this.timer) clearInterval(this.timer);
  }
}
