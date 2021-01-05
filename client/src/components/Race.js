import React from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import BalloonCard from './BalloonCard'
import plains from '../assets/Plains.png'
import mountains from '../assets/Mountains.png'
import { colorCubes } from '../colorMap'
// import io from 'socket.io-client'

const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      //    connectGame: (socket) => dispatch(ConnectToGame(socket)),
   }
}

const Race = ({ race }) => {
   const empties = new Array(4 - race.raceNo).fill(<Grid item xs={1}></Grid>)
   return (
      <Grid container item xs={12} spacing={1} alignItems="center">
         {empties.map((e) => e)}
         {race.cards[0].map((card) => (
            <Grid item xs={1}>
               <BalloonCard card={card} />
            </Grid>
         ))}
         <Grid item xs={4}>
            <img src={ race.isLow ? plains : mountains } className="race" alt="race tile" />
            {race.cubes.map( e => (
                <img src={ colorCubes[e.color] } alt="cube" className="raceCube" />
            ))}
         </Grid>
         {race.cards[1].map((card) => (
            <Grid item xs={1}>
               <BalloonCard card={card} />
            </Grid>
         ))}
         {empties.map((e) => e)}
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Race)
