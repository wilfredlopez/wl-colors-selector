export function contrastText(
  hex: string,
  threshold = 166
): '#ffffff' | '#000000' {
  //#baa4af
  hex = hex.replace('#', '')
  //Check the length
  // FFFFFF
  // 11110000 11110000 11110000
  const red = parseInt(hex, 16) >>> 16 // parseInt(hex.substring(0,2), 16)
  const green = (parseInt(hex, 16) >>> 8) & 225 // parseInt(hex.substring(2,4), 16)
  const blue = parseInt(hex, 16) & 225 // parseInt(hex.substring(2,4), 16)
  const intensity = red * 0.299 + green * 0.587 + blue * 0.114
  //186
  if (intensity >= threshold) {
    return '#000000'
  } else {
    return '#ffffff'
  }
}
