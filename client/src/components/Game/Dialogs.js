import React, { forwardRef } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
   Grid,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
   Button,
   Slide,
   Zoom,
} from '@material-ui/core'
import { MsgToggle, ResetGame } from '../../store/actions/GameActions'
import {
   ToggleExitDialog,
   ToggleDisconnectDialog,
   ToggleRulesDialog,
} from '../../store/actions/DialogActions'
import Rules from '../Rules'
import myStyles from '../../styles/myStyles'

const mapStateToProps = ({ gameState, dialogState }) => {
   return { gameState, dialogState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      msgToggle: (showMsg) => dispatch(MsgToggle(showMsg)),
      resetGame: () => dispatch(ResetGame()),
      closeExitDialog: () => dispatch(ToggleExitDialog(false)),
      endGame: (endState) => dispatch(ToggleDisconnectDialog(endState)),
      closeRulesDialog: () => dispatch(ToggleRulesDialog(false)),
   }
}

const TransitionSlide = forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />
})

const TransitionZoom = forwardRef(function Transition(props, ref) {
   return <Zoom ref={ref} {...props} />
})

const Dialogs = (props) => {
   const styles = myStyles()

   const handleClose = () => {
      props.msgToggle(false)
      if (props.gameState.gameStatus === 'GAME OVER') {
         props.gameState.connection.disconnect()
         props.resetGame()
         props.history.push('/')
      }
   }

   const handleExitGame = () => {
      props.gameState.connection.disconnect()
      props.endGame({ dialogOpen: false, dialogMsg: '' })
      props.resetGame()
      props.history.push('/')
   }

   const handleExit = () => {
      props.closeExitDialog()
      handleExitGame()
   }

   const handleConcede = () => {
      props.gameState.connection.emit('game_action', {
         action: 'Concede',
         data: {},
      })

      props.closeExitDialog()
      props.endGame({
         dialogOpen: true,
         dialogMsg:
            'You have CONCEDED this game.  You will be returned to the lobby.',
      })
   }

   return (
      <React.Fragment>
         <Dialog
            open={props.gameState.hasMessage}
            onClose={handleClose}
            className={styles.dialogText}
            TransitionComponent={TransitionZoom}
            onClick={handleClose}
            disableBackdropClick={true}
         >
            <DialogTitle className={`${styles.dialogBG}`}>
               <div className={styles.defaultText}>
                  {props.gameState.gameActionHeader}
               </div>
            </DialogTitle>
            <DialogContent className={`${styles.dialogBG}`}>
               <DialogContentText className={styles.dialogText}>
                  {props.gameState.gameActions.map((action, i) => (
                     <div key={i}>{action}</div>
                  ))}
                  {props.gameState.nextPlayer >= 0 ? (
                     <div>
                        It is{' '}
                        {props.gameState.me === props.gameState.nextPlayer
                           ? 'YOUR'
                           : `${
                                props.gameState.players[
                                   props.gameState.nextPlayer
                                ].name
                             }'s`}{' '}
                        turn.
                     </div>
                  ) : null}
               </DialogContentText>
            </DialogContent>
         </Dialog>
         <Dialog
            open={props.dialogState.disconnectDialog}
            TransitionComponent={TransitionSlide}
            onClose={handleExitGame}
         >
            <DialogTitle
               id="alert-dialog-slide-title"
               className={`${styles.dialogBG}`}
            >
               <div className={styles.defaultText}>Time to go</div>
            </DialogTitle>
            <DialogContent className={`${styles.dialogBG}`}>
               <DialogContentText className={styles.dialogText}>
                  {props.dialogState.disconnectMsg}
               </DialogContentText>
            </DialogContent>
         </Dialog>
         <Dialog
            open={props.dialogState.exitDialog}
            TransitionComponent={TransitionSlide}
            onClose={() => props.closeExitDialog()}
         >
            <DialogTitle className={`${styles.dialogBG}`}>
               <div className={styles.dialogText}>
                  {'Do you want to exit the game?'}
               </div>
            </DialogTitle>
            <DialogContent className={`${styles.dialogBG}`}>
               <DialogContentText className={styles.dialogText}>
                  You may exit the game, and it can be continued later against
                  the same player, or you may Concede the game.
               </DialogContentText>
            </DialogContent>
            <DialogActions className={`${styles.dialogBG}`}>
               <Button onClick={handleExit} className={styles.dialogText}>
                  Just Exit
               </Button>
               <Button onClick={handleConcede} className={styles.dialogText}>
                  Concede, I'm a goner
               </Button>
               <Button
                  onClick={() => props.closeExitDialog()}
                  className={styles.dialogText}
               >
                  Cancel
               </Button>
            </DialogActions>
         </Dialog>
         <Dialog
            open={props.dialogState.rulesDialog}
            TransitionComponent={TransitionZoom}
            onClose={() => props.closeRulesDialog()}
         >
             <Grid container  className={`${styles.rulesDialog}`}>
             {/* <Paper className={`${styles.rulesDialog}`}> */}
               <Rules />
            {/* </Paper> */}
            </Grid>
         </Dialog>
      </React.Fragment>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dialogs))
