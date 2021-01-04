// import React, { useState, useEffect } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import UpdateName from './pages/UpdateName'
import UpdatePassword from './pages/UpdatePassword'
// import { __CheckSession } from './services/UserService'
import './styles/App.css'

function App() {
   return (
      <div className="App">
         <Nav />
         <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route path="/updatename" component={(props) => <UpdateName />} />
            <Route
               path="/updatepassword"
               component={(props) => <UpdatePassword />}
            />
            <Route path="/register" component={(props) => <Register />} />
            <Route path="/login" component={() => <Login />} />
            {/* <Route path="/game" component={() => <Game />} /> */}
         </Switch>
      </div>
   )
}
export default withRouter(App)
