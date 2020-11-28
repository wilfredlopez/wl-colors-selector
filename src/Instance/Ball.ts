import { VelosityInterface, PositionalObject } from './interfaces'
import { detectCollition } from './detectCollition'

export interface BallPros {
  x: number
  y: number
  radius: number
  color: string
  velocity: VelosityInterface
  ctx: CanvasRenderingContext2D
  alphaRatio?: number
}

export default class Ball implements BallPros, PositionalObject {
  x: number
  y: number
  radius: number
  color: string
  ctx: CanvasRenderingContext2D
  velocity: VelosityInterface
  alpha: number
  alphaRatio: number
  constructor({
    color,
    radius,
    velocity,
    x,
    y,
    ctx,
    alphaRatio = 0.001,
  }: BallPros) {
    this.color = color
    this.radius = radius
    this.velocity = velocity
    this.x = x
    this.y = y
    this.ctx = ctx
    this.alpha = 1
    this.alphaRatio = alphaRatio
  }

  draw() {
    if (this.alpha <= 0) {
      return
    }
    const c = this.ctx
    c.save()
    c.globalAlpha = this.alpha
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
    c.restore()
  }
  update() {
    const p = detectCollition(this, this.ctx.canvas)
    this.velocity.x = p.velocity.x
    this.velocity.y = p.velocity.y
    this.x = p.x
    this.y = p.y
    this.alpha -= this.alphaRatio
    this.draw()
  }
}
