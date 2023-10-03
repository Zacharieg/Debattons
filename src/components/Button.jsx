import React from 'react'

function Button({
    onClick,
    children,
    className,
    disabled = false,
    icon,
    theme="primary"
}) {

    let defaultClasses = "bg-colorPrimary text-lg text-colorBgPrimary p-3 rounded-lg font-bold inline hover:bg-colorPrimaryHover cursor-pointer flex gap-2 justify-center items-center transition"
    let disabledClasses = "bg-colorSecondary hover:bg-colorSecondary cursor-not-allowed opacity-40"
    
    if (theme == "secondary")
        defaultClasses = "bg-colorSecondary text-lg text-colorBgPrimary p-3 rounded-lg font-bold inline hover:bg-colorPrimary cursor-pointer flex gap-2 justify-center items-center transition"
    else if (theme == "tertiary") {
        defaultClasses = "font-bold text-sm cursor-pointer opacity-70 hover:opacity-100 transition p-3 flex gap-2 justify-center items-center transition"
        disabledClasses = "opacity-30 md:opacity-30"
    }

    let classes = [defaultClasses, (disabled? disabledClasses:[]), className].join(" ")

    let buttonIcon = icon? (React.createElement(icon,{className:"h-6"})):<></>

    return (
        <div onClick={() => {if (!disabled) onClick()}} className={classes}> {buttonIcon} {children}</div>
    )
}

export default Button