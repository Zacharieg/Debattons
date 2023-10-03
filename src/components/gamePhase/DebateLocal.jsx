import React, { useState, useEffect } from 'react'
import Button from '../Button'
import { ClockIcon, PlayIcon, PauseIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import Modal from '../Modal';

function DebateLocal({
    game,
    onPass
}) {
  
  const [numPassage, setNumPassage] = useState(0)
  const [showTimer, setShowTimer] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  }

  const endPassage = () => {
    if (numPassage == 0) {
      setNumPassage(1)
      resetTimer()
      setShowTimer(false)
    } else {
      onPass()
    }
  }

  // Thanks to https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
  useEffect(() => {
    let interval = null;
    if (isActive && seconds < game.debateTime) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      <h1>{game.debateThemes[game.debateIterator].join(" VS ")}</h1>
      <h2>{game.playerJudge}, choisissez qui vas défendre quel parti, puis qui commencera à débattre.</h2>
      <p>{game.debates[game.debateIterator].join(" et ")} auront <b>{game.debateTime} secondes</b> pour expliquer à l'assemblée pourquoi son parti est le meilleur.</p>
      <p><b>Vous vous réservez le droit d'intervenir</b> pour poser des questions ou recentrer le sujet, vous devez néanmoins veiller à ce que le/la joueur.euse ai pu énoncer ses arguments.</p>
      <Button icon={ClockIcon} onClick={() => {setShowTimer(true); setIsActive(true)}}>{[
        "Commencer le passage du premier joueur",
        "Commencer le passage du second joueur"
      ][numPassage]}</Button>

      {(showTimer)? (
            <Modal>
              {(seconds < game.debateTime)? (
                <>
                  <span className={'text-5xl font-display z-10 ' + (isActive? "text-colorPrimary":"text-colorBgPrimary")}>{seconds}s</span>
                  
                  <Button className="z-10" theme={"tertiary"} onClick={() => setIsActive(!isActive)} icon={[PlayIcon, PauseIcon][isActive? 1:0]}>
                    {["Lancer","Pause"][isActive? 1:0]}
                  </Button>
                </>
              ):(
                <>
                  <span className='text-5xl font-display animate-bounce'>Temps écoulé</span>
                </>
              )}
              <span 
                  className='fixed bottom-0 left-1/2 transform -translate-x-1/2 h-screen w-screen bg-colorBgPrimary opacity-25 transition transition-[height]'
                  style={{"height": Math.floor((seconds/game.debateTime)*100) + "%"}}
              />
              <Button className={"z-10"} onClick={endPassage} icon={ArrowRightOnRectangleIcon}>
                Finir
              </Button>
            </Modal>
        ):null}
    </>
  )
}

export default DebateLocal