import React, { useState } from 'react'
import { generateGame, getBestPlayers } from '../Game'
import Button from '../components/Button'
import { PlusCircleIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import store from 'store2'
import JSConfetti from 'js-confetti'

function End() {

  const navigate = useNavigate()

  const [trewConfetti, setTrewConfetti] = useState(false)

  if (!trewConfetti) {
    setTrewConfetti(true)
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()
  }

  if (!store.get("game"))
    navigate("/")

  const game = store.get("game")

  const bestPlayers = getBestPlayers(game)
  
  const replay = () => {
    store.set("game", generateGame(game.players, game.debateMaxCount, game.debateTime))
    navigate("/localgame")
  }

  const recreate = () => {
    store.remove("game")
    navigate("/localplay")
  }

  return (
    <div>
      <h1>Fin du jeu</h1>
      <h2>{
              (bestPlayers.length > 1)?
              <span>Les gagnants.es sont {(bestPlayers.slice(0, -1).join(", ") + " et " + bestPlayers[bestPlayers.length - 1])} </span>
              :
              <span>Le/la gagnant.e est {(bestPlayers[0])}</span>
          } avec {game.playerPoints[bestPlayers[0]]} points</h2>
      <table className='text-xl mb-5 border-spacing-5 w-full p-5'>
        <thead className='bg-colorSecondary text-colorBgPrimary'>
          <tr>
            <th className='p-4'>Joueur</th>
            <th className='p-4'>Point</th>
          </tr>
        </thead>
        <tbody>
          {
            game.players.sort((p1, p2) => game.playerPoints[p2] - game.playerPoints[p1]).map(
              (p, i) => <tr className={(i%2)? "":"bg-colorBgSecondary"}id={p}>
                <td className={'p-4 border-r-2 border-colorBgPrimary'}>{p}</td>
                <td className='p-4'>{game.playerPoints[p]} point{(game.playerPoints[p]>1)?"s":""}</td>
              </tr>
              )
          }
        </tbody>
      </table> 
      <Button icon={RocketLaunchIcon} onClick={replay} className="mb-5">Rejouer avec les mêmes paramètres</Button>
      <Button icon={PlusCircleIcon} onClick={recreate}>Recréer une partie</Button>
    </div>
  )
}

export default End