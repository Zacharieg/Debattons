import React, { useEffect, useState } from 'react'
import ThemeCategories from '../ThemeCategories'
import Modal from '../Modal'
import Button from '../Button'
import { ArrowUturnLeftIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'



function ThemeChoose({
    game,
    onPass
}) {

    const [categories, setCategories] = useState([])
    const [theme, setTheme] = useState(null)

    useEffect(() => {
        (async () => {
            const loadedCatReq = await fetch("/themes.json")
            const loadedCat = await loadedCatReq.json()
            setCategories(loadedCat)
        })()
    }, [])

    const chooseCategory = (choosedCategory) => {
        let unusedThemes = choosedCategory.themes.filter((theme) => !game.debateThemes.map(t => JSON.stringify(t)).includes(JSON.stringify(theme)))
        if (unusedThemes.lenght == 0)
            unusedThemes = choosedCategory.themes
        setTheme(unusedThemes[Math.floor(Math.random()*unusedThemes.length)])
    }

    return (
        <>
        <h1>{game.playerJudge}, choisissez un thème</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {categories.map((cat) => 
                <ThemeCategories id={cat.id} category={cat} onChoose={chooseCategory}/>
            )}
        </div>
        {(theme !== null)? (
            <Modal>
                <span className='text-3xl font-display'>{theme[0]}</span>
                <span className='text-5xl font-display text-colorPrimary'>VS</span>
                <span className='text-3xl font-display'>{theme[1]}</span>
                <Button icon={HandThumbUpIcon} onClick={() => onPass(theme)}>Choisir ce thème</Button>
                <Button icon={ArrowUturnLeftIcon} theme='tertiary' onClick={() => setTheme(null)}>Choisir un autre thème</Button>
            </Modal>
        ):null}
        
        </>
    )
}

export default ThemeChoose