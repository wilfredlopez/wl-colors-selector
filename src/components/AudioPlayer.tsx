

import { useSetState, useAudioControls, useUpdateEffect } from 'react-use-light'
import './audio-player.css'
const imageurl = "https://res.cloudinary.com/wlopez/image/upload/v1605386063/vapemusic2/2020/10/ataca.jpg"

function turnSecondsToMinutes(s: number) {
    return (s - (s %= 60)) / 60 + (9 < Math.round(s) ? ":" : ":0") + Math.round(s)
}

const songs = [{
    src: "https://res.cloudinary.com/wlopez/video/upload/v1605386064/vapemusic2/2020/10/Chimbala_Ft._Lenny_Tavarez_Jay_Wheeler_Ataca_Remix.mp3",
    name: 'Ataca'
},
{
    src: "https://res.cloudinary.com/wlopez/video/upload/v1605379155/vapemusic2/2020/10/Ala_Jaza_Te_Apuesto.mp3",
    name: 'Te Apuesto'
}
]


interface Props { }

const AudioPlayer = (_: Props) => {
    let [songState, setSongsState] = useSetState(songs[0])

    const [{ audio, controls, state }] = useAudioControls({
        src: songState.src
    })

    useUpdateEffect(() => {
        controls.play()

        //eslint-disable-next-line
    }, [songState])

    return (
        <div className="container">
            <div>
                {audio}

                <h3>{songState.name}</h3>
                <img src={imageurl} alt={songState.name} />
                <div>

                    <input id="percent" type="range" value={state.percentPlayed} min="0" max="100" onChange={(e) => {

                        controls.seek(parseInt(e.target.value))
                    }} />
                    <label htmlFor="percent">{turnSecondsToMinutes(state.time)}</label>
                </div>

            </div>
            <button className="btn" onClick={() => {
                if (state.paused) {
                    controls.play()

                } else {
                    controls.pause()
                }
            }}>{state.paused ? "Play" : "Pause"}</button>
            <div>
                <button className="btn" onClick={() => {
                    setSongsState(songs[1].name === songState.name ? songs[0] : songs[1])
                }}>Play Next</button>
            </div>


        </div>
    )
}


export default AudioPlayer
