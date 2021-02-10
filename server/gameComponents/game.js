const Race = require('./race')
const GameStore = require('./gameStore')
const colors = ['Red', 'Yellow', 'Green', 'Blue', 'Gray']

class Game {
   constructor() {
      this.players = []
      this.deck = []
      this.bag = []
      this.discards = []
      this.races = []
      this.trophies = []
      this.sockets = []
      this.gameActions = []
      this.playerActions = [[], []]
      this.nextPlayer = 0
      this.gameTurn = 1
      this.store = new GameStore()
      this.isOver = false
   }

   gameState(forPlayer) {
      // if forPlayer === -1, this is for storage, otherwise it's for transmission
      if (forPlayer === -1) {
         return {
            players: this.players,
            deck: this.deck,
            discards: this.discards,
            bag: this.bag,
            trophies: this.trophies,
            races: this.races,
            nextPlayer: this.nextPlayer,
            gameActions: this.gameActions,
            playerActions: this.playerActions,
            gameTurn: this.gameTurn,
         }
      } else {
         return {
            players: this.players,
            deck: this.deck.length,
            discards: this.discards.length,
            bag: this.bag.length,
            trophies: this.trophies,
            races: this.races,
            nextPlayer: this.nextPlayer,
            gameActions: [
               ...this.gameActions,
               ...this.playerActions[forPlayer],
            ],
            gameTurn: this.gameTurn,
         }
      }
   }

   sendGameMessage(action) {
      // we transmit on game at startup and after each turn
      this.sockets[0].emit('game', {
         action: action,
         gameState: this.gameState(0),
      })
      this.sockets[1].emit('game', {
         action: action,
         gameState: this.gameState(1),
      })
   }

   initSockets() {
      // we listen on game_action for the clients to send us their turns.
      this.sockets[0].on('game_action', (gameAction) => {
         if (gameAction.action === 'Turn') {
             this.processTurn(gameAction.data, 0)
         }
         else if (gameAction.action === 'Concede') {
             this.concede(0)
         }
      })

      this.sockets[1].on('game_action', (gameAction) => {
         if (gameAction.action === 'Turn') {
             this.processTurn(gameAction.data, 1)
         }
         else if (gameAction.action === 'Concede') {
             this.concede(1)
         }
      })
   }

   concede(playerRef) {
      console.log(
         `Player ${playerRef}: ${this.players[playerRef].id} concedes.`
      )
      // so set the other player as the winner and the exit the game.
      const winner = playerRef === 0 ? 1 : 0
      this.store.endGame(winner)
      this.isOver = true
      this.sockets[winner].emit('game', { action: 'Concede', gameState: {} })
   }

   launch = async (players) => {
      // check to see if there is an existing game, if not, call createGame...
      const lastGame = await this.store.getExistingGame(players)
      if (lastGame) {
         // we have an existing game, populate it
         //  console.log('game found!', lastGame)
         // now put the data from lastTurn of this game into this game object
         this.players = lastGame.gameState.players
         this.deck = lastGame.gameState.deck
         this.bag = lastGame.gameState.bag
         this.discards = lastGame.gameState.discards
         for (let i = 1; i < 5; i++) {
            const newRace = new Race(i)
            newRace.loadRace(lastGame.gameState.races[i - 1])
            this.races.push(newRace)
         }

         this.trophies = lastGame.gameState.trophies
         this.gameActions = lastGame.gameState.gameActions
         this.playerActions = lastGame.gameState.playerActions
         this.nextPlayer = lastGame.gameState.nextPlayer
         this.gameTurn = lastGame.gameState.gameTurn

         // also get the correct sockets assigned based on the "actual" game
         if (players[0].id === this.players[0].id) {
            this.sockets[0] = players[0].socket
            this.sockets[1] = players[1].socket
         } else {
            this.sockets[0] = players[1].socket
            this.sockets[1] = players[0].socket
         }
      } else {
         await this.createGame(players)
         await this.store.createGame(players)
         await this.store.storeGame(this.gameState(-1), {})
      }
      this.initSockets()
      this.sendGameMessage('Start Game')
   }

   createGame = async (players) => {
      this.players = players.map((player) => ({
         id: player.id,
         name: '',
         cards: [],
         cubes: new Array(5).fill(0),
         trophies: [],
      }))
      this.players[0].name = await this.store.getPlayerName(players[0].id)
      this.players[1].name = await this.store.getPlayerName(players[1].id)
      this.sockets = players.map((player) => player.socket)
      this.deck = this.shuffle(this.createDeck())
      this.bag = this.shuffle(this.fillBag())
      this.discards = []
      for (let i = 1; i < 5; i++) {
         this.races.push(new Race(i))
      }
      this.races.forEach((race) => this.startRace(race))

      this.trophies = new Array(5)
         .fill({})
         .map((e, i) => ({ color: i, cost: 7 - i }))

      for (let i = 0; i < 2; i++) {
         this.drawCards(i, 8)
      }

      this.setValidPlays()
      this.gameActions.push('New Game Created')
   }

