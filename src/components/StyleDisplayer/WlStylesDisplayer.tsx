import { ColorConverter } from '@wilfredlopez/color-converter'
import AnimatedButton from '../shared/AnimatedButton'
import { useCopyToClipboard } from 'react-use-light'
import { useState, useEffect, useCallback } from 'react'

interface Props {
    color: ColorConverter
}

export const WlStylesDisplayer = ({ color }: Props) => {
    const [copyState, setClipboard] = useCopyToClipboard()
    const [isCopied, setIsCopied] = useState(false)
    const [name, setName] = useState('primary')
    const getString = useCallback(() => {
        return `
        --wl-color-${name}: ${color.hexString()};
        --wl-color-${name}-rgb: ${color.rgbString()};
        --wl-color-${name}-contrast: ${color.getContrast().hexString()} ;
        --wl-color-${name}-contrast-rgb:${color.getContrast().rgbString()};
        --wl-color-${name}-shade: ${color.shade(12).hexString()};
        --wl-color-${name}-tint: ${color.tint(12).hexString()};
        `
    }, [color, name])


    function handleCopy() {
        setClipboard(getString())
    }

    useEffect(() => {
        setIsCopied(copyState.value !== undefined && copyState.value === getString())
    }, [copyState.value, getString])



    return (
        <code>
            <div className="code-content">
                <div className="input-container">

                    <input className="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <AnimatedButton
                        themeType="dark"
                        stylings={
                            {
                                backgroundColor: color.hexString(),
                                textColor: color.getContrast().hexString(),
                                textColorHover: color.getContrast().hexString(),
                                backgroundColorHover: color.shade(12).hexString()

                            }
                        }
                        style={{
                            margin: 0,
                            marginLeft: "auto"
                        }}
                        onClick={() => handleCopy()} >Copy {isCopied ? '(copied)' : ""}</AnimatedButton>
                </div>
                <div className="code-snippet">
                    {`root:{`}
                    <p>--wl-color-{name}: {color.hexString()}; <span className="color-bar" style={{ background: color.hexString() }}></span></p>
                    <p>--wl-color-{name}-rgb: {color.rgbString()}; <span className="color-bar" style={{ background: color.rgbString() }}></span></p>
                    <p>--wl-color-{name}-contrast: {color.getContrast().hexString()}; <span className="color-bar" style={{ background: color.getContrast().hexString() }}></span></p>
                    <p>--wl-color-{name}-contrast-rgb: {color.getContrast().rgbString()}; <span className="color-bar" style={{ background: color.getContrast().rgbString() }}></span></p>
                    <p>--wl-color-{name}-shade: {color.shade(12).hexString()}; <span className="color-bar" style={{ background: color.shade(12).hexString() }}></span></p>
                    <p>--wl-color-{name}-tint: {color.tint(12).hexString()}; <span className="color-bar" style={{ background: color.tint(12).hexString() }}></span></p>
                    {`}`}

                </div>
            </div>
        </code>
    )
}

