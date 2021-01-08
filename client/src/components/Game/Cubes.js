import React from 'react'
import { Grid } from '@material-ui/core'
import Cube from './Cube'

const Cubes = (props) => {

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
