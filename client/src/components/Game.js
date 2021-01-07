import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Dialog } from '@material-ui/core'
import { connect } from 'react-redux'
import Hand from './Hand'
import Race from './Race'
import DeckDisplay from './DeckDisplay'
import Prizes from './Prizes'
import { MsgToggle, ResetGame } from '../store/actions/GameActions'
import '../styles/Game.css'
import myStyles from '../styles/myStyles'

const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      msgToggle: (showMsg) => dispatch(MsgToggle(showMsg)),
      resetGame: () => dispatch(ResetGame()),
   }
}

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
            <Dialog open={props.gameState.hasMessage} onClose={handleClose}>
               {props.gameState.gameActions.map((action, i) => (
                  <div key={i}>{action}</div>
               ))}
               {props.gameState.nextPlayer >= 0 ? (
                  <div>
                     Turn #{props.gameState.gameTurn}: It is{' '}
                     {props.gameState.me === props.gameState.nextPlayer
                        ? 'YOUR'
                        : `${
                             props.gameState.players[props.gameState.nextPlayer]
                                .name
                          }'s`}{' '}
                     turn.
                  </div>
               ) : null}
            </Dialog>
            <Grid item xs={5}>
               <div className={`${styles.size25} ${styles.defaultText} ${styles.prizeCard}`}>
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
                  <div className={`${styles.defaultText} ${styles.size15} ${styles.oppTurn}`}>
                     {props.gameState.players[props.gameState.opp].name}'s TURN
                  </div>
               )}
            </Grid>
            <Grid item xs={5}>
               <div className={`${styles.size25} ${styles.defaultText} ${styles.prizeCard}`}>
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
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game))
