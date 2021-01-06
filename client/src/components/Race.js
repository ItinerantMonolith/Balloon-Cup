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

const Race = ( props ) => {
    const { race } = props
    const { me, opp } = props.gameState
   const empties = new Array(4 - race.raceNo).fill({})
   return (
      <Grid container item xs={12} spacing={1} alignItems="center">
         {empties.map((e,i) => (<Grid item xs={1} key={i}></Grid>) )}
         {race.cards[me].map((card,i) => (
            <Grid item xs={1} key={i}>
               <BalloonCard card={card} cardMap={ { race: race.raceNo-1, side: 0, card: i } } />
            </Grid>
         ))}
         <Grid item xs={4}>
            <img src={ race.isLow ? plains : mountains } className="race" alt="race tile" />
            {race.cubes.map( (e,i) => (
                <img src={ colorCubes[e.color] } alt="cube" className="raceCube" key={i}/>
            ))}
         </Grid>
         {race.cards[opp].map((card, i) => (
            <Grid item xs={1} key={i}>
               <BalloonCard card={card} cardMap={ { race: race.raceNo-1, side: 1, card: i } } />
            </Grid>
         ))}
         {empties.map((e,i) => (<Grid item xs={1} key={i}></Grid>) )}
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Race)
