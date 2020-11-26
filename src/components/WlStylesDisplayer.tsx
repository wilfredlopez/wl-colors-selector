import { ColorConverter } from '@wilfredlopez/color-converter'
import AnimatedButton from './shared/AnimatedButton'
import { useCopyToClipboard } from 'react-use-light'
import { useState, useEffect, useCallback } from 'react'

interface Props {
    color: ColorConverter
}

const WlStylesDisplayer = ({ color }: Props) => {
    const [copyState, setClipboard] = useCopyToClipboard()
    const [isCopied, setIsCopied] = useState(false)
    const [name, setName] = useState('primary')
    const getString = useCallback(() => {
        return `
        --wl-color-primary: #${color.hex};
        --wl-color-primary-rgb: ${color.rgbString()};
        --wl-color-primary-contrast: ${color.getContrast().hex} ;
        --wl-color-primary-contrast-rgb:${color.getContrast().rgbString()};
        --wl-color-primary-shade: #${color.shade(12).hex};
        --wl-color-primary-tint: #${color.tint(12).hex};
        `
    }, [color])


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
                                backgroundColor: `#${color.hex}`,
                                textColor: color.getContrast().hex,
                                textColorHover: color.getContrast().hex,
                                backgroundColorHover: `#${color.shade(12).hex}`

                            }
                        }
                        style={{
                            margin: 0,
                            marginLeft: "auto"
                        }}
                        onClick={() => handleCopy()} >Copy {isCopied ? '(copied)' : ""}</AnimatedButton>
                </div>

                <div>
                    {`root:{`}
                    <p>--wl-color-{name}: #{color.hex}; <span className="color-bar" style={{ background: "#" + color.hex }}></span></p>
                    <p>--wl-color-{name}-rgb: {color.rgbString()}; <span className="color-bar" style={{ background: color.rgbString() }}></span></p>
                    <p>--wl-color-{name}-contrast: {color.getContrast().hex}; <span className="color-bar" style={{ background: color.getContrast().hex }}></span></p>
                    <p>--wl-color-{name}-contrast-rgb: {color.getContrast().rgbString()}; <span className="color-bar" style={{ background: color.getContrast().rgbString() }}></span></p>
                    <p>--wl-color-{name}-shade: #{color.shade(12).hex}; <span className="color-bar" style={{ background: "#" + color.shade(12).hex }}></span></p>
                    <p>--wl-color-{name}-tint: #{color.tint(12).hex}; <span className="color-bar" style={{ background: "#" + color.tint(12).hex }}></span></p>
                    {`}`}

                </div>
            </div>
        </code>
    )
}

export default WlStylesDisplayer
