export function toCssClass<T extends Color, V extends Variant>(
  color: T,
  variant: V
): `${T}${Capitalize<V>}` {
  const Up = variant[0].toUpperCase()
  const rest = variant.slice(1)

  return `${color}${Up}${rest}` as `${T}${Capitalize<V>}`
}

const dangerContained = toCssClass('danger', 'contained')
console.log({ dangerContained })

export type Color = 'primary' | 'secondary' | 'danger'
export type Variant = 'outlined' | 'filled' | 'contained' | 'default'

export type ColorClass = `${Color}${Capitalize<Variant>}`
