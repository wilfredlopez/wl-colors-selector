import React, { useRef, useMemo } from "react"
import { HueBarProps } from "./HueBar.types"
import { getCoordinatesByHue, moveAt, getHueByCoordinates, changeHue } from "../picker-utils"

export const HueBar = ({ width, color, setColor }: HueBarProps): JSX.Element => {
    const hueBarRef = useRef<HTMLDivElement>(null)

    const cursorPosition = useMemo(() => {
        const x = getCoordinatesByHue(color.hsb.h, width)

        return x
    }, [color.hsb.h, width])

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
            <div className="hue-bar-cursor" style={{ left: cursorPosition, backgroundColor: `hsl(${color.hsb.h}, 100%, 50%)` }} />
        </div>
    )
}