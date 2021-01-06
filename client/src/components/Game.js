import React from 'react'
import { Grid, Dialog } from '@material-ui/core'
import { connect } from 'react-redux'
// import io from 'socket.io-client'
import Hand from './Hand'
import Race from './Race'
import DeckDisplay from './DeckDisplay'
import { MsgToggle } from '../store/actions/GameActions'
import '../styles/Game.css'

const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      msgToggle: ( showMsg ) => dispatch(MsgToggle(showMsg))
   }
}

const Game = (props) => {

   const handleClose = () => {
      props.msgToggle(false)
   }

   return (
      <Grid container spacing={1}>
         <Grid item xs={2}>
            <Hand />
         </Grid>
         <Grid container item xs={8} spacing={2}>
            <Dialog open={props.gameState.hasMessage} onClose={handleClose} >
                { props.gameState.gameActions.map ( (action,i) => (
                    <div key={i}>{action}</div>
                ))}
                <div>It is {props.gameState.players[ props.gameState.nextPlayer].name}'s turn.</div>
            </Dialog>
            <Grid item xs={6}>
               <h3>
                  {props.gameState.players[props.gameState.me].name}'s Play Area
               </h3>
            </Grid>
            <Grid item xs={6}>
               <h3>
                  {props.gameState.players[props.gameState.opp].name}'s Play
                  Area
               </h3>
            </Grid>
            {props.gameState.races.map((race) => (
               <Race race={race} key={race.raceNo} />
            ))}
         </Grid>
         <Grid item xs={2}>
            <DeckDisplay />
         </Grid>
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
