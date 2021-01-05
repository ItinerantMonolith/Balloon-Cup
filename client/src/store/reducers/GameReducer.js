import {
   GAME_SET_STATE,
   GAME_CONNECT,
   GAME_DISCONNECT,
   GAME_SET_ME,
   GAME_CARD_SELECT,
} from '../types'

const initialState = {
   players: [],
   deck: 0,
   bag: 0,
   discards: 0,
   races: [],
   trophies: [],
   nextPlayer: 0,
   me: 0,
   opp: 1,
   selectedCard: -1,
   selectedColor: -1,
   connection: null,
   gameStatus: '',
}

const GameReducer = (state = initialState, action) => {
   switch (action.type) {
      case GAME_SET_STATE:
         return {
            ...state,
            players: action.payload.players,
            deck: action.payload.deck,
            bag: action.payload.bag,
            discards: action.payload.discards,
            races: action.payload.races,
            trophies: action.payload.trophies,
            nextPlayer: action.payload.nextPlayer,

            gameStatus: 'ACTIVE',
         }

      case GAME_SET_ME:
         return {
            ...state,
            me: action.payload ? 0 : 1,
            opp: action.payload ? 1 : 0,
         }

      case GAME_CONNECT:
         return { ...state, connection: action.payload, gameStatus: 'PENDING' }

      case GAME_DISCONNECT:
         return { ...state, connection: null, gameStatus: '' }

      case GAME_CARD_SELECT:
         let selectedColor = -1
         let cardTest = action.payload.cardId
         const colors = [13, 11, 9, 7, 5]
         while ( cardTest > 0 ) {
            cardTest -= colors[selectedColor]
            selectedColor ++
         }

         return {
            ...state,
            selectedCard: action.payload.cardId,
            selectedColor: selectedColor,
         }

      default:
         return { ...state }
   }
}

export default GameReducer
