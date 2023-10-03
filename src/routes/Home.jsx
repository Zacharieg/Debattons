import React from 'react'
import Button from '../components/Button'
import { DeviceTabletIcon, UserGroupIcon, BookOpenIcon, PlusCircleIcon, BuildingStorefrontIcon, HandRaisedIcon, EyeIcon, RocketLaunchIcon} from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div class="flex flex-col h-full gap-5 grid grid-rows-2 ">
            <div id="rules" className="md:row-span-2  align-top">
                <h1 className='mb-0'> <BookOpenIcon className="h-10"/> Règles du jeu Débattons</h1>
                <p className='font-display text-colorSecondary'>Un jeu créé par Zacharie Guet</p>
                <p>
                    Dans ce jeu de débat, chaque joueur.euse est en compétition avec les autres pour devenir <b>le meilleur orateur</b>, ou du moins le plus convainquant.
                </p>
                <p>
                    Chaque manche, <b>deux joueur.euse devront défendre une idée contre une autre</b>. Iels auront chacun un temps précis pour énoncer des arguments et convaincre les autres joueurs.
                </p>
                <p>
                    <b>Un.e juge sera aussi nommé chaque manche</b>. Iel décidera du thème, de quelle idée défendra chaque joueur.euse et sera responsable de la bonne tenue du débat.
                </p>
                <p>
                    A la fin de chaque débat, les joueurs.euses n'ayant pas participé <b>votent pour le/la meilleur.e orateur.trice</b>, et en cas d'égalité le/la juge a le dernier mot.
                </p>
                <p>
                    A la fin de la partie <b>celui/celle qui aura gagné le plus de débat l'emportera</b>. Alors, prêt à débattre ?
                </p>
            </div>
            <div id="createGame" className="card-primary self-start">
                <h2> <PlusCircleIcon className='h-5'/> Créer une partie</h2>
                <p>Ajoutez manuellement les joueur et utiliser cet appareil.</p>{/*ou demandez à tous les joueurs de se connecter au jeu.</p>*/}
                    <Button icon={RocketLaunchIcon} onClick={()=>navigate("/localplay")}>C'est Parti</Button>
                <div className='flex flex-wrap gap-3 justify-end'>
                    {/* <Button icon={UserGroupIcon} onClick={()=>navigate("/play")} disabled={true}>Demander aux autres joueurs de rejoindre</Button> */}
                </div>
            </div>

            {/* <div id="seeThemes" className="card-secondary self-baseline">
                <h2> <BuildingStorefrontIcon className='h-5'/> Thèmes</h2>
                <p>Naviguez parmis tous les thèmes disponibles, ou encore proposez des nouveaux thèmes inédits.</p>
                <div className='flex flex-wrap gap-3 justify-end'>
                    <Button icon={HandRaisedIcon} disabled={true}>Proposer un thème</Button>
                    <Button icon={EyeIcon} disabled={true}>Voir les thèmes</Button>
                </div>
            </div> */}
        </div>
  )
}

export default Home