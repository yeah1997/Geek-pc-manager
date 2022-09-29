import React, { Component } from 'react'

import style from 'pages/ArticleList/index.module.scss'
// Component
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  DatePicker,
  Table,
  Tag,
  Space,
  Modal,
  message,
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'

// Router
import { Link } from 'react-router-dom'

// API
import { ArticleStatus } from 'api/constant'
import { getArticles, delArticle } from 'api/article'

// assets
import defaultImg from 'assets/error.png'

// self Component
import Channel from 'components/Channel'

// Inner Component
const { confirm } = Modal

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
      render: (data) => {
        return (
          <>
            <Space>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => this.handleEdit(data.id)}
              />

              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => this.handleDelete(data.id)}
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

            <Form.Item label="频道" name="channel_id">
              <Channel value></Channel>
            </Form.Item>

            <Form.Item label="日期" name="date">
              <DatePicker.RangePicker />
            </Form.Item>

            {/* Confirm */}
            <Form.Item>
              <Button type="primary" htmlType="submit" size="small">
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
    this.getArticleList()
  }

  // Load Article List
  async getArticleList() {
    const { data } = await getArticles(this.pageParams)
    this.setState({
      articles: data,
    })
  }

  pageChange = (page, pageSize) => {
    this.pageParams.page = page
    this.pageParams.per_page = pageSize
    this.getArticleList(this.pageParams)
  }

  // funciton for confirm
  onFinish = (val) => {
    const { status, channel_id, date } = val

    if (status !== -1) {
      this.pageParams.status = status
    } else {
      delete this.pageParams.status
    }

    if (channel_id !== undefined) {
      this.pageParams.channel_id = channel_id
    } else {
      delete this.pageParams.channel_id
    }

    if (date) {
      this.pageParams.begin_pubdate = date[0]
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
      this.pageChange.end_pubdate = date[1]
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    } else {
      delete this.pageParams.begin_pubdate
      delete this.pageParams.end_pubdate
    }
    // reset to fist page
    this.pageParams.page = 1
    this.getArticleList()
  }

  handleEdit = (id) => {
    this.props.history.push(`/home/publish/${id}`)
  }

  handleDelete = (id) => {
    confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content:
        'When clicked the OK button, this dialog will be closed after 1 second',
      onOk: async () => {
        await delArticle(id)
        this.getArticleList()
        message.success('Delete is completed!')
      },
      onCancel() {},
    })
  }
}
