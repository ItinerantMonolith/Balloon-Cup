import { DIALOG_MSG, DIALOG_EXIT, DIALOG_DISCONNECT } from '../types'

const initialState = {
   msgDialog: false,
   exitDialog: false,
   disconnectDialog: false,
   disconnectMsg: ''
}

const DialogReducer = (state = initialState, action) => {
   switch (action.type) {
      case DIALOG_MSG:
         return {
            ...state,
            msgDialog: action.payload,
         }

      case DIALOG_EXIT:
         return {
            ...state,
            exitDialog: action.payload,
         }

      case DIALOG_DISCONNECT:
         return {
            ...state,
            disconnectDialog: action.payload.dialogOpen,
            disconnectMsg: action.payload.dialogMsg
         }

      default:
         return { ...state }
   }
}

export default DialogReducer
