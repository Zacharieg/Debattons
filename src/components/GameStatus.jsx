import React, { useEffect, useState } from 'react'
import { RocketLaunchIcon, ArrowRightOnRectangleIcon, TrophyIcon, FaceSmileIcon, ChatBubbleLeftRightIcon, MegaphoneIcon } from '@heroicons/react/24/solid'
import Button from './Button'
import { getBestPlayers } from '../Game'

function GameStatus({
  game,
  quitGame
}) {

  const [bestPlayers, setBestPlayers] = useState([])

  useEffect(() => {
    setBestPlayers(getBestPlayers(game))
  }, [game])

  return (
    <div className='card-primary grid grid-rows-[30px_auto_auto] grid-cols-[auto_140px] gap-y-3 md:grid-cols-[200px_auto]'>

      <div className='text-base font-display flex gap-2 items-center'><RocketLaunchIcon/><span>Etat de la partie</span></div>

      <div className='flex items-center justify-end'>
        <Button onClick={quitGame} icon={ArrowRightOnRectangleIcon} className="px-0" theme='tertiary'>Quitter la partie</Button>
      </div>

      <div className='font-display text-colorPrimary col-span-2 text-center md:col-span-1 md:row-span-2 md:justify-self-start'>
        <span className='text-6xl'>{game.debateIterator + 1}</span> <span className='text-4xl'>/{game.debates.length}</span>
      </div>

      <div className='flex flex-wrap col-span-2 items-center justify-center gap-3 md:col-span-1 md:row-span-2 md:justify-self-end md:flex-nowrap md:self-end'>
        <span className='flex justify-center items-center gap-1'>
          <ChatBubbleLeftRightIcon/>
          <span>{game.debates[game.debateIterator].join(" contre ") }</span>
        </span>
        
        <span className='flex justify-center items-center gap-1'> 
          <MegaphoneIcon/>
          <span>{game.playerJudge}</span>
        </span>

        {(bestPlayers.length == game.players.length)?
        (
          <span className='flex justify-center items-center gap-1'><FaceSmileIcon/> Tout le monde ex-aequo</span>
        ):(
          <span className='flex justify-center items-center gap-1'>
            <TrophyIcon/> 
            <span>
              {
              (bestPlayers.length > 1)?
              (bestPlayers.slice(0, -1).join(", ") + " et " + bestPlayers[bestPlayers.length - 1])
              :
              (bestPlayers[0])
              } avec {game.playerPoints[bestPlayers[0]]} points
            </span>
          </span>
        )}
      </div>
    </div>
  )
}

export default GameStatus