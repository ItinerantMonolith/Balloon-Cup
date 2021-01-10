import {
   DIALOG_MSG,
   DIALOG_EXIT,
   DIALOG_DISCONNECT,
   DIALOG_RULES,
} from '../types'

const initialState = {
   msgDialog: false,
   exitDialog: false,
   disconnectDialog: false,
   disconnectMsg: '',
   rulesDialog: false,
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
            disconnectMsg: action.payload.dialogMsg,
         }

      case DIALOG_RULES:
         return {
            ...state,
            rulesDialog: action.payload,
         }

      default:
         return { ...state }
   }
}

export default DialogReducer
