import Ball from './Ball'

function getRandomHslColor() {
  return `hsl(${Math.random() * 360}, 50%, 50%)`
}

function randomIntFromRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
  //   return Math.floor(Math.random() * (max - min + 1)) + min
  //   return (end - start) * Math.random() + start
}

interface BallsMachineProps {
  ctx: CanvasRenderingContext2D
  autoOn?: boolean
  MAX_BALLS?: number
  MIN_BALLS?: number
  POWER?: number
  RADIUS?: number
  backgroundColor?: string
}

interface StartLocation {
  x: number
  y: number
}

export default class BallsMachine {
  private _BALLS: Ball[]
  private _ANIMATION_ON: boolean
  ctx: CanvasRenderingContext2D
  MAX_BALLS: number
  MIN_BALLS: number
  POWER: number
  RADIUS: number
  backgroundColor: string
  private _frameId: number | undefined
  constructor({
    ctx,
    MAX_BALLS = 800,
    MIN_BALLS = 300,
    POWER = 15,
    RADIUS = 30, //size
    autoOn = true,
    backgroundColor = 'rgba(0,0,0,0.5)',
  }: BallsMachineProps) {
    this._BALLS = []
    this.ctx = ctx
    this.POWER = POWER
    this.RADIUS = RADIUS
    this._ANIMATION_ON = autoOn
    this.backgroundColor = backgroundColor
    this.MAX_BALLS = MAX_BALLS
    this.MIN_BALLS = MIN_BALLS
    if (this.MAX_BALLS <= this.MIN_BALLS) {
      this.MIN_BALLS = Math.round(this.MAX_BALLS / 2)
    }
  }
  get _CANVAS_WIDTH() {
    return this.ctx.canvas.width
  }

  get _CANVAS_HEIGT() {
    return this.ctx.canvas.height
  }
  get BALLS() {
    const Copy = this._BALLS.map(p => new Ball({ ...p }))
    return Copy
  }

  public stopAnimate() {
    this._ANIMATION_ON = false
  }

  public animate(location?: StartLocation) {
    this._ANIMATION_ON = true
    const ctx = this.ctx
    if (typeof this._frameId !== 'undefined') {
      cancelAnimationFrame(this._frameId)
    }
    let id = this._frameId
    if (location) {
      this._createParticles(location)
    }
    const loop = () => {
      if (typeof id !== 'undefined') {
        cancelAnimationFrame(id)
      }
      if (!this._ANIMATION_ON) {
        return
      }
      this._frameId = requestAnimationFrame(loop)
      id = this._frameId
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.fillStyle = this.backgroundColor //'rgba(0,0,0,0.5)'
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      //   this._autoGenerate()
      for (let [index, particle] of this._BALLS.entries()) {
        particle.update()
        if (particle.alpha <= 0.2) {
          this._BALLS.splice(index, 1)
        }
      }
    }
    this._autoGenerate()
    loop()
  }

  private _autoGenerate() {
    if (this._BALLS.length - 1 < this.MIN_BALLS) {
      this._createParticles()
    }
  }

  private _getVelocity(i: number) {
    const angleIncrement = (Math.PI * 2) / this.MAX_BALLS

    return {
      x: Math.cos(angleIncrement * i) * Math.random() * this.POWER,
      //   x: Math.cos(angleIncrement * i) * this.POWER,
      y: Math.sin(angleIncrement * i) * Math.random() * this.POWER,
      //   y: Math.sin(angleIncrement * i) * this.POWER,
    }
  }

  private _createParticles(location?: { x: number; y: number }) {
    let x = randomIntFromRange(this.RADIUS, this._CANVAS_WIDTH - this.RADIUS)
    let y = randomIntFromRange(this.RADIUS, this._CANVAS_HEIGT - this.RADIUS)
    // let x = (this._CANVAS_WIDTH / 2) * Math.random()
    // let y = (this._CANVAS_HEIGT / 2) * Math.random()
    if (location) {
      x = location.x
      y = location.y
    }

    // const MAX_PARTICLES = this.MAX_BALLS
    const MAX_PARTICLES = this.MAX_BALLS - this._BALLS.length

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const radius = randomIntFromRange(1, this.RADIUS)
      this._BALLS.push(
        new Ball({
          color: getRandomHslColor(),
          ctx: this.ctx,
          radius: radius,
          velocity: this._getVelocity(i),
          x,
          y,
        })
      )
    }
  }
}
