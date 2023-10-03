import React from 'react'
import * as Icons from '@heroicons/react/24/solid'

function ThemeCategories({
    category,
    onChoose,
}) {

    const defaultStyle = ` bg-[${category.color}]`

    return (
        <div 
            className="rounded-lg p-6 flex flex-col items-center justify-center text-colorSecondary font-display border-4 bg-colorPrimary border-solid border-colorSecondary shadow 
                    transition hover:text-colorBgPrimary hover:-translate-y-[3px] hover:shadow-md cursor-pointer"
            style={{backgroundColor: category.color}} id={category.id}
            onClick={() => onChoose(category)}
            >
            {React.createElement(Icons[category.icon], {className:"h-8"})}

            <span className='text-xl'>{category.name}</span>
        </div>
    )
}

export default ThemeCategories