import { Switch, Route, withRouter } from 'react-router-dom'
import Home from './components/Home'
import Game from './components/Game/Game'
import './styles/App.css'

function App() {
   return (
      <div className="App">
         <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route path="/game" component={() => <Game />} />
         </Switch>
      </div>
   )
}
export default withRouter(App)
