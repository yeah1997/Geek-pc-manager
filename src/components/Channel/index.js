import React, { Component } from 'react'

import { Select } from 'antd'

import { getChannels } from 'api/channel'

const { Option } = Select

export default class index extends Component {
  state = {
    channels: [],
  }
  render() {
    return (
      <Select
        style={{ width: 200 }}
        placeholder="Please choose one"
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {this.state.channels.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    )
  }

  componentDidMount() {
    this.getChannelList()
  }

  // Load channel list
  async getChannelList() {
    const { data } = await getChannels()

    this.setState({
      channels: data.channels,
    })
  }
}
