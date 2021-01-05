import React from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import Hand from './Hand'
import Race from './Race'
import DeckDisplay from './DeckDisplay'


const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      //    connectGame: (socket) => dispatch(ConnectToGame(socket)),
   }
}

const Game = (props) => {


   return (
      <Grid container spacing={1}>
         <Grid item xs={2}>
            <Hand />
         </Grid>
         <Grid container item xs={8} spacing={2}>
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
