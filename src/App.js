import { Router, Route, Link, Switch } from 'react-router-dom'
// Route
import AuthRoute from 'components/AuthRoute'
// component
import Layout from 'pages/Layout'
import Login from 'pages/Login'

// history obj
import history from 'utils/history'

import 'App.css'

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <AuthRoute path="/home" component={Layout}></AuthRoute>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
