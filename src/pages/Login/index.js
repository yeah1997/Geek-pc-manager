import React, { Component } from 'react'
import { Card, Button, Checkbox, Form, Input } from 'antd'
import './index.scss'

// img
import logo from 'assets/logo.png'

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <Card className="login-container">
          <img src={logo} className="login-logo" alt="" />

          {/* Login From */}
          <Form
            autoComplete="off"
            labelCol={{ span: 4 }}
            onFinish={this.onFinish}
            initialValues={{
              mobile: '13911111111',
              code: '246810',
            }}
          >
            <Form.Item
              label="Phone"
              name="mobile"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: 'Please input phone number!' },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: 'Invalid cell phone number format',
                },
              ]}
            >
              <Input
                placeholder="Pease input your phone number"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              label="Code"
              name="code"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: 'Pease input your phone code' },
                { pattern: /^\d{6}$/, message: 'Invalid cell Code format' },
              ]}
            >
              <Input
                placeholder="Please input your password"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              name="agree"
              wrapperCol={{
                offset: 7,
                span: 15,
              }}
              rules={[
                {
                  // Rule of checkbox
                  validator(rule, value) {
                    if (value === true) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(new Error('Please check it'))
                    }
                  },
                },
              ]}
            >
              <Checkbox>I am not a robort</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  //   Confirm to login
  onFinish = (values) => {
    console.log(values)
  }
}
