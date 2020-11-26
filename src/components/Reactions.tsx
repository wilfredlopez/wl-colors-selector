// import { useObjectState } from './hooks'
import React from 'react'
import { useSetState } from 'react-use-light'
import AnimatedButton from './shared/AnimatedButton'
const initialState = { data: ['wao!', "I Love It!"], name: "Reactions", newReaction: '' }

function Reactions() {
    // let [state, setState, resetState] = useObjectState<typeof initialState>()
    let [reactionState, setReactionsState, resetState] = useSetState(initialState)

    function addReaction() {
        if (reactionState.newReaction !== '') {
            setReactionsState({
                data: [...reactionState.data, reactionState.newReaction],
                newReaction: ''
            })
        }
    }


    return (
        <div>
            <p>
                {reactionState.name}
            </p>
            <div>

                <ul>
                    {reactionState.data.map(s => {
                        return <li key={s}>{s}</li>
                    })}
                </ul>
            </div>
            <div>

                <input type="text" value={reactionState.newReaction} onChange={(evt) => setReactionsState({ newReaction: evt.target.value })} />
                <div>

                    <AnimatedButton
                        onClick={addReaction}
                    >Add Reaction</AnimatedButton>
                </div>
            </div>
            <button className="btn" onClick={() => resetState({ ...initialState, data: [] })}>Reset</button>

        </div>
    )
}

export default Reactions