   processTurn(gameTurn, playerId) {
      this.gameActions = []
      this.playerActions = [[], []]

      console.log ('received game turn from ', playerId)
      console.log ( gameTurn)

      this.gameActions.push(`Results of turn #${this.gameTurn}`)

      // remove the card from the player's hand
      const cardPlayed = this.players[playerId].cards.splice(
         this.players[playerId].cards.findIndex(
            (card) => card.id === gameTurn.cardPlayed
         ),
         1
      )[0]
      cardPlayed.validPlay = false
      // add the card to the race.
      const curRace = this.races[gameTurn.targetRace]
      curRace.addCard(cardPlayed, gameTurn.targetSide, gameTurn.targetCard)

      // add that to the gameActions
      this.gameActions.push(
         `${this.players[playerId].name} played the ${this.cardName(
            cardPlayed
         )} on ${this.players[gameTurn.targetSide].name}'s side of race #${
            gameTurn.targetRace + 1
         }.`
      )

      // set next player
      this.nextPlayer = this.otherPlayer(playerId)
      // check to see if the race is over.
      if (curRace.isRaceOver()) {
         //  get the winner
         let winner = curRace.getWinner()
         // if it's a tie, the last player who played wins
         if (winner === -1) {
            winner = playerId
         }
         //          set next player (loser)
         this.nextPlayer = this.otherPlayer(winner)
         //          award the cubes,
         const cubesWon = curRace.getCubes()
         cubesWon.forEach((cube) => this.players[winner].cubes[cube.color]++)
         //          discard the cards,
         const usedCards = curRace.getCards()
         usedCards.forEach((card) => this.discardCard(card))
         //          reset the race,
         curRace.resetRace()
         //          start a new race.
         this.startRace(curRace)
         //          record all that in gameActions
         this.gameActions.push(
            `Race #${curRace.raceNo} was won by ${this.playerName(winner)}.`
         )
         //          check to see if trophies can be earned (for both players)
         if (this.checkForTrophies(winner)) {
            if ( this.checkForTrophies(this.otherPlayer(winner)) )
                this.checkForTrophies(winner)
                
            if (this.checkForVictory()) {
               return
            }
         }
      }

      // draw a card, add it to the playerActions
      this.drawCards(playerId, 1)

      // increment the turn counter
      this.gameTurn++
      
      // before the turn starts, make sure the current player is able to play cards
      //  if not, discard their hand and redraw (post-MVP implement the rule correctly)
      this.setValidPlays()
      if (!this.canPlay(this.nextPlayer)) {
         this.gameActions.push(
            `${this.playerName(
               this.nextPlayer
            )} does not have any valid plays and must dicard their hand and draw new cards.`
         )
         while (this.players[this.nextPlayer].cards.length) {
            const lostCard = this.players[this.nextPlayer].cards.pop()
            this.gameActions.push(
               `${this.playerName(
                  this.nextPlayer
               )} discarded the ${this.cardName(lostCard)}.`
            )
            this.discardCard(lostCard)
         }
         // now draw more cards
         this.drawCards(this.nextPlayer, 8)
         this.setValidPlays()
         if (!this.canPlay(this.nextPlayer)) {
            this.gameActions.push(
               `${this.playerName(this.nextPlayer)} still can't play.`
            )
            this.nextPlayer = this.otherPlayer(this.nextPlayer)
         }
      }

      this.store.storeGame(this.gameState(-1), {
         play: gameTurn.cardPlayed,
         race: gameTurn.targetRace,
         raceSide: gameTurn.targetSide,
      })
      // send out the gameState
      this.sendGameMessage('Update')
   } // processTurn

   checkForTrophies(playerId) {
      let earnedTrophy = false

      // we're going to do this in a while loop because as a trophy is awarded it needs to be removed from the list
      // and any leftover cubes could impact getting other trophies, so keep going until we do a full pass with no
      // trophies awarded.
      let keepChecking = true
      while (keepChecking) {
         keepChecking = false

         // do I have any sets of "wild card" cubes?
         const wildCards = new Array(5).fill(0)
         let totalWC = 0
         for (let i = 0; i < 5; i++) {
            if (!this.trophies.find((e) => e.color === i)) {
               wildCards[i] = Math.floor(this.players[playerId].cubes[i] / 3)
               totalWC += wildCards[i]
            }
         }

         // now walk the available trophies and see if I can earn any
         for (let i = 0; i < this.trophies.length; i++) {
            const trophy = this.trophies[i]
            if (
               trophy.cost <=
               this.players[playerId].cubes[trophy.color] + totalWC
            ) {
               // remove the trophy from the pool and give it to the player
               this.players[playerId].trophies.push(trophy)
               this.players[playerId].trophies.sort((a, b) => a.color < b.color)
               this.trophies.splice(i, 1)[0]

               // we earned this trophy...figre out which cubes we used for it
               let trophyMsg = `${this.playerName(playerId)} earned the ${
                  colors[trophy.color]
               } trophy, using `

               if (trophy.cost <= this.players[playerId].cubes[trophy.color]) {
                  // we have enough cubes in the color
                  trophyMsg += `${trophy.cost} ${colors[trophy.color]} cubes.`
                  this.players[playerId].cubes[trophy.color] -= trophy.cost
               } else {
                  trophyMsg += `${this.players[playerId].cubes[trophy.color]} ${
                     colors[trophy.color]
                  } cubes `
                  // need to use wild card cubes
                  let diff =
                     trophy.cost - this.players[playerId].cubes[trophy.color]
                  // remove the cubes
                  this.players[playerId].cubes[trophy.color] = 0 

                  // walk the wild cards until the price is paid
                  for (let j = 0; j < 5; j++) {
                     if (wildCards[j] > 0) {
                        if (wildCards[j] >= diff) {
                           trophyMsg += `and ${diff * 3} ${colors[j]} cubes.`
                           this.players[playerId].cubes[j] -= diff * 3
                           break
                        } else {
                           trophyMsg += `and ${wildCards[j] * 3} ${
                              colors[j]
                           } cubes `
                           this.players[playerId].cubes[j] -= wildCards[j] * 3
                           diff -= wildCards[j]
                        }
                     }
                  }
               }
               this.gameActions.push(trophyMsg)
               earnedTrophy = true
               keepChecking = true
               break
            }
         }
      }

      return earnedTrophy
   }

