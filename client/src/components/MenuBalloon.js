import React from 'react'
import { connect } from 'react-redux'
import { Card, makeStyles } from '@material-ui/core'
import { colorBalloons } from '../colorMap'
import myStyles from '../styles/myStyles'
import { SetHomeMode } from '../store/actions/UserActions'

const useStyles = makeStyles({
   card: {
      backgroundImage: (props) =>
         `url(${
            colorBalloons[props.color][0]
         })`,
      backgroundSize: 'cover',
      borderRadius: 15,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      maxWidth: '150px',
      height: '225px',
   },
   cardText: {
      margin: '40px auto',
      fontSize: '2.5em',
      fontWeight: 'bold'
   }
})


const mapStateToProps = ({ userState }) => {
    return { userState }
 }
 
 const mapDispatchToProps = (dispatch) => {
    return {
        setHomeMode: ( mode ) => dispatch(SetHomeMode(mode))
    }
 }
 
 const MenuBalloon = (props) => {
    const classes = useStyles( props )
    const styles = myStyles()

    return (
        <Card className={`${classes.card} ${styles.defaultText}`} onClick={() => props.setHomeMode( props.action )}>
            <div className={`${classes.cardText} ${props.action==='Play' ? "blink_me" : "" }`}>{props.action}</div>
        </Card>

    )
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(MenuBalloon)