import React from 'react'
import { Card, makeStyles } from '@material-ui/core'
import { colorTrophies } from '../../colorMap'
import myStyles from '../../styles/myStyles'

const useStyles = makeStyles({
   trophy: {
      backgroundImage: (props) => `url(${colorTrophies[props.trophy.color]})`,
      backgroundSize: 'cover',
      borderRadius: 15,
      width: '80px',
      height: '120px',
      backgroundColor: 'transparent',
      boxShadow: 'none'
   },
   trophyCost: {
      margin: '22px auto',
   },
})

const Trophy = (props) => {
   const { trophy } = props
   const styles = myStyles()
   const classes = useStyles(props)

   return (
      <Card className={classes.trophy}>
         {props.showCost ? (
            <div
               className={`${classes.trophyCost} ${styles.defaultText} ${styles.size25}`}
            >
               {trophy.cost}
            </div>
         ) : null}
      </Card>
   )
}

export default Trophy
