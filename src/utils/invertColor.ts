import { hex2rgb } from '../components/picker-utils/convert'
export function invertColor(hex: string, bw: number = 0) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  var r: string | number = parseInt(hex.slice(0, 2), 16),
    g: string | number = parseInt(hex.slice(2, 4), 16),
    b: string | number = parseInt(hex.slice(4, 6), 16)
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF'
  }
  // invert color components
  r = (255 - r).toString(16)
  g = (255 - g).toString(16)
  b = (255 - b).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b)
}

function padZero(str: string | number, len: number = 2) {
  len = len || 2
  const zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}

export function invertHex(hex: string) {
  return '#' + (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1)
}

export function colorContrast(
  colorHex: string | undefined,
  threshold: number = 116
): string {
  if (colorHex === undefined) {
    return '#000000'
  }

  const rgb = hex2rgb(colorHex)

  if (rgb === undefined) {
    return '#000000'
  }

  return rgbToYIQ(rgb) >= threshold ? '#000000' : '#ffffff'
}

function rgbToYIQ({ r, g, b }: { r: number; g: number; b: number }): number {
  return (r * 299 + g * 587 + b * 114) / 1000
}
