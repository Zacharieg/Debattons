import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import store from 'store2';
import Button from '../components/Button'
import { PlusCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'
import GameStatus from '../components/GameStatus';
import Announce from '../components/gamePhase/AnnounceLocal';
import ThemeChoose from '../components/gamePhase/ThemeChoose';
import DebateLocal from '../components/gamePhase/DebateLocal';
import VoteLocal from '../components/gamePhase/VoteLocal';


function LocalGame() {
    const navigate = useNavigate()

    if (!store.get("game"))
        return (<>
            <h1><ExclamationCircleIcon className="h-10"/> Pas de partie créée</h1>
            <Button icon={PlusCircleIcon} onClick={() => navigate("/localplay")}>Créer une partie</Button>
        </>)

    const [game, setGame] = useState(store.get("game"))
    
    if (game.debateIterator == game.debates.lenght)
        navigate("/end")


    useEffect(() => {
        store.set("game", game)
    }, [game])

    const quitGame = () => {
        store.remove("game")
        navigate('/')
    }

    const passPhase = () => {
        const newGame = JSON.parse(JSON.stringify(game))
        newGame.debatePhase += 1
        setGame(newGame)
    }

    const passThemeChoose = (theme) => {
        const newGame = JSON.parse(JSON.stringify(game))
        newGame.debateThemes[game.debateIterator] = theme
        newGame.debatePhase += 1
        setGame(newGame)
    }

    const passVote = (winner) => {
        console.log("#### Pass Vote")
        const newGame = JSON.parse(JSON.stringify(game))

        const actualDebate = newGame.debates[newGame.debateIterator]
        newGame.playerDebateCount[actualDebate[0]] += 1
        newGame.playerDebateCount[actualDebate[1]] += 1
        
        if (newGame.playerDebateCount[winner] <= newGame.debateMaxCount)
            newGame.playerPoints[winner] += 1

        newGame.debateIterator += 1

        if (newGame.debateIterator >= newGame.debates.length) {
            store.set("game", newGame)
            navigate("/end")
        } else {
    
            if (newGame.debateIterator < newGame.debates.length) {
                const nextDebate = game.debates[newGame.debateIterator]
                const notInNextDebate = game.players.filter(p => !nextDebate.includes(p))
                console.log(notInNextDebate)
                if (notInNextDebate.includes(winner))
                    newGame.playerJudge = winner
                else {
                    newGame.playerJudge = notInNextDebate[Math.floor(Math.random()*notInNextDebate.length)]
                }
            }
    
            newGame.debatePhase = 0
            setGame(newGame)
        }
    }

    const debatePhases = [
        <Announce game={game} onPass={passPhase}/>,
        <ThemeChoose game={game} onPass={passThemeChoose}/>,
        <DebateLocal game={game} onPass={passPhase}/>,
        <VoteLocal game={game} onPass={passVote}/>,
    ]

    console.log(game)

    return (
        <div>
            <GameStatus game={game} quitGame={quitGame}/>
            <div className='mt-5'>
                {debatePhases[game.debatePhase % debatePhases.length]}
            </div>
        </div>
    )
}

export default LocalGame