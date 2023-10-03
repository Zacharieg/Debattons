import React, { useState, useEffect } from 'react'
import TextBox from '../components/TextBox'
import Button from '../components/Button'
import {PlusCircleIcon, TrashIcon, RocketLaunchIcon, ArrowUturnLeftIcon, ExclamationTriangleIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom";
import store from 'store2';
import { generateGame, getDebateNumber } from '../Game'

function LocalPlay() {
    const navigate = useNavigate()

    const [players, setPlayers] = useState([])
    
    const [inputPlayerName, setInputPlayerName] = useState('')
    const [debateTime, setDebateTime] = useState(40)
    const [debateMinNumber, setDebateMinNumber] = useState(3)
    
    const funNames = ["Rayon Marion", "Flex Alex", "Jojo le Fléau", "Zac la Menace", "Lou Kung-Fu", "Batou Casse-cou", "Baptiste l'Artiste", "Huileu Matthieu"]
    const getRandomFunName = () => funNames[Math.floor(Math.random()*funNames.length)]
    const [funName, setFunName] = useState(getRandomFunName())

    const addPlayer = (pName) => {
        if (pName && !players.includes(pName)) {
            setPlayers([...players, pName])
            setInputPlayerName('')
            setFunName(getRandomFunName())
        }
    }

    const addPlayers = (pNames) => {
        let added = pNames.filter(p => p && !players.includes(p))
        setPlayers([...players, ...added])
    }

    const removePlayer = (removed) => {
        const newPlayers = [...players].filter(p => p != removed)
        setPlayers(newPlayers)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          addPlayer(inputPlayerName);
        }
    };

    const play = () => {
        const game = generateGame(players, debateMinNumber, debateTime)
        store("game", game)
        store("lastGamePlayers", players)
        navigate("/localgame")
    }

    const canPlay = () => players.length > 1 && Number(debateTime) > 4 && Number(debateMinNumber) > 0

    return (
        <>
        {(store.get("game"))?
        (<div className='card-secondary text-center mb-5 flex flex-wrap justify-center items-center p-3'>
            <span> <ExclamationTriangleIcon/> Une partie est déjà en cours avec {store.get("game").players.slice(0, -1).join(", ") + " et " + store.get("game").players[store.get("game").players.length - 1]}</span>
            <Button icon={ArrowUturnLeftIcon} onClick={() => navigate('/localgame')} theme='tertiary'>Reprendre la partie</Button>
        </div>):(<></>)}

        <h1>Commencer une partie</h1>
        <p>Ajoutez le nom des participants de la partie.</p>
        <div className='grid grid-cols-2 gap-3 grid-flow-col mb-3'>
            <TextBox 
                className="col-span-10"
                value={inputPlayerName}
                setValue={setInputPlayerName}
                onKeyDown={handleKeyDown}
                placeholder={funName}
            /> 
            <Button icon={PlusCircleIcon} onClick={() => addPlayer(inputPlayerName)}>Ajouter</Button>
        </div>
        <div className='flex gap-3 flex-wrap'>
            {players.map((player, index) => (
                <div className='rounded-full bg-colorBgSecondary flex justify-between align-center p-3 px-5 w-auto gap-5 ' key={index}>
                    <span className='text-xl'>{player}</span> 
                    <TrashIcon className="h-6 text-colorElements opacity-30 hover:opacity-70 cursor-pointer transition" onClick={() => removePlayer(player)}/>
                </div>
            ))}
        </div>
        {(store.get("lastGamePlayers"))? (
            <Button icon={UserGroupIcon} theme='tertiary' onClick={() => addPlayers(store.get("lastGamePlayers"))}>
                Importer les joueurs de la dernière partie ({(store.get("lastGamePlayers").slice(0, -1).join(", ") + " et " + store.get("lastGamePlayers")[store.get("lastGamePlayers").length - 1])})
            </Button>
        ):<></>}
        <div className='grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-3 mt-5'>
            <div className='flex flex-col items-stretch'>
                <p>Nombre de seconde par personne pour débattre</p> 
                <TextBox value={debateTime} setValue={setDebateTime} type='number' className=""/>
            </div>
            <div className='flex flex-col items-stretch'>
                <p>Nombre de débat minimum par personne</p> 
                <TextBox value={debateMinNumber} setValue={setDebateMinNumber} type='number' className="2"/>
            </div>
        </div>
        <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-3 mt-5'>
            <div className='flex flex-col items-stretch justify-center card-secondary text-center'>
                <p className='mb-0'>Nombre de joueurs</p>
                <span className='font-display text-colorPrimary text-4xl'>{players.length}</span>
            </div>
            <div className='flex flex-col items-stretch justify-center card-secondary text-center'>
                <p className='mb-0'>Nombre de débats</p>
                <span className='font-display text-colorPrimary text-4xl'>{getDebateNumber(players.length, debateMinNumber)}</span>
            </div>
            <div className='flex flex-col items-stretch justify-center  card-secondary text-center col-span-2 md:col-span-1'>
                <p className='mb-0'>Estimation de la durée de la partie</p>
                <span className='font-display text-colorPrimary text-4xl'>{Math.ceil((getDebateNumber(players.length, debateMinNumber) * 2 * (Number(debateTime)+60))/60)} min</span>
            </div>
        </div>
        <div>
            <Button icon={RocketLaunchIcon} disabled={!canPlay()} className="mt-5" onClick={play}>Lancer la partie</Button>
        </div>
        </>
    )
}

export default LocalPlay