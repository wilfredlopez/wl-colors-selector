import BallsMachine from '../Instance/BallsMachine'
import { useEffect, useRef } from 'react'

interface Props {

}

interface GravityProps {
    canvasWith?: number
    canvasHeight?: number
    maxParticles?: number
    minParticles?: number
    particleSize?: number,
    canvasMinWidth?: string | number
    canvasMinHeight?: string | number
    canvasBackgroundColor?: string
    speed?: number,
    isRunning?: boolean
    getElements?: (canvas: HTMLCanvasElement | null, machine: BallsMachine) => void
}

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    GravityProps?: GravityProps
}



export const Gravity = ({ GravityProps: { getElements, canvasBackgroundColor, canvasWith = 800, canvasHeight = 400, isRunning = true, speed, maxParticles, minParticles, particleSize, canvasMinHeight, canvasMinWidth } = {}, ...divProps }: Props) => {
    const canvas = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        let machine: BallsMachine
        if (isRunning) {

            const c = canvas.current
            if (c) {
                const ctx = c.getContext('2d')
                if (ctx) {
                    machine = new BallsMachine({ ctx, autoOn: isRunning, POWER: speed, MAX_BALLS: maxParticles, RADIUS: particleSize, MIN_BALLS: minParticles, backgroundColor: canvasBackgroundColor || "transparent" })
                    machine.animate()
                    if (getElements) {
                        getElements(canvas.current, machine)
                    }
                }
            }
        }
        return () => {
            machine?.stopAnimate()
        }
    }, [canvas, canvasWith, canvasHeight, isRunning, particleSize, maxParticles, minParticles, speed, canvasBackgroundColor, getElements])



    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                zIndex: -1,
                left: 0
            }}
            {...divProps}
        >
            <canvas ref={canvas} width={canvasWith} height={canvasHeight} style={{
                height: canvasHeight, // "100%",
                width: canvasWith,// '100%',
                minWidth: canvasMinWidth || '100%',
                minHeight: canvasMinHeight || '100%'
            }} />
        </div>
    )
}
