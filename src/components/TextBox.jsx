import React from 'react'

function TextBox({
    type="text",
    className="",
    placeholder,
    value,
    setValue,
    onKeyDown
}) {

    const style = "border-2 border-colorSecondary border-opacity-20 rounded-md bg-colorBgSecondary p-3"

    const classes =  [className, style].join(" ")

    return (
        <input 
            type={type} 
            pattern="\d*"
            value={value} 
            onChange={e => setValue(e.target.value)} 
            onKeyDown={onKeyDown}
            className={classes} 
            placeholder={placeholder? placeholder:""}/>
    )
}

export default TextBox