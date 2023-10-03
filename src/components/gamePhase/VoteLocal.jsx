import React from 'react'
import Button from '../Button'
import { HandRaisedIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'

function VoteLocal({
  game,
  onPass,
}) {

  const playerThatHavePlayed = game.debates[game.debateIterator] + [game.playerJudge]
  const playerThatHaventPlayed = game.players.filter(p => !playerThatHavePlayed.includes(p))
  const playerThatHaventPlayedStr = (playerThatHaventPlayed.length > 1)? 
    (playerThatHaventPlayed.slice(0, -1).join(", ") + " et " + playerThatHaventPlayed[playerThatHaventPlayed.length - 1]) :(playerThatHaventPlayed[0])

  return (
    <>
      <h1>C'est l'heure du vote !</h1>
      <h2>{game.debates[game.debateIterator].join(" et ")} ont débattu, qui a sorti les meilleurs arguments ?</h2>
      <p>
        Les joueurs/euses qui n'ont pas débattu ({playerThatHaventPlayedStr}) votent pour qui a le mieux débattu.
      </p>
      <p>
        Au décompte du/de la juge, iels montreront <b>le pouce <HandThumbUpIcon/> pour {game.debates[game.debateIterator][0]}</b> ou <b>la main <HandRaisedIcon/> pour {game.debates[game.debateIterator][1]}</b>.
        En cas d'égalité, le/la juge tranche.
      </p>
      <p>Alors, qui a gagné ?</p>
      {[0,1].map(num => 
      <Button className="mb-5" onClick={() => {onPass(game.debates[game.debateIterator][num])}} icon={[HandThumbUpIcon, HandRaisedIcon][num]}>{game.debates[game.debateIterator][num]}</Button>
      )}
      
    </>
  )
}

export default VoteLocal