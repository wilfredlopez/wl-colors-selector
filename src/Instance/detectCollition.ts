import { PositionalObject } from './interfaces'

const FRICTION = 0.91
export function detectCollition(
  obj: PositionalObject,
  canvas: HTMLCanvasElement
) {
  const newPosition = {
    x: obj.x,
    y: obj.y,
    velocity: {
      x: obj.velocity.x,
      y: obj.velocity.y,
    },
  }
  if (obj.y + obj.radius + obj.velocity.y >= canvas.height) {
    newPosition.velocity.y = -obj.velocity.y * FRICTION
  } else {
    newPosition.velocity.y += 0.6
  }
  if (obj.x + obj.radius > canvas.width || obj.x - obj.radius <= 0) {
    newPosition.velocity.x = -obj.velocity.x
  } else {
  }
  newPosition.x += newPosition.velocity.x
  newPosition.y += newPosition.velocity.y

  return newPosition
}
