import { Saturation } from "../Saturation"
import { HueBar } from "../HueBar"
import { Fields } from "../Fields"
// import { ColorObject } from '../picker-utils/index'
import { ColorObject } from '@wilfredlopez/color-converter'
import './color-picker.css'

export interface ColorPickerProps {
    /**
     * The width of the color picker.
     */
    width: number
    /**
     * The height of the color picker.
     */
    height?: number
    /**
     * Color in the `ColorObject`.
     */
    color: ColorObject
    /**
     * The function that accepts the updated `ColorObject` as a single argument.
     */
    onChange: (color: ColorObject) => void
}

export interface ColorPickerBodyProps {
    width: number
}


const ColorPicker = ({ width, height = width, color, onChange }: ColorPickerProps): JSX.Element => (
    <div className="color-picker">
        <Saturation width={width} height={height} color={color} setColor={onChange} />
        <div className="color-picker-body" style={{
            width: width + 'px'
        }}>
            <HueBar width={width - 5} color={color} setColor={onChange} />
            <Fields color={color} setColor={onChange} />
        </div>
    </div>
)

export default ColorPicker