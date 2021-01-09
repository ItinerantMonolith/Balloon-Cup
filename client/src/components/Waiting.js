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

const Waiting = (props) => {
   const styles = myStyles()

   return (
      <div style={{ padding: '2% 5%' }}>
         Waiting
      </div>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Waiting)
