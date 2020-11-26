import { ColorObject } from '.'

/**
 * Converts 3 digit HEX and HTML Color Names to 6 digit HEX.
 * @param color 3 digit HEX or HTML Color Names.
 */
export function toHex(color: string): string {
  const ctx = document.createElement('canvas').getContext('2d')

  if (!ctx) {
    throw new Error('2d context not supported or canvas already initialized')
  }

  ctx.fillStyle = color

  return ctx.fillStyle
}

/**
 * Converts HEX to RGB.
 * @param hex 6 digit HEX.
 */
export function hex2rgb(hex: string): ColorObject['rgb'] {
  const hexInt = parseInt(hex.slice(1), 16)
  const R = (hexInt >> 16) & 255
  const G = (hexInt >> 8) & 255
  const B = hexInt & 255

  return {
    r: R,
    g: G,
    b: B,
  }
}

/**
 * Converts RGB to HEX.
 * @param r Red.
 * @param g Green.
 * @param b Blue.
 */
export function rgb2hex(r: number, g: number, b: number): ColorObject['hex'] {
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`

  return hex
}

/**
 * Converts HSB to RGB.
 * @param hue Hue.
 * @param saturation Saturation.
 * @param brightness Brightness.
 */
export function hsb2rgb(
  hue: number,
  saturation: number,
  brightness: number
): ColorObject['rgb'] {
  const h = hue
  const s = saturation / 100
  const b = brightness / 100

  const i = ~~(h / 60)
  const f = h / 60 - i
  const p = b * (1 - s)
  const q = b * (1 - s * f)
  const t = b * (1 - s * (1 - f))

  let R: number
  let G: number
  let B: number

  switch (i) {
    case 0:
    case 6:
    default:
      R = b
      G = t
      B = p
      break
    case 1:
      R = q
      G = b
      B = p
      break
    case 2:
      R = p
      G = b
      B = t
      break
    case 3:
      R = p
      G = q
      B = b
      break
    case 4:
      R = t
      G = p
      B = b
      break
    case 5:
      R = b
      G = p
      B = q
      break
  }

  return {
    r: Math.round(R * 255),
    g: Math.round(G * 255),
    b: Math.round(B * 255),
  }
}

/**
 * Converts RGB to HSB.
 * @param r Red.
 * @param g Green.
 * @param b Blue.
 */
export function rgb2hsb(r: number, g: number, b: number): ColorObject['hsb'] {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  const d = max - min

  let H = 0
  const S = max === 0 ? 0 : d / max
  const B = max

  if (max !== min) {
    switch (max) {
      case r:
        H = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        H = (b - r) / d + 2
        break
      case b:
        H = (r - g) / d + 4
        break
    }

    H /= 6
  }

  return {
    h: H * 360,
    s: S * 100,
    b: B * 100,
  }
}
