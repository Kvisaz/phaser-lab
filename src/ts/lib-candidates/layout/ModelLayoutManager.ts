import { LayoutElement, LayoutManager } from './LayoutManager'
import { ModelScene } from '~/models';

export class ModelLayoutManager extends LayoutManager {

  constructor(public scene: ModelScene) {
    super(scene);
  }

  get zoom(): number {
    return this.scene.game.zoom;
  }

  /**
   * Если element.scene?.game?.zoom!=null - у нас Model-объект с
   * особым setPosition
   * @param element {LayoutElement}
   */
  getModelZoom(element: LayoutElement): number {
    // @ts-ignore
    const isModel = element.initX != null && element.initY != null;

    // @ts-ignore
    const modelZoom = isModel && element.scene?.game?.zoom ?? 1;

    return isModel ? modelZoom : 1;
  }

  padding(width: number, height: number): LayoutElement {
    return super.padding(width * this.zoom, height * this.zoom);
  }

  rectangle(width: number, height: number, color: string = '#dedede'): LayoutElement {
    return super.rectangle(width * this.zoom, height * this.zoom, color);
  }

  setPosition(element: LayoutElement, x: number, y: number) {
    const zoom = this.getModelZoom(element);
    super.setPosition(element, x / zoom, y / zoom);
  }
}