
export class LayoutManager {
  constructor(public scene: Phaser.Scene) {

  }

  methods() {
    return {
      padding: this.padding.bind(this),
      row: this.row.bind(this),
      column: this.column.bind(this),
    };
  }

  /**
   *  @method padding - Создает пустой элемент для паддинга
   *  @param width {number}
   *  @param height {number}
   */
  padding(width: number, height: number): LayoutElement {
    const zone = new Phaser.GameObjects.Zone(this.scene, 0, 0, width, height);
    zone.setOrigin(0,0);
    return zone;
  }

  /**
   *  @method padding - Создает пустой элемент для паддинга
   *  @param width {number}
   *  @param height {number}
   */
  rectangle(width: number, height: number, color = '#dedede'): LayoutElement {
    const numColor = Phaser.Display.Color.HexStringToColor(color).color;
    const rect = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, width, height, numColor);
    rect.setOrigin(0,0);
    return rect;
  }

  /**
   *  @method row - Создает контейнер по горизонтали
   *  все выровнено по центр
   *  @param elements {LayoutElement[]}
   */
  row(elements: LayoutElement[]): LayoutContainerElement {
    const container = new Phaser.GameObjects.Container(this.scene, 0, 0);
    let nextX = 0;
    let nextY = 0;
    // выравниваем элементы друг за другом
    elements.forEach(element => {
      this.setPosition(element, nextX, nextY);
      const { width, height } = element.getBounds();
      nextX += width;
      container.add(element);
    });
    // выясняем высоту
    return container;
  }

  /**
   * @method column - Создает контейнер по вертикали
   * все выровнено по центру
   * @param elements {LayoutElement[]}
   */
  column(elements: LayoutElement[], align = 0.5): LayoutContainerElement {
    const container = new Phaser.GameObjects.Container(this.scene, 0, 0);

    // вычисляем размеры
    elements.forEach(element => element.setPosition(0, 0));
    container.add(elements);
    const bounds = {
      width: this.getWidth(container),
      height: this.getHeight(container),
    };

    // выстраиваем друг за другом
    let nextX = 0;
    let nextY = 0;
    elements.forEach(element => {
      const width = this.getWidth(element);
      const height = this.getHeight(element);
      nextX = (bounds.width - width) * align;
      this.setPosition(element, nextX, nextY);
      nextY += height;
    });
    return container;
  }

  setPosition(element:LayoutElement, x: number, y:number) {
    element.setPosition(x,y);
  }

  getWidth(element:LayoutElement):number {
    return element.getBounds().width;
  }

  getHeight(element:LayoutElement):number {
    return element.getBounds().height;
  }
}

export interface LayoutElement extends Phaser.GameObjects.GameObject {
  setPosition(x: number, y: number): any;
  getBounds(): Phaser.Geom.Rectangle;
}

export interface LayoutContainerElement extends LayoutElement {
  getAll(): Phaser.GameObjects.GameObject[];
}