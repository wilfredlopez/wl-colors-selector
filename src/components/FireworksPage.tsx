import { useState } from 'react'
import Fireworks from './Fireworks'

interface Props {

}

const FireworksPage = (props: Props) => {
    const [runningFireworks, setRunningFireworks] = useState(true)

    function toggleRuning() {
        setRunningFireworks(current => !current)
    }
    return (
        <div>
            <Fireworks
                fireworkProps={{
                    canvasHeight: 400,
                    canvasWith: 400,
                    isRunning: runningFireworks
                }}
                onClick={() => {
                    toggleRuning()
                }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: 400,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                }}
            />
        </div>
    )
}

export default FireworksPage
