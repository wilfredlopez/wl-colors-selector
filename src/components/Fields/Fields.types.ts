import { ColorObject } from '../picker-utils'

export interface FieldsProps {
  color: ColorObject
  setColor: (color: ColorObject) => void
}

export interface SInputProps {
  last?: boolean
}
