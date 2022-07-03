import { Layer } from "./Layer"
import { Stage } from "./Stage"
import { Circle } from "./shapes/Circle"

const stage = new Stage({
  container: "app"
})
const layer = new Layer()
stage.add(layer)

const circle = new Circle({
  x: 10,
  y: 10,
  radius: 10,
  stroke: "black"
})

layer.add(circle)

layer.batchDraw()

circle.on("click", () => {
  console.log("click")
})
