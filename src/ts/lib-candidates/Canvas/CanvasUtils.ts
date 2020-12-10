export class CanvasUtils {
  static circle(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  }

  static shadow(ctx: CanvasRenderingContext2D, color: string, blur: number, x: number, y: number) {
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = x;
    ctx.shadowOffsetY = y;
  }

  static roundedRectangle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    rounded: number,
  ) {
    const radiansInCircle = 2 * Math.PI;
    const halfRadians = (2 * Math.PI) / 2;
    const quarterRadians = (2 * Math.PI) / 4;

    ctx.beginPath();

    // top left arc
    ctx.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true);

    // line from top left to bottom left
    ctx.lineTo(x, y + height - rounded);

    // bottom left arc`
    ctx.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true);

    // line from bottom left to bottom right
    ctx.lineTo(x + width - rounded, y + height);

    // bottom right arc
    ctx.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true);

    // line from bottom right to top right
    ctx.lineTo(x + width, y + rounded);

    // top right arc
    ctx.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true);

    // line from top right to top left
    ctx.lineTo(x + rounded, y);
  }
}

interface CtxDraw {
  (ctx: CanvasRenderingContext2D): any;
}
