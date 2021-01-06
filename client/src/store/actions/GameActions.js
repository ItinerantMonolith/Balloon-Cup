import {
   GAME_CONNECT,
   GAME_DISCONNECT,
   GAME_SET_STATE,
   GAME_SET_ME,
   GAME_CARD_SELECT,
   GAME_MSG_TOGGLE
} from '../types'

// import { } from '../../services/UserService'


export const ConnectToGame = ( socket ) => ({
    type: GAME_CONNECT,
    payload: socket
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