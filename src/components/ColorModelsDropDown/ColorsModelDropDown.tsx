import { useRef, useState, useEffect, useCallback } from "react"
// import { ColorModels } from "../picker-utils"
import { ColorModels } from "@wilfredlopez/color-converter"


export interface ColorModelsDropDownProps {
    model: ColorModels
    setModel: (model: ColorModels) => void
}

const models: ColorModels[] = ["hex", "rgb"] //["hex", "rgb", "hsb"]

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

    const onTriggerClick = useCallback((): void => {
        setIsExpanded(!isExpanded)
    }, [isExpanded])

    const onModelClick = useCallback((model: ColorModels): void => {
        setModel(model)
    }, [setModel])

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