import React, { Component } from 'react'
import { Card } from 'antd'
import './index.css'

// img
import logo from '../../assets/logo.png'

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <Card className="login-container">
          <img src={logo} className="login-logo" />
        </Card>
      </div>
    )
  }
}
