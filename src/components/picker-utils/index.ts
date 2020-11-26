import { toColorObject } from './toColorObject'

export interface ColorObject {
  hsb: {
    h: number
    s: number
    b: number
  }
  rgb: {
    r: number
    g: number
    b: number
  }
  hex: string
}

export type ColorModels = 'hex' | 'rgb' | 'hsb'

/**
 * Converts `ColorObject` to coordinates.
 * @param color `ColorObject`.
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 */
export function getCoordinatesByColor(
  color: ColorObject,
  width: number,
  height: number
): [number, number] {
  const { s, b } = color.hsb

  const X = width / 100
  const Y = height / 100

  const x = s * X
  const y = (100 - b) * Y

  return [x, y]
}

export interface MoveAtCoordinate {
  value: number
  shift: number
  min: number
  max: number
}

/**
 * Moves the x-coordinate based on the shift.
 * @param x X-coordinate.
 */
export function moveAt(x: MoveAtCoordinate): [number]
/**
 * Moves the x and y coordinates based on the shift.
 * @param x X-coordinate.
 * @param y Y-coordinate.
 */
export function moveAt(
  x: MoveAtCoordinate,
  y: MoveAtCoordinate
): [number, number]
/**
 * Moves the x and y coordinates based on the shift.
 * @param x X-coordinate.
 * @param y Y-coordinate.
 */
export function moveAt(
  x: MoveAtCoordinate,
  y?: MoveAtCoordinate
): [number] | [number, number] {
  const X = x.value - x.shift
  const newX = X < x.min ? x.min : X > x.max ? x.max : X

  if (y) {
    const Y = y.value - y.shift
    const newY = Y < y.min ? y.min : Y > y.max ? y.max : Y

    return [newX, newY]
  }

  return [newX]
}

/**
 * Converts coordinates to the `ColorObject`.
 * @param hue Hue.
 * @param x X-coordinate.
 * @param y Y-coordinate.
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 */
export function getColorByCoordinates(
  hue: number,
  x: number,
  y: number,
  width: number,
  height: number
): ColorObject {
  const X = width / 100
  const Y = height / 100

  const s = x < 0 ? 0 : x > width ? 100 : x / X
  const b = y < 0 ? 0 : y > height ? 100 : y / Y

  const saturation = s
  const brightness = 100 - b

  const hsb = { h: hue, s: saturation, b: brightness }

  return toColorObject('hsb', hsb)
}

/**
 * Converts hue to coordinates.
 * @param hue Hue.
 * @param width The width of the canvas.
 */
export function getCoordinatesByHue(hue: number, width: number): number {
  let x = (hue / 360) * width

  if (hue <= 0) {
    x = 0
  } else if (hue >= 360) {
    x = width
  }

  return x
}

/**
 * Converts coordinates to hue.
 * @param x X-coordinate.
 * @param width The width of the canvas.
 */
export function getHueByCoordinates(x: number, width: number): number {
  let h = (x / width) * 360

  if (x <= 0) {
    h = 0
  } else if (x >= width) {
    h = 360
  }

  return h
}

/**
 * Changes the hue of `ColorObject`.
 * @param color `ColorObject`.
 * @param newHue New hue.
 */
export function changeHue(color: ColorObject, newHue: number): ColorObject {
  const hsb = { ...color.hsb, h: newHue }

  return toColorObject('hsb', hsb)
}

/**
 * Checking the color in HEX for validity.
 * @param value The value in the HEX format or HTML Color Names.
 */
export function isValidHex(value: string): boolean {
  if (value.startsWith('#')) {
    value = value.slice(1)

    if (value.length <= 6) {
      return /[A-Fa-f0-9]/.test(value[value.length - 1])
    } else {
      return false
    }
  }

  return (/\w/.test(value) && !/\d/.test(value)) || value === ''
}
/**
 * Checking the color in RGB for validity.
 * @param value The value of red, green, or blue.
 */
export function isValidRgb(value: string): boolean {
  const result =
    (/\d/.test(value) && Number(value) <= 255) ||
    (value === '' && !/\s/.test(value))

  return result
}

/**
 * Checking the color in HSB for validity.
 * @param isHue The value is a hue?
 * @param value The value of hue, saturation, or brightness.
 */
export function isValidHsb(isHue: boolean, value: string): boolean {
  const condition = isHue ? 360 : 100
  const result =
    (/\d/.test(value) && Number(value) <= condition) ||
    (value === '' && !/\s/.test(value))

  return result
}
export { toColorObject } from './toColorObject'