   checkForVictory() {
      if (
         this.players[0].trophies.length > 2 ||
         this.players[1].trophies.length > 2
      ) {
         // somebody won!
         const winner = this.players[0].trophies.length > 2 ? 0 : 1
         this.gameActions.push(`${this.playerName(winner)} WON the game!`)
         this.nextPlayer = -1
         this.playerActions = [[], []]
         this.sendGameMessage('Game Over')

         this.store.endGame(winner)
         this.isOver = true
         return true
      }
      return false
   }

   playerName(playerId) {
      return this.players[playerId].name
   }

   cardName(card) {
      return `${colors[card.color]} ${card.value}`
   }

   otherPlayer(playerId) {
      return playerId === 0 ? 1 : 0
   }

   shuffle(deck) {
      const newDeck = []
      while (deck.length > 0)
         newDeck.push(
            deck.splice(
               Math.floor(Math.random() * Math.floor(deck.length)),
               1
            )[0]
         )

      return newDeck
   }

   drawCube() {
      return this.bag.pop()
   }

   drawCards(playerId, cardCount) {
      for (let i = 0; i < cardCount; i++) {
         if (this.deck.length < 1) {
            this.deck = this.shuffle([...this.discards])
            this.discards = []
            this.gameActions.push('Deck shuffled.')
         }
         const newCard = this.deck.pop()
         this.players[playerId].cards.push(newCard)
         this.playerActions[playerId].push(
            `You drew the ${this.cardName(newCard)}.`
         )
      }
      this.sortHand(playerId)
   }

   sortHand(playerId) {
      this.players[playerId].cards.sort((a, b) => {
         if (a.color < b.color) return -1
         else if (a.color > b.color) return 1

         return a.value - b.value
      })
   }

   discardCard(card) {
      this.discards.push(card)
   }

   startRace(race) {
      // draw cubes and set up the card slots.
      // let's make sure there are enough cubes left in the bag, first
      if (this.bag.length >= race.raceNo) {
         for (let i = 0; i < race.raceNo; i++) {
            race.addCube(this.drawCube())
         }
         race.sortRace()
      } else {
         race.isOver = true
         this.gameActions.push(
            `Not enough cubes left for another race #${race.raceNo}.`
         )
      }
   }

   fillBag() {
      return this.createDeck(false)
   }

   createDeck(asCards = true) {
      const cards = []

      const missing = [
         [],
         [4, 10],
         [3, 5, 9, 11],
         [2, 4, 6, 8, 10, 12],
         [2, 3, 5, 6, 8, 9, 11, 12],
      ]

      let counter = 0
      for (let i = 0; i < colors.length; i++)
         for (let j = 1; j < 14; j++)
            if (!missing[i].includes(j)) {
               if (asCards) {
                  cards.push({
                     id: counter,
                     color: i,
                     value: j,
                     validPlay: false,
                  })
               } else {
                  cards.push({ id: counter, color: i })
               }
               counter++
            }

      return cards
   }

   canPlay(playerId) {
      for (let i = 0; i < 8; i++)
         if (this.players[playerId].cards[i].validPlay) return true

      return false
   }

   setValidPlays() {
      // find out what colors are available across all races.
      const available = new Array(5).fill(false)
      this.races.forEach((race) => {
         race.cards.forEach((cardSide) => {
            cardSide.forEach((card) => {
               if (card.id === -1) {
                  available[card.color] = true
               }
            })
         })
      })
      // now mark cards that are playable
      this.players.forEach((player) => {
         player.cards.forEach((card) => {
            card.validPlay = available[card.color]
         })
      })
   }

   getOtherSocket(playerId) {
      if (this.players[0].id === playerId) return this.sockets[1]
      else if (this.players[1].id === playerId) return this.sockets[0]
   }
}

module.exports = Game
