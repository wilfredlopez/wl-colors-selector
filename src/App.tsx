import './App.css'
import AnimatedText from './components/shared/AnimatedText'
import ColorShadesDisplayer from './components/ColorShadesDisplayer'
import ColorPicker from './components/ColorPicker/ColorPicker'
import { useState } from 'react'
import { ColorObject } from './components/picker-utils'
import { ColorConverter } from '@wilfredlopez/color-converter'
import WlStylesDisplayer from './components/WlStylesDisplayer'


function App() {

  const [color, setColor] = useState<ColorObject>({ hex: '#a71f71', hsb: { h: 323.8235294117647, s: 81.437125748503, b: 65.49019607843137 }, rgb: { r: 167, b: 113, g: 31 } })

  return (
    <div className="container">
      <div className="title-container">

        <AnimatedText text="WlColors" animationStyles={{
          strokeColor: '#cccccc',
          animationColor: '#9b2cd2',
          strokeWidth: 2,
          fontSize: '4rem',
          speadSeconds: 3

        }} Tag="h1" />
      </div>

      <div>

        <ColorPicker width={400} color={color} height={250} onChange={(e) => {
          setColor(e)
        }} />
        <WlStylesDisplayer color={new ColorConverter(color.hex)} />
        <div className="spacer" />
        <ColorShadesDisplayer color={new ColorConverter(color.hex)} />
        <div className="spacer" />
      </div>
    </div>
  )
}

export default App
