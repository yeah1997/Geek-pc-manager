import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { hasToken } from 'utils/storage'

import { Redirect } from 'react-router-dom'

export default class AuthRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={(routeProps) => {
          if (hasToken()) {
            return <Component {...routeProps} />
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  // search: '?from=' + routeProps.location.pathname,
                  state: { from: routeProps.location.pathname },
                }}
              ></Redirect>
            )
          }
        }}
      ></Route>
    )
  }
}
