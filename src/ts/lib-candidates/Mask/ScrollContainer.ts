import { MaskContainer } from './MaskContainer';

export type ScrollableContent =
  | Phaser.GameObjects.Container
  | Phaser.GameObjects.Text
  | Phaser.GameObjects.Sprite
  | Phaser.GameObjects.Image;

export class ScrollContainer extends MaskContainer {
  protected velocityX: number;
  protected maxVelocityX: number;
  protected velocityY: number;
  protected maxVelocityY: number;
  protected lastUpdateTime: number;
  protected isScrolling: boolean;
  protected offsetX: number;
  protected offsetY: number;
  protected child: ScrollableContent;
  protected maxOffsetX: number;
  protected maxOffsetY: number;
  private acceleration: number;

  constructor(scene: Phaser.Scene, child: ScrollableContent, width = 100, height = 100) {
    super(scene, child, width, height, 16);
    this.velocityX = 0;
    this.velocityY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  updateMask() {
    super.updateMask();
    this.updateScrolling();
    this.child?.setPosition(this.offsetX, this.offsetY);
  }

  /**
   * @param velocityX - pixels/sec
   * @param velocityY - pixels/sec
   */
  startScroll(
    velocityX: number,
    velocityY: number,
    maxVelocityX = velocityX * 2,
    maxVelocityY = velocityY * 2,
    acceleration = 100,
  ) {
    if (this.isScrolling) return;
    this.isScrolling = true;
    this.velocityX = velocityX / 1000;
    this.maxVelocityX = maxVelocityX / 1000;
    this.velocityY = velocityY / 1000;
    this.maxVelocityY = maxVelocityY / 1000;
    this.acceleration = acceleration / 1000;
    this.lastUpdateTime = Date.now();

    this.maxOffsetX = this.getMaxOffsetX();
    this.maxOffsetY = this.getMaxOffsetY();
  }

  stopScroll() {
    this.velocityX = 0;
    this.velocityY = 0;
    this.maxVelocityX = 0;
    this.maxVelocityY = 0;
    this.acceleration = 0;
    this.isScrolling = false;
  }

  isScrollingNow() {
    return this.isScrolling;
  }

  protected getMaxOffsetX() {
    // @ts-ignore
    const width = this.child.getBounds().width;
    return width - this.maskWidth;
  }

  protected getMaxOffsetY() {
    // @ts-ignore
    const width = this.child.getBounds().width;
    return width - this.maskHeight;
  }

  private updateScrolling() {
    if (this.isScrolling) {
      const time = Date.now();
      const dT = time - this.lastUpdateTime;
      this.lastUpdateTime = time;

      if (Math.abs(this.velocityX) < Math.abs(this.maxVelocityX)) {
        this.velocityX = this.velocityX + dT * this.acceleration * Math.sign(this.velocityX);
      }

      if (Math.abs(this.velocityY) < Math.abs(this.maxVelocityY)) {
        this.velocityY = this.velocityY + dT * this.acceleration * Math.sign(this.velocityY);
      }

      const dX = dT * this.velocityX;
      const dY = dT * this.velocityY;

      this.offsetX += dX;
      this.offsetY += dY;

      this.checkScrollBounds();
    }
  }

  private checkScrollBounds() {
    this.checkScrollBoundsX();
    this.checkScrollBoundsY();
    if (this.velocityX == 0 && this.velocityY == 0) {
      this.isScrolling = false;
    }
  }

  private checkScrollBoundsX() {
    const sign = Math.sign(this.velocityX);
    const toLeft = sign < 0;
    const toRight = sign > 0;

    if (toLeft) {
      const canNot = this.canNotScrollToLeft();
      if (canNot) {
        this.offsetX = -this.maxOffsetX;
        this.stopScrollingX();
      }
    }

    if (toRight) {
      const canNot = this.canNotScrollToRight();
      if (canNot) {
        this.offsetX = 0;
        this.stopScrollingX();
      }
    }
  }

  private checkScrollBoundsY() {
    const sign = Math.sign(this.velocityY);
    const toUp = sign < 0;
    const toDown = sign > 0;

    if (toUp) {
      const canNot = this.canNotScrollToUp();
      if (canNot) {
        this.offsetY = -this.maxOffsetY;
        this.stopScrollingY();
      }
    }

    if (toDown) {
      const canNot = this.canNotScrollToDown();
      if (canNot) {
        this.offsetY = 0;
        this.stopScrollingY();
      }
    }
  }

  private stopScrollingX() {
    this.velocityX = 0;
    this.maxVelocityX = 0;
  }

  private stopScrollingY() {
    this.velocityY = 0;
    this.maxVelocityY = 0;
  }

  private canNotScrollToLeft(): boolean {
    return this.offsetX <= -this.maxOffsetX;
  }

  private canNotScrollToRight(): boolean {
    return this.offsetX >= 0;
  }

  private canNotScrollToUp(): boolean {
    return this.offsetY <= -this.maxOffsetY;
  }

  private canNotScrollToDown(): boolean {
    return this.offsetY >= 0;
  }
}
