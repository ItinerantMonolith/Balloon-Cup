import React from 'react'
import { Grid, Card } from '@material-ui/core'
import { colorCubes } from '../colorMap'
import Cube from './Cube'
import myStyles from '../styles/myStyles'

const Cubes = (props) => {
    const styles = myStyles()

   return (
      <Grid container spacing={2}>
         <Grid item xs={1}> </Grid>
         {props.cubes.map((cube, i) => (
            <Grid item xs={2}  key={i}>
                <Cube cubeColor={i} cubeCount={cube} />
            </Grid>
         ))}
         <Grid item xs={1}> </Grid>
      </Grid>
   )
}

export default Cubes
