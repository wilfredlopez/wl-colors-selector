import React, { useState, useEffect } from "react"
import { FieldsProps } from "./Fields.types"
import { ColorModels, isValidHex, toColorObject, isValidRgb, isValidHsb } from "../picker-utils"
import { ColorModelsDropDown } from "../ColorModelsDropDown"

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
                const red = targetId === "red" ? Number(newValue) : color.rgb.r
                const green = targetId === "green" ? Number(newValue) : color.rgb.g
                const blue = targetId === "blue" ? Number(newValue) : color.rgb.b

                const rgb = { r: red, g: green, b: blue }

                setColor(toColorObject("rgb", rgb))
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
                    const saturation = targetId === "saturation" ? Number(newValue) : color.hsb.s
                    const brightness = targetId === "brightness" ? Number(newValue) : color.hsb.b

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
                            value={(colorModel === "rgb" ? value.rgb.r : value.hsb.h).toFixed()}
                            onChange={onChange}
                        />
                        <input className="fields-input"
                            id={colorModel === "rgb" ? "green" : "saturation"}
                            style={{ backgroundColor: `${color.hex}33` }}
                            type="number"
                            value={(colorModel === "rgb" ? value.rgb.g : value.hsb.s).toFixed()}
                            onChange={onChange}
                        />
                        <input className="fields-input"
                            id={colorModel === "rgb" ? "blue" : "brightness"}
                            style={{ backgroundColor: `${color.hex}33`, borderRadius: '0 5px 5px 0' }}
                            type="number"
                            value={(colorModel === "rgb" ? value.rgb.b : value.hsb.b).toFixed()}
                            onChange={onChange}
                        />
                    </>
                )}
        </div>
    )
}