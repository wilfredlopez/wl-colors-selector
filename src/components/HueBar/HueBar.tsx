import React, { useRef, useMemo } from "react"
// import { getCoordinatesByHue, moveAt, getHueByCoordinates, changeHue } from "../picker-utils"
// import { ColorObject } from '../picker-utils/index'
import { canvasUtils, ColorObject } from "@wilfredlopez/color-converter"
const { getCoordinatesByHue, moveAt, getHueByCoordinates, changeHue } = canvasUtils
export interface HueBarProps {
    width: number
    color: ColorObject
    setColor: (color: ColorObject) => void
}



export const HueBar = ({ width, color, setColor }: HueBarProps): JSX.Element => {
    const hueBarRef = useRef<HTMLDivElement>(null)

    const cursorPosition = useMemo(() => {
        const x = getCoordinatesByHue(color.hsb.hue, width)

        return x
    }, [color.hsb.hue, width])

    const moveCursor = (x: number, shiftX: number): void => {
        const [newX] = moveAt({
            value: x,
            shift: shiftX,
            min: 0,
            max: width,
        })

        const newHue = getHueByCoordinates(newX, width)

        setColor(changeHue(color, newHue))
    }

    const onMouseDown = (e: React.MouseEvent): void => {
        if (hueBarRef.current) {
            if (e.button !== 0) return

            document.getSelection()?.empty()

            const { left: shiftX } = hueBarRef.current.getBoundingClientRect()

            moveCursor(e.clientX, shiftX)

            const mouseMove = (e: MouseEvent): void => {
                moveCursor(e.clientX, shiftX)
            }
            const mouseUp = (): void => {
                document.removeEventListener("mousemove", mouseMove, false)
                document.removeEventListener("mouseup", mouseUp, false)
            }

            document.addEventListener("mousemove", mouseMove, false)
            document.addEventListener("mouseup", mouseUp, false)
        }
    }

    return (
        <div className="hue-bar" ref={hueBarRef} style={{
            width: width
        }} onMouseDown={onMouseDown}>
            <div className="hue-bar-cursor" style={{ left: cursorPosition, backgroundColor: `hsl(${color.hsb.hue}, 100%, 50%)` }} />
        </div>
    )
}