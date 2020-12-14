import React, { useState, useEffect, useCallback } from "react"
// import { ColorModels, isValidHex, toColorObject, isValidRgb, isValidHsb } from "../picker-utils"
import { canvasUtils, ColorConverter, ColorModels } from "@wilfredlopez/color-converter"
import { ColorModelsDropDown } from "../ColorModelsDropDown"
const { isValidHex, toColorObject, isValidRgb, isValidHsb } = canvasUtils

export interface FieldsProps {
    color: ColorConverter
    setColor: (color: ColorConverter) => void
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

    const onFocus = useCallback((): void => {
        setInputted(true)
    }, [])

    const onBlur = useCallback((): void => {
        setInputted(false)
    }, [])

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const targetId = e.target.id
        const newValue = e.target.value
        if (colorModel === "hex") {
            if (isValidHex(newValue)) {
                const updated = new ColorConverter(newValue)
                setColor(new ColorConverter(newValue))
                setValue(updated)
            }
        } else if (colorModel === "rgb") {
            if (isValidRgb(newValue)) {
                const red = targetId === "red" ? Number(newValue) : color.rgb[0]
                const green = targetId === "green" ? Number(newValue) : color.rgb[1]
                const blue = targetId === "blue" ? Number(newValue) : color.rgb[2]
                const updated = new ColorConverter(toColorObject("rgb", { red, green, blue }).hex)
                setColor(updated)
                setValue(updated)
            }
        } else if (colorModel === "hsb") {
            console.log(e.target.value)
            console.log({ colorModel, targetId, color })
            if (targetId === "hue") {
                if (isValidHsb(true, newValue)) {
                    const hue = Number(newValue)

                    const hsb = { ...color.toHsvObject(), h: hue }
                    const newCol = toColorObject("hsb", hsb)
                    setColor(new ColorConverter(newCol.hex))
                    setValue(new ColorConverter(newCol.hex))
                }
            } else {
                if (isValidHsb(false, newValue)) {
                    const saturation = targetId === "saturation" ? Number(newValue) : color.toHsvObject().saturation
                    const brightness = targetId === "brightness" ? Number(newValue) : color.toHsvObject().brightness

                    const hsb = { ...color.toHsvObject(), s: saturation, b: brightness }

                    setColor(new ColorConverter(toColorObject("hsb", hsb).hex))
                }
            }
        }
    }, [color, colorModel, setColor])

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
                            value={(colorModel === "rgb" ? value.rgb[0] : value.toHsvObject().hue).toFixed()}
                            onChange={onChange}
                        />
                        <input className="fields-input"
                            id={colorModel === "rgb" ? "green" : "saturation"}
                            style={{ backgroundColor: `${color.hex}33` }}
                            type="number"
                            value={(colorModel === "rgb" ? value.rgb[1] : value.toHsvObject().saturation).toFixed()}
                            onChange={onChange}
                        />
                        <input className="fields-input"
                            id={colorModel === "rgb" ? "blue" : "brightness"}
                            style={{ backgroundColor: `${color.hex}33`, borderRadius: '0 5px 5px 0' }}
                            type="number"
                            value={(colorModel === "rgb" ? value.rgb[2] : value.toHsvObject().brightness).toFixed()}
                            onChange={onChange}
                        />
                    </>
                )}
        </div>
    )
}