import { ColorObject } from '../picker-utils'

export interface SaturationProps {
  width: number
  height: number
  color: ColorObject
  setColor: (color: ColorObject) => void
}
