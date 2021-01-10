import React from 'react'
import { withRouter } from 'react-router-dom'
import {
   Grid,
} from '@material-ui/core'
import { connect } from 'react-redux'
import Hand from './Hand'
import Race from './Race'
import DeckDisplay from './DeckDisplay'
import Prizes from './Prizes'
import Dialogs from './Dialogs'
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

const Game = (props) => {
   const styles = myStyles()

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
         <Dialogs />
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game))
