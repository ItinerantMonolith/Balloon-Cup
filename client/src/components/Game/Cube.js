import React from 'react'
import { Card, makeStyles } from '@material-ui/core'
import { colorCubes } from '../../colorMap'
import myStyles from '../../styles/myStyles'

const useStyles = makeStyles({
   cube: {
      backgroundImage: (props) => `url(${colorCubes[props.cubeColor]})`,
      backgroundSize: 'cover',
      backgroundColor: 'transparent',
      width: (props) => props.cubeCount >= 0 ? '40px' : '30px',
      height: (props) => props.cubeCount >= 0 ? '40px' : '30px',
      boxShadow: 'none'
   },
   cubeCount: {
      margin: '8px 0px 0px -5px',
   },
})

const Cube = (props) => {
   const styles = myStyles()
   const classes = useStyles(props)

   return (
      <Card className={classes.cube}>
         { props.cubeCount >= 0 ? (
            <div
               className={`${classes.cubeCount} ${styles.defaultText} ${styles.size15}`}
            >
               {props.cubeCount}
            </div>
         ) : null}
      </Card>
   )
}

export default Cube
