import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   Button,
   Icon,
   Menu,
   MenuItem,
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import '../styles/App.css'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      //   setView: (viewId) => dispatch(SetView(viewId)),
      //   viewMovie: (movieId) => dispatch(ViewMovie(movieId)),
   }
}

const Nav = (props) => {
   const [anchorEl, setAnchorEl] = useState('')

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }
   return props.userState.authenticated && props.userState.name ? (
      <div >
         <AppBar style={{ backgroundColor: 'skyblue' }} position="absolute">
            <Toolbar>
               <IconButton
                  onClick={() => props.history.push('/')}
                  edge="start"
                  aria-label="menu"
                  style={{ color: 'white' }}
               >
                  <Icon>games</Icon>
               </IconButton>
               <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Balloon Cup!
               </Typography>

               <Typography
                  className="hello_user"
                  variant="h6"
                  style={{ flexGrow: 0.7 }}
               >
                  Hello, {props.userState.name}
               </Typography>

               <Button
                  style={{ color: 'white' }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
               >
                  Account
               </Button>
               <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
               >
                  <MenuItem
                     onClick={() => {
                        handleClose()
                        props.history.push('/updatename')
                     }}
                  >
                     Change Name
                  </MenuItem>
                  <MenuItem
                     onClick={() => {
                        handleClose()
                        props.history.push('/updatepassword')
                     }}
                  >
                     Change Password
                  </MenuItem>
               </Menu>
               <Button
                  href="/"
                  onClick={() => localStorage.clear()}
                  style={{ color: 'white' }}
               >
                  Logout
               </Button>
            </Toolbar>
         </AppBar>
      </div>
   ) : (
      <div>
         <AppBar style={{ backgroundColor: 'skyblue' }} position="absolute">
            <Toolbar>
               <IconButton
                  href="/"
                  edge="start"
                  aria-label="menu"
                  style={{ color: 'white' }}
               >
                  <Icon>games</Icon>
               </IconButton>
               <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Balloon Cup!
               </Typography>
               <Button color="inherit" href="/login">
                  Login
               </Button>
               <Button color="inherit" href="/register">
                  Register
               </Button>
            </Toolbar>
         </AppBar>
      </div>
   )
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav))
