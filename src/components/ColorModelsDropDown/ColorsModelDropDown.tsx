import { useRef, useState, useEffect } from "react"
import { ColorModels } from "../picker-utils"


export interface ColorModelsDropDownProps {
    model: ColorModels
    setModel: (model: ColorModels) => void
}

const models: ColorModels[] = ["hex", "rgb", "hsb"]

export const ColorModelsDropDown = ({ model, setModel }: ColorModelsDropDownProps): JSX.Element => {
    const dropDownRef = useRef<HTMLDivElement>(null)

    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const onClickOutside = (): void => {
            if (isExpanded) setIsExpanded(false)
        }

        document.addEventListener("click", onClickOutside, false)

        return (): void => {
            document.removeEventListener("click", onClickOutside, false)
        }
    }, [isExpanded])

    const onTriggerClick = (): void => {
        setIsExpanded(!isExpanded)
    }

    const onModelClick = (model: ColorModels): void => {
        setModel(model)
    }

    return (
        <div className="dropdown" ref={dropDownRef}>
            <div className="dropdown-trigger" onClick={onTriggerClick}>{model.toUpperCase()}</div>
            <div className="dropdown-menu" aria-expanded={isExpanded}>
                {models.map((model) => (
                    <div className="dropdown-menu-model" key={model} onClick={(): void => onModelClick(model)}>
                        {model.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    )
}