import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Trophy from './Trophy'

const useStyles = makeStyles({
   emptyCard: {
      borderRadius: 15,
      width: '80px',
      height: '120px',
   },
})

const Trophies = ( props ) => {
    const { trophies } = props
   const classes = useStyles()

   return (
      <Grid container item xs={12} spacing={1} justify="center">
         { trophies.length ? (
            trophies.map((trophy) => (
               <Grid item xs={4} key={trophy.color}>
                  <Trophy trophy={trophy} key={trophy.color} showCost={props.showCost}/>
               </Grid>
            ))
         ) : (
            <div className={classes.emptyCard} />
         )}
      </Grid>
   )
}

export default Trophies
