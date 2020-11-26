import { ColorConverter } from '@wilfredlopez/color-converter'
import './ColorShadesDisplayer.css'
interface Props {
    color: ColorConverter
}

const ColorShadesDisplayer = ({ color }: Props) => {

    return (
        <div className="shade-displayer">
            <div>
                <ul className="grid">
                    {(color.all(5) as ColorConverter[]).map((c, i) => {
                        return <li key={c.hex + i} className="grid-item" style={{
                            background: `#${c.hex}`,
                            color: `#${i < 20 ? c.shade(255).hex : c.tint(255).hex}`
                        }}>
                            <div className="color-p">

                                <p >

                                    #{c.hex}</p>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default ColorShadesDisplayer
