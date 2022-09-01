import axios from 'axios'
// Component
import { message } from 'antd'
// history(Router)
import { createBrowserHistory } from 'history'
import { hasToken, getToken, removeToken } from 'utils/storage'

/**
 * Url handler(history obj - Router)
 */
import history from './history'

export const BASE_URL = 'http://geek.itheima.net/v1_0/'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // Token Setting
    if (hasToken) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // Remove token
    if (!error.response) {
      // Time out
      message.error('网络繁忙')
      return Promise.reject('网络繁忙!')
    }

    if (error.response.status === 401) {
      removeToken()
      message.warning('Token is timeout', 2)
      history.push('/login')
    }

    return Promise.reject(error)
  }
)

export default instance
