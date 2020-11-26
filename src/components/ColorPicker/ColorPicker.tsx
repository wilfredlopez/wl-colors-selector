import { ColorPickerProps } from "./ColorPicker.types"
import { Saturation } from "../Saturation"
import { HueBar } from "../HueBar"
import { Fields } from "../Fields"

import './color-picker.css'

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