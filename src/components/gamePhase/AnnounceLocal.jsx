import React from 'react'
import { ExclamationTriangleIcon, HandRaisedIcon } from '@heroicons/react/24/solid'
import Button from '../Button'

function AnnounceLocal({game, onPass}) {

    const actualDebate = game.debates[game.debateIterator]

    let noPointPlayer = null

    if (game.playerDebateCount[actualDebate[0]] === game.debateMaxCount)
        noPointPlayer = actualDebate[0]
    else if (game.playerDebateCount[actualDebate[1]] === game.debateMaxCount)
        noPointPlayer = actualDebate[1]
    
    return (
    <>
    <h1>{actualDebate.join(" contre ")}</h1>
    <h2>{game.playerJudge} comme Juge</h2>
    <p>
        Passez l'appareil à {game.playerJudge}, iel choisira le thème et sera responsable du temps de débat de chaque participant.e.
    </p>
    {noPointPlayer? (
        <div className='card-secondary text-center mb-5'>
        <ExclamationTriangleIcon/> {noPointPlayer} ne recevra pas de point lors de cette manche car iel a déjà effectué tout ses débats.
        </div>
    ):(
        null
    )}
    <Button icon={HandRaisedIcon} onClick={onPass}>Je suis {game.playerJudge}</Button>
    </>
    )
}

export default AnnounceLocal