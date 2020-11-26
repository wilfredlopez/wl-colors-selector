// import { ColorModels, ColorObject } from './'
// import { hex2Rgb, convert } from '@wilfredlopez/color-converter'

// const { hsb: rgb2hsb, hex: rgb2hex } = convert.rgb
// const { rgb: hsb2rgb } = convert.hsb

// /**
//  * Converts a HEX color to 'ColorObject`.
//  * @param model HEX.
//  * @param color The color in the HEX color model (3-6 digit) or HTML Color Names.
//  */
// export function toColorObject(
//   model: 'hex',
//   color: ColorObject['hex']
// ): ColorObject
// /**
//  * Converts a RGB color to 'ColorObject`.
//  * @param model RGB.
//  * @param color The color in the RGB color model.
//  */
// export function toColorObject(
//   model: 'rgb',
//   color: ColorObject['rgb']
// ): ColorObject
// /**
//  * Converts a HSB color to 'ColorObject`.
//  * @param model HSB.
//  * @param color The color in the HSB color model.
//  */
// export function toColorObject(
//   model: 'hsb',
//   color: ColorObject['hsb']
// ): ColorObject
// /**
//  * Converts the color in the selected color model to `ColorObject`.
//  * @param model Color model.
//  * @param color Color in the selected color model.
//  */
// export function toColorObject<M extends ColorModels, C extends ColorObject[M]>(
//   model: M,
//   color: C
// ): ColorObject {
//   let hex: ColorObject['hex']
//   let rgb: ColorObject['rgb']
//   let hsb: ColorObject['hsb']

//   if (model === 'hex') {
//     const newColor = color as ColorObject['hex']

//     if (!newColor.startsWith('#') || newColor.length === 4) {
//       hex = hex2Rgb(newColor, { format: 'css' })
//     } else if (newColor.length === 7) {
//       hex = newColor
//     } else {
//       hex = '#000000'
//     }
//     const { red, green, blue } = hex2Rgb(hex, { format: 'object' })
//     rgb = { red, green, blue }
//     const [hue, saturation, brightness] = rgb2hsb([red, green, blue])
//     hsb = { hue, saturation, brightness }
//   } else if (model === 'rgb') {
//     const newColor = color as ColorObject['rgb']

//     rgb = newColor
//     hex = rgb2hex([rgb.red, rgb.green, rgb.blue])
//     const [hue, saturation, brightness] = rgb2hsb([
//       rgb.red,
//       rgb.green,
//       rgb.blue,
//     ])
//     hsb = { hue, saturation, brightness }
//   } else {
//     const newColor = color as ColorObject['hsb']

//     hsb = newColor
//     const [red, green, blue] = hsb2rgb([
//       hsb.hue,
//       hsb.saturation,
//       hsb.brightness,
//     ])!
//     rgb = { red, green, blue }
//     hex = rgb2hex([rgb.red, rgb.green, rgb.blue])
//   }

//   return {
//     hsb,
//     rgb,
//     hex,
//   }
// }
export {}
