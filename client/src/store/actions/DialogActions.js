import { DIALOG_DISCONNECT, DIALOG_EXIT, DIALOG_MSG } from '../types'

export const ToggleMsgDialog = (showDlg) => ({
   type: DIALOG_MSG,
   payload: showDlg,
})

export const ToggleExitDialog = (showDlg) => ({
   type: DIALOG_EXIT,
   payload: showDlg,
})

export const ToggleDisconnectDialog = ( disconnectState ) => ({
   type: DIALOG_DISCONNECT,
   payload: disconnectState,
})
