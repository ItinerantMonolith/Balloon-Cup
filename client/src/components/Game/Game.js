import React, { forwardRef } from 'react'
import { withRouter } from 'react-router-dom'
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
import { connect } from 'react-redux'
import Hand from './Hand'
import Race from './Race'
import DeckDisplay from './DeckDisplay'
import Prizes from './Prizes'
import { MsgToggle, ResetGame } from '../../store/actions/GameActions'
import {
   ToggleExitDialog,
   ToggleDisconnectDialog,
} from '../../store/actions/DialogActions'
import myStyles from '../../styles/myStyles'

const mapStateToProps = ({ gameState, dialogState }) => {
   return { gameState, dialogState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      msgToggle: (showMsg) => dispatch(MsgToggle(showMsg)),
      resetGame: () => dispatch(ResetGame()),
      toggleExitDialog: (showDlg) => dispatch(ToggleExitDialog(showDlg)),
      endGame: (endState) => dispatch(ToggleDisconnectDialog(endState)),
   }
}

const TransitionSlide = forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />
})

const TransitionZoom = forwardRef(function Transition(props, ref) {
   return <Zoom ref={ref} {...props} />
})

const Game = (props) => {
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

   const handleCancel = () => {
      props.toggleExitDialog(false)
   }

   const handleExit = () => {
      props.toggleExitDialog(false)
      handleExitGame()
   }

   const handleConcede = () => {
      props.gameState.connection.emit('game_action', {
         action: 'Concede',
         data: {},
      })

      props.toggleExitDialog(false)
      props.endGame({
         dialogOpen: true,
         dialogMsg:
            'You have CONCEDED this game.  You will be returned to the lobby.',
      })
   }

   return (
      <Grid container spacing={1}>
         <Grid item xs={2}>
            <Grid container spacing={4}>
               <Grid item xs={12}>
                  <Prizes playerId={props.gameState.me} />
               </Grid>
               <Grid item xs={12}>
                  <Hand />
               </Grid>
            </Grid>
         </Grid>
         <Grid container item xs={8} spacing={2}>
            <Grid item xs={5}>
               <div
                  className={`${styles.size25} ${styles.defaultText} ${styles.prizeCard}`}
               >
                  Your Race Cards
               </div>
            </Grid>
            <Grid item xs={2}>
               {props.gameState.nextPlayer === props.gameState.me ? (
                  <div
                     className={`${styles.defaultText} ${styles.size15} ${styles.myTurn}`}
                  >
                     YOUR TURN
                  </div>
               ) : (
                  <div
                     className={`${styles.defaultText} ${styles.size15} ${styles.oppTurn}`}
                  >
                     {props.gameState.players[props.gameState.opp].name}'s TURN
                  </div>
               )}
            </Grid>
            <Grid item xs={5}>
               <div
                  className={`${styles.size25} ${styles.defaultText} ${styles.prizeCard}`}
               >
                  {props.gameState.players[props.gameState.opp].name}'s Race
                  Cards
               </div>
            </Grid>
            {props.gameState.races.map((race) => (
               <Race race={race} key={race.raceNo} />
            ))}
         </Grid>
         <Grid item xs={2}>
            <Grid container spacing={4}>
               <Grid item xs={12}>
                  <Prizes playerId={props.gameState.opp} />
               </Grid>
               <Grid item xs={12}>
                  <DeckDisplay />
               </Grid>
            </Grid>
         </Grid>
         <Dialog
            open={props.gameState.hasMessage}
            onClose={handleClose}
            className={styles.dialogText}
            TransitionComponent={TransitionZoom}
            onClick={handleClose}
            disableBackdropClick={true}
         >
            <DialogTitle className={`${styles.dialogBG}`} >
               <div className={styles.defaultText}>
                  {props.gameState.gameActionHeader}
               </div>
            </DialogTitle>
            <DialogContent  className={`${styles.dialogBG}`} >
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
            <DialogTitle id="alert-dialog-slide-title" className={`${styles.dialogBG}`}>
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
            onClose={handleCancel}
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
               <Button onClick={handleCancel} className={styles.dialogText}>
                  Cancel
               </Button>
            </DialogActions>
         </Dialog>
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game))
