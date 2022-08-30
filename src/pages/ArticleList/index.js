import React, { Component } from 'react'

import style from 'pages/ArticleList/index.module.scss'
// Component
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  Select,
  DatePicker,
  Table,
  Tag,
  Space,
} from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

// Router
import { Link } from 'react-router-dom'

// API
import { ArticleStatus } from 'api/constant'
import { getChannels } from 'api/channel'
import { getArticles } from 'api/article'

// assets
import defaultImg from 'assets/error.png'

// Inner Component
const { Option } = Select

export default class ArticleList extends Component {
  state = {
    channels: [],
    articles: {},
  }

  pageParams = {
    page: 1,
    per_page: 10,
  }

  columns = [
    {
      title: '封面',
      render(data) {
        if (data.cover.type === 0) {
          return (
            <img
              src={defaultImg}
              alt=""
              style={{ width: 200, height: 120, objectFit: 'cover' }}
            />
          )
        } else {
          return (
            <img
              src={data.cover.images[0]}
              alt=""
              style={{ width: 200, height: 120, objectFit: 'cover' }}
            />
          )
        }
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(status) {
        const obj = ArticleStatus.find((item) => item.id === status)
        return <Tag color={obj.color}>{obj.name}</Tag>
      },
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render(data) {
        return (
          <>
            <Space>
              <Button type="primary" shape="circle" icon={<EditOutlined />} />

              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Space>
          </>
        )
      },
    },
  ]

  render() {
    const { total_count, results, per_page, page } = this.state.articles
    return (
      <div className={style.list}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Article List</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                {ArticleStatus.map((item) => (
                  <Radio key={item.id} value={item.id}>
                    {item.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item label="频道" name="Channel">
              <Select style={{ width: 200 }} placeholder="Please choose one">
                {this.state.channels.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="日期" name="date">
              <DatePicker.RangePicker />
            </Form.Item>

            {/* Confirm */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title={`Totall: ${total_count}`}>
          <Table
            columns={this.columns}
            dataSource={results}
            rowKey="id"
            pagination={{
              position: ['topCenter', 'bottomCenter'],
              total: total_count,
              pageSize: per_page,
              current: page,
              onChange: this.pageChange,
            }}
          />
        </Card>
      </div>
    )
  }

  componentDidMount() {
    this.getChannelList()
    this.getArticleList()
  }

  // Load Article List
  async getArticleList() {
    const { data } = await getArticles(this.pageParams)
    this.setState({
      articles: data,
    })
  }

  // Load channel list
  async getChannelList() {
    const { data } = await getChannels()
    this.setState({
      channels: data.channels,
    })
  }

  pageChange = (page, pageSize) => {
    this.pageParams.page = page
    this.pageParams.per_page = pageSize
    this.getArticleList(this.pageParams)
  }

  onFinish = (val) => {
    console.log(val)
  }
}
