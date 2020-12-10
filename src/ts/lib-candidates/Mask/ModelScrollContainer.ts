import { ScrollableContent, ScrollContainer } from './ScrollContainer';

/**
 *  Не знаю пока почему, но zoom необходим для вычисления смещения ScrollView
 */
export class ModelScrollContainer extends ScrollContainer {
  constructor(
    scene: Phaser.Scene,
    child: ScrollableContent,
    width = 100,
    height = 100,
    protected zoom = 1,
  ) {
    super(scene, child, width * zoom, height * zoom);
  }

  protected getMaxOffsetX() {
    const maxOffsetX = super.getMaxOffsetX();
    return maxOffsetX / this.zoom;
  }

  protected getMaxOffsetY() {
    const maxOffsetY = super.getMaxOffsetY();
    return maxOffsetY / this.zoom;
  }
}
