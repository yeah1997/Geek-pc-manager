import { Router, Route, Switch, Redirect } from 'react-router-dom'
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
          <Redirect exact from="/" to="/home"></Redirect>
          <AuthRoute path="/home" component={Layout}></AuthRoute>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
