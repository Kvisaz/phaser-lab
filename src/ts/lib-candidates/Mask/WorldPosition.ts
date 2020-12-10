export class WorldPosition {
  // operation time = ~0-1ms на ноутбуке 2014 года
  static get(object: Phaser.GameObjects.Components.Transform): IWorldPosition {
    const tempMatrix = new Phaser.GameObjects.Components.TransformMatrix();
    const tempParentMatrix = new Phaser.GameObjects.Components.TransformMatrix();
    object.getWorldTransformMatrix(tempMatrix, tempParentMatrix);

    // @ts-ignore
    const { translateX, translateY, scaleX, scaleY, rotation } = tempMatrix.decomposeMatrix();
    return {
      x: translateX,
      y: translateY,
      scaleX: scaleX,
      scaleY: scaleY,
      rotation: rotation,
    };
  }
}

export interface IWorldPosition {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}
