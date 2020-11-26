import './animated-text.css'
interface Props {
    text: string
    Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
    animationStyles?: {
        animationColor?: string,
        textColor?: string,
        strokeColor?: string,
        fontSize?: string
        speadSeconds?: number
        strokeWidth?: number
    }
    className?: string
    style?: React.CSSProperties
}

const AnimatedText = ({ text, animationStyles, Tag = 'span', ...props }: Props) => {
    let styles = {
        '--animation-color': `${animationStyles?.animationColor || "#01fe87"}`,
        '--animated-text-color': `${animationStyles?.textColor || "transparent"}`,
        '--animated-stroke-color': `${animationStyles?.strokeColor || "#6885d4"}`,
        '--animated-text-size': `${animationStyles?.fontSize || "5rem"}`,
        '--animated-text-speed-seconds': `${animationStyles?.speadSeconds || 6}s`,
        '--animated-text-stroke-width': `${animationStyles?.strokeWidth || 2}px`,
    } as React.CSSProperties


    styles = {
        ...props.style,
        ...styles,
    }

    const className = props.className ? `${props.className} animated-text` : "animated-text"

    return (
        <Tag className={className} data-text={text} style={styles}>
            {text}
        </Tag>
    )
}

export default AnimatedText
