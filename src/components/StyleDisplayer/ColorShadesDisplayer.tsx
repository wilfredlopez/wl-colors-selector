import { ColorConverter } from '@wilfredlopez/color-converter'
import './ColorShadesDisplayer.css'
import { useState } from 'react'
interface Props {
    color: ColorConverter
}


function validateWeight(w: number) {
    if (w <= 0) {
        return 1
    }
    if (w > 40) {
        return 40
    }
    return w
}

export const ColorShadesDisplayer = ({ color }: Props) => {
    const [weight, setWeight] = useState(2)


    return (

        <div className="shade-displayer">
            <label>Selected Weight</label>
            <input
                className="number-input"
                min="1"
                max="40"
                value={weight}
                type="number"
                onChange={(e) => {
                    let val = parseInt(e.target.value)
                    if (isNaN(val)) {
                        return
                    }

                    setWeight(val)
                }}
            ></input>
            <div>
                <ul className="grid">
                    {color.all(validateWeight(weight)).map((c, i) => {
                        return <li key={c.hex + i} className="grid-item" style={{
                            background: c.hexString(),
                            color: c.getContrast().hexString()
                        }}>
                            <div className="color-p">
                                <p>#{c.hex}</p>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

