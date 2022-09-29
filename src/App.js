import { Router, Route, Switch, Redirect } from 'react-router-dom'
// Route
import AuthRoute from 'components/AuthRoute'
// component
// import Layout from 'pages/Layout'
// import Login from 'pages/Login'

// React
import React, { Suspense } from 'react'

// history obj
import history from 'utils/history'

import 'App.css'

const Login = React.lazy(() => import('pages/Login'))
const Layout = React.lazy(() => import('pages/Layout'))

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <AuthRoute path="/home" component={Layout}></AuthRoute>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
