// make this the prize area..cubes & trophies....give it a player?
import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { connect } from 'react-redux'

import Cubes from './Cubes'
import Trophies from './Trophies'

import myStyles from '../styles/myStyles'


const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {}
}

const Prizes = (props) => {
   const { playerId } = props
   const player = props.gameState.players[playerId]
   const styles = myStyles()

   return (
      <Paper className={styles.prizeCard} >
         <Grid container spacing={2} justify="center" direction="column" alignContent='space-between'>
            <Grid item >
               <div
                  className={`${styles.defaultText} ${styles.size2}`}
               >{`${player.name}'s Prizes`}</div>
            </Grid>

            <Grid item >
               <Cubes cubes={player.cubes} />
            </Grid>
            <Grid item>
                <Trophies trophies={player.trophies} showCost={false}/>
            </Grid>
         </Grid>
      </Paper>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Prizes)
