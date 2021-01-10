import {
   DIALOG_DISCONNECT,
   DIALOG_EXIT,
   DIALOG_MSG,
   DIALOG_RULES,
} from '../types'

export const ToggleMsgDialog = (showDlg) => ({
   type: DIALOG_MSG,
   payload: showDlg,
})

export const ToggleExitDialog = (showDlg) => ({
   type: DIALOG_EXIT,
   payload: showDlg,
})

export const ToggleDisconnectDialog = (disconnectState) => ({
   type: DIALOG_DISCONNECT,
   payload: disconnectState,
})

export const ToggleRulesDialog = (showDlg) => ({
   type: DIALOG_RULES,
   payload: showDlg,
})
