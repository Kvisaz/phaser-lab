interface Positionable {
  setPosition(x: number, y: number): any;
}

export class LayoutUtils {
  /**
   * Layout positionable objects in grid, row by row
   * @param objects
   * @param unitInRow
   * @param colStep - step between left edges of objects, in units for setPosition
   * @param rowStep - step between top edges of objects, in units for setPosition
   * @param centerLastRow - align last row if it is`nt full
   */
  static makeGridByRow(
    objects: Positionable[],
    unitInRow: number,
    colStep: number,
    rowStep: number,
    centerLastRow = false,
  ) {
    const amount = objects.length;

    const ROWS_AMOUNT = Math.ceil(amount / unitInRow);
    const LAST_ROW = ROWS_AMOUNT - 1;

    // last row is not full ?
    const hasNotFullLastRow = amount % unitInRow > 0;

    const LAST_ROW_OFFSET =
      hasNotFullLastRow && centerLastRow ? ((unitInRow - (amount % unitInRow)) * colStep) / 2 : 0;

    for (let i = 0; i < amount; i++) {
      const row = Math.floor(i / unitInRow);
      const col = i % unitInRow;

      const isLastRow = row == LAST_ROW;

      const colX = col * colStep;
      const x = isLastRow ? colX + LAST_ROW_OFFSET : colX;
      const y = row * rowStep;

      objects[i].setPosition(x, y);
    }
  }

  /**
   * Layout positionable objects in grid, col by col
   * @param objects
   * @param unitInColumn
   * @param colStep - step between left edges of objects, in units for setPosition
   * @param rowStep - step between top edges of objects, in units for setPosition
   * @param centerLastRow - align last row if it is`nt full
   */
  static makeGridByColumn(
    objects: Positionable[],
    unitInColumn: number,
    colStep: number,
    rowStep: number,
    centerLastRow = false,
  ) {
    const rowsAmount = unitInColumn;
    const unitInRow = Math.ceil(objects.length / rowsAmount);
    LayoutUtils.makeGridByRow(objects, unitInRow, colStep, rowStep, centerLastRow);
  }
}
