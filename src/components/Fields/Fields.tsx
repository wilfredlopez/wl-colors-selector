import { useState, useEffect } from "react"
// import { ColorModels, isValidHex, toColorObject, isValidRgb, isValidHsb } from "../picker-utils"
import { canvasUtils, ColorModels, ColorObject } from "@wilfredlopez/color-converter"
import { ColorModelsDropDown } from "../ColorModelsDropDown"
const { isValidHex, toColorObject, isValidRgb, isValidHsb } = canvasUtils

export interface FieldsProps {
    color: ColorObject
    setColor: (color: ColorObject) => void
}


export const Fields = ({ color, setColor }: FieldsProps): JSX.Element => {
    const [value, setValue] = useState(color)
    const [inputted, setInputted] = useState(false)
    const [colorModel, setColorModel] = useState<ColorModels>("hex")

    useEffect(() => {
        if (!inputted) {
            setValue(color)
        }
    }, [inputted, color])

    const onFocus = (): void => {
        setInputted(true)
    }

    const onBlur = (): void => {
        setInputted(false)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const targetId = e.target.id
        const newValue = e.target.value

        if (colorModel === "hex") {
            if (isValidHex(newValue)) {
                setColor(toColorObject("hex", newValue))
                setValue({ ...color, hex: newValue })
            }
        } else if (colorModel === "rgb") {
            if (isValidRgb(newValue)) {
                const red = targetId === "red" ? Number(newValue) : color.rgb.red
                const green = targetId === "green" ? Number(newValue) : color.rgb.green
                const blue = targetId === "blue" ? Number(newValue) : color.rgb.blue


                setColor(toColorObject("rgb", { red, green, blue }))
            }
        } else if (colorModel === "hsb") {
            if (targetId === "hue") {
                if (isValidHsb(true, newValue)) {
                    const hue = Number(newValue)

                    const hsb = { ...color.hsb, h: hue }

                    setColor(toColorObject("hsb", hsb))
                }
            } else {
                if (isValidHsb(false, newValue)) {
                    const saturation = targetId === "saturation" ? Number(newValue) : color.hsb.saturation
                    const brightness = targetId === "brightness" ? Number(newValue) : color.hsb.brightness

                    const hsb = { ...color.hsb, s: saturation, b: brightness }

                    setColor(toColorObject("hsb", hsb))
                }
            }
        }
    }

    return (
        <div className="fields">
            <ColorModelsDropDown model={colorModel} setModel={setColorModel} />
            {colorModel === "hex" ? (
                <input className="fields-input"
                    style={{ backgroundColor: `${color.hex}33`, borderRadius: '0 5px 5px 0' }}
                    type="text"
                    value={value.hex}

                    onFocus={onFocus}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            ) : (
                    <>
                        <input className="fields-input"
                            id={colorModel === "rgb" ? "red" : "hue"}
                            style={{ backgroundColor: `${color.hex}33` }}
                            type="number"
                            value={(colorModel === "rgb" ? value.rgb.red : value.hsb.hue).toFixed()}
                            onChange={onChange}
                        />
                        <input className="fields-input"
                            id={colorModel === "rgb" ? "green" : "saturation"}
                            style={{ backgroundColor: `${color.hex}33` }}
                            type="number"
                            value={(colorModel === "rgb" ? value.rgb.green : value.hsb.saturation).toFixed()}
                            onChange={onChange}
                        />
                        <input className="fields-input"
                            id={colorModel === "rgb" ? "blue" : "brightness"}
                            style={{ backgroundColor: `${color.hex}33`, borderRadius: '0 5px 5px 0' }}
                            type="number"
                            value={(colorModel === "rgb" ? value.rgb.blue : value.hsb.brightness).toFixed()}
                            onChange={onChange}
                        />
                    </>
                )}
        </div>
    )
}