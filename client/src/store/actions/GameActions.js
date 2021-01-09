import {
   GAME_CONNECT,
   GAME_CONNECT_PENDING,
   GAME_DISCONNECT,
   GAME_SET_STATE,
   GAME_SET_ME,
   GAME_CARD_SELECT,
   GAME_MSG_TOGGLE,
   GAME_OVER, 
   GAME_RESET,
   GAME_LOST_OPP
} from '../types'


export const ConnectToGame = ( socket ) => ({
    type: GAME_CONNECT,
    payload: socket
})

export const PendingConnect = () => ({
    type: GAME_CONNECT_PENDING,
    payload: ''
})

export const DisconnectFromGame = () => ( {
    type: GAME_DISCONNECT,
    payload: ''
})

export const UpdateGame = ( gameState ) => ({
    type: GAME_SET_STATE,
    payload: gameState
})

export const SetMe = ( isMe ) => ({
    type: GAME_SET_ME,
    payload: isMe
})

export const SelectCard = ( cardId ) => ({
    type: GAME_CARD_SELECT,
    payload: cardId
})

export const MsgToggle = ( showMsg ) => ({
    type: GAME_MSG_TOGGLE,
    payload: showMsg
})

export const GameOver = () => ({
    type: GAME_OVER,
    payload: ''
})

export const ResetGame = () => ({
    type: GAME_RESET,
    payload: ''
})

export const LostOpponent = () => ({
    type: GAME_LOST_OPP,
    payload: ''
})
