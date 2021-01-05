import React from 'react'
import { Grid, Paper, Card } from '@material-ui/core'
import { connect } from 'react-redux'
import Trophy from './Trophy'
import Cubes from './Cubes'

const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      //    connectGame: (socket) => dispatch(ConnectToGame(socket)),
   }
}

const DeckDisplay = (props) => {
   const opp = props.gameState.players[props.gameState.opp]
   return (
      <Grid container spacing={6}>
         <Grid item xs={12}>
            <Paper>
               <Grid container spacing={2}>
                  <Grid item xs={4}>
                     <Card>Cards in Deck: {props.gameState.deck}</Card>
                  </Grid>
                  <Grid item xs={4}>
                     <Card>Cards in Discard: {props.gameState.discards}</Card>
                  </Grid>
                  <Grid item xs={4}>
                     <Card>Cubes in Bag: {props.gameState.bag}</Card>
                  </Grid>

                  <Grid item xs={12}>
                     <h3>Trophies Available</h3>
                  </Grid>
                  <Grid container item xs={12} spacing={1}>
                     {props.gameState.trophies.map((trophy) => (
                        <Grid item xs>
                           <Trophy trophy={trophy.color} key={trophy.color}/>
                        </Grid>
                     ))}
                  </Grid>
               </Grid>
            </Paper>
         </Grid>
         <Grid item xs={12}>
            <Paper>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <h3>{`${opp.name}'s Hand`}</h3>
                  </Grid>
                  <Cubes cubes={opp.cubes} />
                  <Grid container spacing={2}>
                     {opp.trophies.map((trophy) => (
                        <Grid item xs>
                           <Trophy trophy={trophy} />
                        </Grid>
                     ))}
                  </Grid>
               </Grid>
            </Paper>
         </Grid>
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDisplay)

// {
//     id: player.id,
//     name: '',
//     cards: [],
//     cubes: [],
//     trophies: []
// }
