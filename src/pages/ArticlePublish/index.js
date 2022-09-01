import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Space,
  Input,
  Radio,
  Upload,
  Modal,
  message,
} from 'antd'

import { PlusOutlined } from '@ant-design/icons'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// self Component
import Channel from 'components/Channel'
// quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { BASE_URL } from 'utils/request'

// style
import style from 'pages/ArticlePublish/index.module.scss'

import { addArticle } from 'api/article'

export default class ArticlePublish extends Component {
  state = {
    // Number of Img
    type: 0,
    fileList: [],
    isShowPreview: false,
    preveiwUrl: '',
  }

  formRef = React.createRef()

  render() {
    const { fileList, type, isShowPreview, preveiwUrl } = this.state
    return (
      <div className={style.publish}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Article Publish</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            ref={this.formRef}
            labelCol={{ span: 3 }}
            size="large"
            onFinish={this.onFinish}
            validateTrigger={['onBlur', 'onChange']}
            initialValues={{ content: '', type: type }}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '不能为空' }]}
            >
              <Input
                style={{ width: 400 }}
                placeholder="请输入文章的标题"
              ></Input>
            </Form.Item>

            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: 'Please choose one' }]}
            >
              <Channel value></Channel>
            </Form.Item>

            <Form.Item label="封面" name="type">
              <Radio.Group onChange={this.changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>`
              </Radio.Group>
            </Form.Item>
            {/* Upload */}
            <Form.Item wrapperCol={{ offset: 3 }}>
              {type !== 0 && (
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  name="image"
                  action={`${BASE_URL}upload`}
                  onChange={this.uploadImage}
                  onPreview={this.handlePreview}
                  beforeUpload={this.beforeUpload}
                >
                  {fileList.length < type && <PlusOutlined></PlusOutlined>}
                </Upload>
              )}
            </Form.Item>
            {/* Upload */}
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: 'please input something' }]}
            >
              <ReactQuill theme="snow" placeholder="please input something" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 3 }}>
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  发布文章
                </Button>
                <Button size="large" onClick={this.addDraft}>
                  存入草稿
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        <Modal
          visible={isShowPreview}
          title="Image preview"
          footer={null}
          onCancel={this.handleCancle}
        >
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={preveiwUrl}
          />
        </Modal>
      </div>
    )
  }

  uploadImage = ({ fileList }) => {
    this.setState({
      fileList,
    })
  }

  beforeUpload(file) {
    if (file.size >= 1024 * 500) {
      message.warn('Can not over 500kb')
      return Upload.LIST_IGNORE
    }

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.warn('Only png/jpeg')
      return Upload.LIST_IGNORE
    }

    return true
  }

  handlePreview = (file) => {
    const url = file.url || file.response.data.url
    this.setState({
      isShowPreview: true,
      preveiwUrl: url,
    })
  }

  // add draft
  addDraft = async () => {
    const formData = await this.formRef.current.validateFields()
    this.confirmForm(formData, true)

    message.success('Success add a draft')
    this.props.history.push('/home')
  }

  handleCancle = () => {
    console.log(this)
    this.setState({
      isShowPreview: false,
      preveiwUrl: '',
    })
  }

  async confirmForm(value, draft) {
    const { fileList, type } = this.state

    if (fileList.length !== type) {
      return message.warn('数量不正确')
    }

    const images = fileList.map((item) => {
      return item.url || item.response.data.url
    })

    await addArticle(
      {
        ...value,
        cover: {
          type,
          images,
        },
      },
      draft
    )
  }

  // publish
  onFinish = async (value) => {
    this.confirmForm(value, false)
    message.success('Success add a article')
    this.props.history.push('/home')
  }

  changeType = (e) => {
    this.setState({
      type: e.target.value,
      fileList: [],
    })
  }
}
