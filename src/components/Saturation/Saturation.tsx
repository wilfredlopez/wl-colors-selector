import { useRef, useMemo, useEffect, useCallback } from "react"
// import { getCoordinatesByColor, moveAt, getColorByCoordinates, ColorObject } from "../picker-utils"
import { canvasUtils, ColorConverter } from '@wilfredlopez/color-converter'
const { getCoordinatesByColor, moveAt, getColorByCoordinates, } = canvasUtils

export interface SaturationProps {
    width: number
    height: number
    color: ColorConverter
    setColor: (color: ColorConverter) => void
}


export const Saturation = ({ width, height, color, setColor }: SaturationProps): JSX.Element => {
    const paletteRef = useRef<HTMLCanvasElement>(null)

    const cursorPosition = useMemo(() => {
        const [x, y] = getCoordinatesByColor({
            hex: color.hex,
            hsb: color.toHsvObject(),
            rgb: {
                red: color.rgb[0],
                green: color.rgb[1],
                blue: color.rgb[2],
            }
        }, width, height)

        return { x, y }
    }, [color, width, height])

    useEffect(() => {
        const drawPalette = (): void => {
            if (paletteRef.current) {
                const ctx = paletteRef.current.getContext("2d")

                if (ctx) {
                    const saturation = ctx.createLinearGradient(0, height / 2, width, height / 2)

                    saturation.addColorStop(0, "white")
                    saturation.addColorStop(1, `hsl(${color.toHslObject().hue}, 100%, 50%)`)

                    ctx.fillStyle = saturation
                    ctx.fillRect(0, 0, width, height)

                    const brightness = ctx.createLinearGradient(width / 2, 0, width / 2, height)

                    brightness.addColorStop(0, "transparent")
                    brightness.addColorStop(1, "black")

                    ctx.fillStyle = brightness
                    ctx.fillRect(0, 0, width, height)
                }
            }
        }

        if (paletteRef.current) drawPalette()
    }, [width, height, color])

    const moveCursor = useCallback((x: number, y: number, shiftX: number, shiftY: number): void => {
        const [newX, newY] = moveAt(
            { value: x, shift: shiftX, min: 0, max: width },
            { value: y, shift: shiftY, min: 0, max: height }
        )

        const newColor = getColorByCoordinates(color.toHslObject().hue, newX, newY, width, height)

        setColor(new ColorConverter(newColor.hex))
    }
        , [color, height, width, setColor])
    const onMouseDown = useCallback((e: React.MouseEvent): void => {
        if (paletteRef.current) {
            if (e.button !== 0) return

            document.getSelection()?.empty()

            const { left: shiftX, top: shiftY } = paletteRef.current.getBoundingClientRect()

            moveCursor(e.clientX, e.clientY, shiftX, shiftY)

            const mouseMove = (e: MouseEvent): void => {
                moveCursor(e.clientX, e.clientY, shiftX, shiftY)
            }
            const mouseUp = (): void => {
                document.removeEventListener("mousemove", mouseMove, false)
                document.removeEventListener("mouseup", mouseUp, false)
            }

            document.addEventListener("mousemove", mouseMove, false)
            document.addEventListener("mouseup", mouseUp, false)
        }
    }, [moveCursor])

    const onTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>): void => {
        if (paletteRef.current) {
            if (e.touches.length === 0) return

            document.getSelection()?.empty()

            const { left: shiftX, top: shiftY } = paletteRef.current.getBoundingClientRect()
            const x = e.touches[0].pageX
            const y = e.touches[0].pageY

            moveCursor(x, y, shiftX, shiftY)

            const toucheMove = (e: TouchEvent): void => {
                moveCursor(e.touches[0].pageX, e.touches[0].pageY, shiftX, shiftY)
            }
            const mouseUp = (): void => {
                document.removeEventListener('touchmove', toucheMove, false)
                document.removeEventListener('touchend', mouseUp, false)
            }

            document.addEventListener("touchmove", toucheMove, false)
            document.addEventListener("touchend", mouseUp, false)
        }
    }
        , [moveCursor])

    return (
        <div className="saturation">
            <canvas ref={paletteRef} width={width} height={height}
                onTouchStart={onTouchStart}
                onMouseDown={onMouseDown} />
            <div className="saturation-cursor" style={{ left: cursorPosition.x, top: cursorPosition.y, backgroundColor: color.hex }} />
        </div>
    )
}