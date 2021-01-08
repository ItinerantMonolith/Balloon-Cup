import React from 'react'
import { Grid, Card, makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import BalloonCard from './BalloonCard'
import Cube from './Cube'
import plains from '../assets/Plains.png'
import mountains from '../assets/Mountains.png'
import { colorCubes } from '../colorMap'
import myStyles from '../styles/myStyles'

const useStyles = makeStyles({
   tile: {
      backgroundImage: (props) =>
         `url(${props.race.isLow ? plains : mountains})`,
      backgroundSize: 'cover',
      width: '160px',
      height: '160px',
      borderRadius: 5,
   },
})

const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {}
}

const Race = (props) => {
   const classes = useStyles(props)
   const styles = myStyles()

   const { race } = props
   const { me, opp } = props.gameState

   const lowDisp = (
      <Grid container justify="space-between">
         <div>
            <Grid container justify="space-evenly">
               <div className={`${styles.size25} ${styles.defaultText}`}>1</div>
               <div className={`${styles.size2} ${styles.defaultText}`}>2</div>
               <div className={`${styles.size15} ${styles.defaultText}`}>3</div>
            </Grid>
         </div>
         <div className={`${styles.size1} ${styles.defaultText}`}>13</div>
      </Grid>
   )

   const highDisp = (
      <Grid container justify="space-between">
         <div className={`${styles.size1} ${styles.defaultText}`}>1</div>
         <div>
            <Grid container justify="space-evenly">
               <div className={`${styles.size15} ${styles.defaultText}`}>11</div>
               <div className={`${styles.size2} ${styles.defaultText}`}>12</div>
               <div className={`${styles.size25} ${styles.defaultText}`}>13</div>
            </Grid>
         </div>
      </Grid>
   )

   return (
      <Grid container item xs={12} spacing={1} alignItems="center">
         <Grid container item xs={5} spacing={1} justify="flex-end">
            {race.cards[me].map((card, i) => (
               <Grid item key={i}>
                  <BalloonCard
                     card={card}
                     cardMap={{ race: race.raceNo - 1, side: 0, card: i }}
                  />
               </Grid>
            ))}
         </Grid>
         <Grid container item xs={2} justify="center">
            <Grid item>
               <Card className={classes.tile}>
                  <Grid
                     container
                     direction="column"
                     justify="space-between"
                     className={styles.tileContainer}
                  >
                     {race.isLow ? lowDisp : highDisp}
                     <Grid container justify="space-evenly">
                        {race.cubes.map((e, i) => (
                           <Cube cubeCount={-1} cubeColor={e.color} />
                        ))}
                     </Grid>
                  </Grid>
               </Card>
            </Grid>
         </Grid>
         <Grid container item xs={5} spacing={1} justify="flex-start">
            {race.cards[opp].map((card, i) => (
               <Grid item key={i}>
                  <BalloonCard
                     card={card}
                     cardMap={{ race: race.raceNo - 1, side: 1, card: i }}
                  />
               </Grid>
            ))}
         </Grid>
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Race)
