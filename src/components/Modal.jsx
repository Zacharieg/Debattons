import React from 'react'

function Modal({
    children,
    className = ""
}) {

    const defaultStyle = 'text-colorBgPrimary fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen w-screen z-50 bg-colorElements bg-opacity-80 flex flex-col gap-5 items-center justify-center text-center p-10'
    return (
        <div className={defaultStyle + className}>
            {children}
        </div>
    )
}

export default Modal