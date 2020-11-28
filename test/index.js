const GRAVITY = 0.005
const FRICTION = 0.99

class Particle {
  constructor({ color, radius, velocity, x, y, ctx }) {
    this.color = color
    this.radius = radius
    this.velocity = velocity
    this.x = x
    this.y = y
    this.ctx = ctx
    this.alpha = 1
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
    c.closePath()
    c.restore()
  }
  update() {
    this.draw()
    this.velocity.y += GRAVITY
    this.velocity.y *= FRICTION
    this.velocity.x *= FRICTION
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.alpha -= 0.005
  }
}

function getRandomHslColor() {
  return `hsl(${Math.random() * 360}, 50%, 50%)`
}

class ParticleMachine {
  constructor({
    ctx,
    MAX_PARTICLES = 400,
    MIN_PARTICLES = 100,
    POWER = 5,
    RADIUS = 3,
    autoOn = true,
    backgroundColor = 'rgba(0,0,0,0.05)',
  }) {
    this._PARTICLES = []
    this.ctx = ctx
    this._CANVAS_WIDTH = ctx.canvas.width
    this._CANVAS_HEIGT = ctx.canvas.height
    this.POWER = POWER
    this.RADIUS = RADIUS
    this._ANIMATION_ON = autoOn
    this.backgroundColor = backgroundColor
    this.MAX_PARTICLES = MAX_PARTICLES
    this.MIN_PARTICLES = MIN_PARTICLES
    if (this.MAX_PARTICLES <= this.MIN_PARTICLES) {
      this.MIN_PARTICLES = Math.round(this.MAX_PARTICLES / 2)
    }
  }

  get PARTICLES() {
    const Copy = this._PARTICLES.map(p => new Particle({ ...p }))
    return Copy
  }

  stopAnimate() {
    this._ANIMATION_ON = false
  }

  animate() {
    this._ANIMATION_ON = true
    const ctx = this.ctx
    let id
    const loop = () => {
      if (typeof id !== 'undefined') {
        cancelAnimationFrame(id)
      }
      if (!this._ANIMATION_ON) {
        return
      }

      id = requestAnimationFrame(loop)
      ctx.fillStyle = this.backgroundColor //'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      for (let [index, particle] of this._PARTICLES.entries()) {
        if (particle.alpha <= 0) {
          this._PARTICLES.splice(index, 1)
        }
        particle.update()
      }
      this._autoGenerate()
    }
    loop()
  }

  _autoGenerate() {
    if (this._PARTICLES.length < this.MIN_PARTICLES) {
      this._createParticles()
    }
  }

  _getVelocity(i) {
    const angleIncrement = (Math.PI * 2) / this.MAX_PARTICLES
    return {
      x: Math.cos(angleIncrement * i) * Math.random() * this.POWER,
      y: Math.sin(angleIncrement * i) * Math.random() * this.POWER,
    }
  }

  _createParticles() {
    const MAX_PARTICLES = this.MAX_PARTICLES
    const x = (this._CANVAS_WIDTH / 2) * Math.random()
    const y = (this._CANVAS_HEIGT / 2) * Math.random()

    for (let i = 0; i < MAX_PARTICLES; i++) {
      this._PARTICLES.push(
        new Particle({
          color: getRandomHslColor(),
          ctx: this.ctx,
          radius: this.RADIUS,
          velocity: this._getVelocity(i),
          x,
          y,
        })
      )
    }
  }
}

//FUNCIONALITY

const innerWidth = window.innerWidth
const innerHeight = window.innerHeight
const canvas = document.getElementById('my-canvas')

canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d')

const machine = new ParticleMachine({ ctx })

machine.animate()

window.addEventListener('resize', () => {
  console.log('seeting with')
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  canvas.width = innerWidth
  canvas.height = innerHeight
})
