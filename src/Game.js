// Thanks to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const debatEquals = (d1, d2) => {
    const [p11, p12] = d1
    const [p21, p22] = d2
    return (p11 == p21 && p12 == p22) || (p11 == p22 && p12 == p21)
}

export const getDebateNumber = (nbPl, nbMinDeb) => {
    return Math.ceil((Number(nbPl) * Number(nbMinDeb))/2)
}

export const generateGame = (players, debateMinNumber, debateTime) => {
    const debates = []
    const playerDebateCount = {}
    const playerPoints = {}
    const playerDebateDone = {}

    players.forEach((pname) => {
        playerDebateCount[pname] = 0
        playerPoints[pname] = 0
        playerDebateDone[pname] = 0
    })
    
    while (debates.length < getDebateNumber(players.length, debateMinNumber)) {
        const lessDebatePlayer = [...players]
        shuffle(lessDebatePlayer)
        lessDebatePlayer.sort((p1,p2) => playerDebateCount[p1] - playerDebateCount[p2])

        const chosenPlayer = lessDebatePlayer[0]
        const bestDebateRival = [...lessDebatePlayer].filter(p => p !== chosenPlayer)

        bestDebateRival.sort((p1, p2) => {
            const hasDebatedP1 = debates.find(d => debatEquals(d, [chosenPlayer, p1]))? 1:0
            const hasDebatesP2 = debates.find(d => debatEquals(d, [chosenPlayer, p2]))? 1:0
            if (hasDebatedP1 || hasDebatesP2)
                return hasDebatedP1 - hasDebatesP2
            else
                return playerDebateCount[p1] - playerDebateCount[p2]
        })

        let rival = bestDebateRival[0]

        debates.push([chosenPlayer, rival])
        playerDebateCount[chosenPlayer] += 1
        playerDebateCount[rival] += 1
    }

    const possibleJudges = [...players].filter((p) => p !== debates[0][0] && p !== debates[0][1])

    return {
        players : [...players],
        playerPoints : playerPoints,
        playerDebateCount : playerDebateDone,
        playerJudge : possibleJudges[Math.floor(Math.random()*possibleJudges.length)],

        debateTime : Number(debateTime),
        debateMaxCount : Number(debateMinNumber),
        debateIterator : 0,
        debates : debates,
        debatePhase : 0,
        debateThemes : Array(debates.length).fill(null),
    }
}

export const getBestPlayers = (game) => {
    let bestScore = 0
    let bestPlayersArray = []
    
    for (let player in game.playerPoints) {
        if (game.playerPoints[player] >= bestScore) {
        if (game.playerPoints[player] > bestScore) {
            bestPlayersArray = []
            bestScore = game.playerPoints[player]
        }
        bestPlayersArray.push(player)
        }
    }

    return bestPlayersArray
}