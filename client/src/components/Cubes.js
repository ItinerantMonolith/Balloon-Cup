import React from 'react'
import { Grid, Card } from '@material-ui/core'
import { colorCubes } from '../colorMap'

const Cubes = (props) => {

   return (
      <Grid container spacing={2}>
         <Grid item xs={1}> </Grid>
         {props.cubes.map((cube, i) => (
            <Grid item xs={2}>
               <Card>
                   <img src={colorCubes[i]} alt="Cube" className='cube' />
                   {`${cube}`}
               </Card>
            </Grid>
         ))}
         <Grid item xs={1}> </Grid>
      </Grid>
   )
}

export default Cubes
