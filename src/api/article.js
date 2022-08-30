import request from 'utils/request'

export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/mp/articles',
    params,
  })
}
