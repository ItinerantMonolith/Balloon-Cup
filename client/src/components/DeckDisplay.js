import React from 'react'
import { Grid, Paper, Card } from '@material-ui/core'
import { connect } from 'react-redux'
import Trophies from './Trophies'
import myStyles from '../styles/myStyles'
import Prizes from './Prizes'

const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      //    connectGame: (socket) => dispatch(ConnectToGame(socket)),
   }
}

const DeckDisplay = (props) => {
   const styles = myStyles()

   return (
      <Grid container spacing={6}>
         <Grid item xs={12}>
            <Paper className={styles.prizeCard}>
               <Grid container spacing={2} className={styles.gridCenter}>
                  <Grid item xs={12}>
                     <div className={`${styles.defaultText} ${styles.size2}`}>
                        Trophies Available
                     </div>
                  </Grid>
                  <Grid item xs={12}>
                     <Trophies
                        trophies={props.gameState.trophies}
                        showCost={true}
                     />
                  </Grid>
               </Grid>
            </Paper>
         </Grid>
         <Grid item xs={12}>
            <Paper className={styles.prizeCard}>
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
