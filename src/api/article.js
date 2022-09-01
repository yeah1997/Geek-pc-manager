import request from 'utils/request'

export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/mp/articles',
    params,
  })
}

/**
 * Delete Article
 * @param {*} id
 * @returns
 */
export const delArticle = (id) => {
  return request({
    method: 'DELETE',
    url: `/mp/articles/${id}`,
  })
}
