import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { connect } from 'react-redux'

import BalloonCard from './BalloonCard'
import myStyles from '../../styles/myStyles'

const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {}
}

const Hand = (props) => {
   const me = props.gameState.players[props.gameState.me]
   const styles = myStyles()

   return (
      <Paper className={styles.prizeCard}>
         <Grid container spacing={1} className={styles.gridCenter}>
            <Grid item xs={12}>
               <div className={`${styles.defaultText} ${styles.size2}`}>
                  Your Hand
               </div>
            </Grid>
            <Grid container item xs={12} justify='center' spacing={1}  className={styles.gridCenter}>
               {me.cards.map((card) => (
                  <Grid item xs={4} key={card.id}>
                     <BalloonCard card={card} />
                  </Grid>
               ))}
            </Grid>
         </Grid>
      </Paper>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Hand)
