import './App.css'
import AnimatedText from './components/shared/AnimatedText'
import ColorShadesDisplayer from './components/ColorShadesDisplayer'
import ColorPicker from './components/ColorPicker/ColorPicker'
import { useState } from 'react'
import { ColorObject } from './components/picker-utils'
import { ColorConverter } from '@wilfredlopez/color-converter'
import WlStylesDisplayer from './components/WlStylesDisplayer'
import AnimatedButton from './components/shared/AnimatedButton'
import { useGlobalStyles } from './hooks/useThemeStyles'


const dark = `
:root{
  --app-background: var(--wl-color-secondary, #252526);
  --app-color: #f1f1f1;
}
`

const light = `
:root{
  --app-background: #ffffff;
  --app-color: #000000;
}
`

function App() {
  const [color, setColor] = useState<ColorObject>({ hex: '#a71f71', hsb: { h: 323.8235294117647, s: 81.437125748503, b: 65.49019607843137 }, rgb: { r: 167, b: 113, g: 31 } })
  const [theme, , toggleTheme] = useGlobalStyles('dark', dark, light)

  return (
    <div className="container">
      <div className="title-container">
        <AnimatedText text="Wl.Colors" animationStyles={{
          strokeColor: '#cccccc',
          animationColor: 'var(--wl-color-primary, #9b2cd2)',
          strokeWidth: 2,
          fontSize: '4rem',
          speadSeconds: 3

        }} Tag="h1" />
        <AnimatedButton
          size="sm"
          stylings={{
            effectColor: 'var(--wl-color-primary)'
          }}
          themeType={theme}
          onClick={() => {
            toggleTheme()
          }}>
          Toggle Theme
        </AnimatedButton>


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
