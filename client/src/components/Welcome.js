import React from 'react'
import { connect } from 'react-redux'
import myStyles from '../styles/myStyles'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

const Welcome = (props) => {
   const styles = myStyles()

   return (
      <div style={{ padding: '2% 5%' }}>
         <div className={`${styles.defaultText} ${styles.size25}`}>
            Welcome to Balloon Cup{ props.userState.isAuthenticated ? `, ${props.userState.name}` : '' }!
         </div>
         <div className={`${styles.dialogText} ${styles.size1}`} style={{ margin: '5px'}}>
            In Balloon Cup, the players compete in several short balloon flights
            (hops) to collect the colored cubes associated with each hop. When a
            player has collected enough cubes of a given color, he earns the
            trophy card for that color. Players may even trade 3 otherwise
            useless cubes for 1 they can use. The first player to earn 3 trophy
            cards is the winner!
         </div>
         <div className={`${styles.dialogText} ${styles.size1}`} style={{ margin: '5px'}}>
            Each player has a hand of eight balloon cards. The players play
            their balloons on mountain or plain hops. Players play their
            high-valued balloons on the mountains and their low- valued balloons
            on the plains.
         </div>
         <div className={`${styles.dialogText} ${styles.size1}`} style={{ margin: '5px'}}>
            Players usually play their balloons on their side of the hops, but
            winds (and cunning) can cause them to play on their opponent's side,
            a move that can ruin their opponent's plans.
         </div>
      </div>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
