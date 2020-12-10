import { MaskContainer } from './MaskContainer';
import { ScrollableContent } from './ScrollContainer';
import { WorldPosition } from './WorldPosition';

export type ScrollBarElement =
  | Phaser.GameObjects.Container
  | Phaser.GameObjects.Text
  | Phaser.GameObjects.Sprite
  | Phaser.GameObjects.Image
  | Phaser.GameObjects.Rectangle;

export class VerticalScrollContainer extends MaskContainer {
  protected contentWidth: number;
  protected contentHeight: number;

  protected scrollThumb: ScrollBarElement;
  protected scrollBar: ScrollBarElement;

  protected barScrolling = false;

  private userOnScroll: Function;

  constructor(scene: Phaser.Scene, child: ScrollableContent, width = 100, height = 100) {
    super(scene, child, width, height);
    this.setContentBounds(child.width, child.height * 1.1);
    this.addInteractive();
  }

  setContentBounds(width: number, height: number): this {
    this.contentWidth = width;
    this.contentHeight = height;
    this.updateScrollBarVisibility();
    return this;
  }

  setScrollThumb(thumb: ScrollBarElement): this {
    if (this.scrollThumb) {
      this.remove(this.scrollThumb);
    }
    this.scrollThumb = thumb;

    this.scrollThumb.x = this.maskWidth - this.scrollThumb.displayWidth;

    this.scrollThumb.setInteractive({ useHandCursor: false });
    this.scene.input.setDraggable(this.scrollThumb);
    this.scrollThumb.on(Phaser.Input.Events.DRAG_START, this.onScrollBarDragStart.bind(this));
    this.scrollThumb.on(Phaser.Input.Events.DRAG_END, this.onScrollBarDragEnd.bind(this));
    this.scrollThumb.on(Phaser.Input.Events.DRAG, this.onScrollBarDrag.bind(this));

    this.add(this.scrollThumb);
    this.bringToTop(this.scrollThumb);
    this.updateScrollBarVisibility();
    return this;
  }

  setScrollBar(width: number, color: number): this {
    if (this.scrollBar) {
      this.remove(this.scrollBar);
    }

    this.scrollBar = new Phaser.GameObjects.Rectangle(
      this.scene,
      0,
      0,
      width,
      this.maskHeight,
      color,
    );
    this.scrollBar.setOrigin(0, 0);

    this.scrollBar.x = this.maskWidth - this.scrollBar.displayWidth;

    this.add(this.scrollBar);
    this.bringToTop(this.scrollThumb);
    this.updateScrollBarVisibility();
    return this;
  }

  canScroll() {
    return Math.abs(this.getNegativeOffset()) > 0;
  }

  onScroll(fn: Function) {
    this.userOnScroll = fn;
  }

  private addInteractive() {
    this.updateInputZone();
    this.on(Phaser.Input.Events.POINTER_MOVE, this.onContentDrag.bind(this));
    this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_WHEEL, this.onMouseWheel.bind(this));
  }

  private updateInputZone() {
    const hasScroll = this.scrollThumb?.visible === true;
    const scrollW = hasScroll ? this.scrollThumb.displayHeight : 0;

    const inputWidth = this.maskWidth - scrollW;
    const inputHeight = this.maskHeight;

    const clickShape = new Phaser.Geom.Rectangle(0, 0, inputWidth, inputHeight);

    this.removeInteractive();

    // no input if cannot scroll
    if (!this.canScroll()) return;

    this.setInteractive({
      hitArea: clickShape,
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      useHandCursor: false,
    });
  }

  // content dragging
  private onContentDrag(pointer: Phaser.Input.Pointer) {
    // драггинг = pointerMove + isDown
    if (!pointer.isDown) return;
    // если скроллинг перетаскиванием thumb,
    // отключаем реакцию контента, чтобы не было конфликтов
    if (this.barScrolling) return;

    const delta = this.clampDelta(pointer.velocity.y / 5);
    this.updateScrollBar(delta);
    this.scrollBy(delta);
  }

  // mousewheel scrolling
  private onMouseWheel(pointer: Phaser.Input.Pointer) {
    // если скроллинг перетаскиванием thumb,
    // отключаем реакцию контента, чтобы не было конфликтов
    if (this.barScrolling) return;

    const delta = this.clampDelta(-pointer.deltaY);
    this.updateScrollBar(delta);
    this.scrollBy(delta);
  }

  private onScrollBarDragStart(pointer: Phaser.Input.Pointer) {
    this.barScrolling = true;
  }

  private onScrollBarDragEnd(pointer: Phaser.Input.Pointer) {
    this.barScrolling = false;
  }

  private onScrollBarDrag(pointer: Phaser.Input.Pointer) {
    const delta = pointer.y - WorldPosition.get(this).y - this.scrollThumb.y;
    const newOrdinate = this.scrollThumb.y + delta;
    this.scrollThumb.y = Phaser.Math.Clamp(
      newOrdinate,
      0,
      this.maskHeight - this.scrollThumb.displayHeight,
    );
    this.updateScrollByBar();
  }

  private scrollBy(delta: number) {
    this.child.y += delta;
    if (this.userOnScroll) this.userOnScroll();
  }

  private clampDelta(delta: number) {
    const negativeOffset = this.getNegativeOffset();
    let ordinate = this.child.y;
    const newOrdinate = Phaser.Math.Clamp(ordinate + delta, negativeOffset, 0);
    delta = newOrdinate - ordinate;
    return delta;
  }

  private getNegativeOffset() {
    let overFlow = this.maskHeight - this.contentHeight;
    const negativeOffset = overFlow <= 0 ? overFlow : 0;
    return negativeOffset;
  }

  private updateScrollBar(delta: number) {
    if (delta == 0) return;
    if (this.scrollThumb == null) return;

    const negativeOffset = this.getNegativeOffset();
    const k = Math.abs(negativeOffset / (this.maskHeight - this.scrollThumb.displayHeight));
    const barDelta = delta / k;
    this.scrollThumb.y -= barDelta;
  }

  private updateScrollByBar() {
    const activeZone = this.maskHeight - this.scrollThumb.displayHeight;
    const moveK = this.scrollThumb.y / activeZone;
    this.child.y = this.getNegativeOffset() * moveK;
    if (this.userOnScroll) this.userOnScroll();
  }

  private updateScrollBarVisibility() {
    this.scrollThumb?.setVisible(this.canScroll());
    this.scrollBar?.setVisible(this.canScroll());
    this.updateInputZone();
  }
}
