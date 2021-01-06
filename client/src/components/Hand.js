import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { connect } from 'react-redux'

import BalloonCard from './BalloonCard'
import Cubes from './Cubes'
import Trophy from './Trophy'

const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      //    connectGame: (socket) => dispatch(ConnectToGame(socket)),
   }
}

const Hand = (props) => {
   const me = props.gameState.players[props.gameState.me]
   return (
      <React.Fragment>
         <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
               <Paper className='centerText'>
                  <h2 >{`${me.name}'s Hand`}</h2>
               </Paper>
            </Grid>
            {me.cards.map((card) => (
               <Grid item xs={6} key={card.id}>
                  <BalloonCard card={card}/>
               </Grid>
            ))}
         </Grid>
         <Cubes cubes={me.cubes} />
         <Grid container spacing={2}>
            {me.trophies.map((trophy) => (
               <Grid item xs>
                  <Trophy trophy={trophy}  key={trophy}/>
               </Grid>
            ))}
         </Grid>
      </React.Fragment>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Hand)
