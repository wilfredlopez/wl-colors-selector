import { PropsWithChildren } from 'react'
import './animated-button.css'

interface Stylings {
    textColor?: string,
    textColorHover?: string
    backgroundColor?: string,
    backgroundColorHover?: string,
    effectSize?: string,
    effectColor?: string
    transitionSeconds?: number,
}
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    stylings?: Stylings
    themeType?: 'dark' | 'light'
    size?: AnimatedButtonSize
}


const StyleTypes: Record<'dark' | 'light', Required<Stylings>> = {
    dark: {
        backgroundColor: '#262c37',
        backgroundColorHover: '#2d3442',
        effectColor: '#67ff28',
        effectSize: '1px',
        textColor: '#ffffff',
        textColorHover: '#ffffff',
        transitionSeconds: 0.15,
    },
    light: {
        backgroundColor: '#efefef',
        backgroundColorHover: '#e4e4e4',
        effectColor: '#135292',
        effectSize: '1px',
        textColor: 'rgba(0, 0, 0, 0.87)',
        textColorHover: 'rgba(0, 0, 0, 0.90)',
        transitionSeconds: 0.15,
    }
}



type AnimatedButtonSize = 'sm' | 'md' | 'lg'


const AnimatedButton = ({ stylings, size = 'md', children, themeType = 'light', ...buttonProps }: PropsWithChildren<Props>) => {

    const style = StyleTypes[themeType]

    const globalStyles: Required<Stylings> = {
        backgroundColor: stylings?.backgroundColor || style.backgroundColor,
        backgroundColorHover: stylings?.backgroundColorHover || style.backgroundColorHover,
        effectColor: stylings?.effectColor || style.effectColor,
        effectSize: stylings?.effectSize || style.effectSize,
        textColor: stylings?.textColor || style.textColor,
        textColorHover: stylings?.textColorHover || style.textColorHover,
        transitionSeconds: stylings?.transitionSeconds || style.transitionSeconds,
    }


    const className = buttonProps.className ? `${buttonProps.className} animated-button ${size}` : `animated-button ${size}`

    const override = {
        '--animated-button-color': globalStyles.textColor,
        '--animated-button-color-hover': globalStyles.textColorHover,
        '--animated-button-background': globalStyles.backgroundColor,
        '--animated-button-background-hover': globalStyles.backgroundColorHover,
        '--animated-button-transition-seconds': `${globalStyles.transitionSeconds}s`,
        '--animated-button-size': globalStyles.effectSize,
        '--animated-bottom-effect-color': globalStyles.effectColor,
    } as React.CSSProperties


    const mergeStyles = buttonProps.style ? { ...override, ...buttonProps.style } : { ...override }

    return (
        <button
            {...buttonProps}
            style={mergeStyles}
            className={className}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {children}
        </button>
    )
}

export default AnimatedButton
