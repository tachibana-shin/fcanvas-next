import { Shape } from "../Shape"
import { pointInEllipse } from "../helpers/pointInEllipse"

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type PersonalAttrs = {
  radius: {
    x: number
    y: number
  }
  rotate?: number
}

export class Ellipse extends Shape<PersonalAttrs> {
  static readonly type = "Ellipse"
  static readonly _centroid = true

  protected _sceneFunc(context: CanvasRenderingContext2D) {
    context.ellipse(
      0,
      0,
      this.$.radius.x,
      this.$.radius.y,
      this.$.rotate ?? 0,
      0,
      Math.PI * 2
    )
    this.fillStrokeScene(context)
  }

  protected getSize() {
    return {
      width: this.$.radius.x * 2,
      height: this.$.radius.y * 2
    }
  }

  public isPressedPoint(x: number, y: number) {
    return pointInEllipse(
      x,
      y,
      this.$.x,
      this.$.y,
      this.$.radius.x + this.getHitStroke(),
      this.$.radius.y + this.getHitStroke()
    )
  }
}
