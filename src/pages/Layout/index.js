// React
import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

// Frame work
import { Layout, Menu, Popconfirm } from 'antd'
import {
  LogoutOutlined,
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
} from '@ant-design/icons'

// css
import styles from 'pages/Layout/index.module.scss'

// Component
import Home from 'pages/Home'
import ArticleList from 'pages/ArticleList'
import ArticlePublish from 'pages/ArticlePublish'

// api
import { getUserProfile } from 'api/user'

// utils
import { removeToken } from 'utils/storage'

const { Header, Content, Sider } = Layout

export default class LayoutComponent extends Component {
  state = {
    profile: {},
  }

  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="proile">
              <span>{this.state.profile.name}</span>
              <span>
                <Popconfirm
                  title="Are you sure to logout?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={this.onConfirm}
                >
                  <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={[this.props.location.pathname]}
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="/home" icon={<HomeOutlined />}>
                  <Link to="/home"> 数据概览</Link>
                </Menu.Item>

                <Menu.Item key="/home/list" icon={<DiffOutlined />}>
                  <Link to="/home/list">内容管理</Link>
                </Menu.Item>
                <Menu.Item key="/home/publish" icon={<EditOutlined />}>
                  <Link to="/home/publish">发布文章</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: '12px' }}>
              <Content className="site-layout-background">
                {/* Switch Router */}
                <Switch>
                  <Route exact path="/home" component={Home}></Route>
                  <Route path="/home/list" component={ArticleList}></Route>
                  <Route
                    path="/home/publish"
                    component={ArticlePublish}
                  ></Route>
                </Switch>
                {/* Switch Router */}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  async componentDidMount() {
    const { data } = await getUserProfile()
    this.setState({
      profile: data,
    })
  }

  onConfirm = () => {
    removeToken() // delete token
    this.props.history.push('/login') // back to login
  }
}
