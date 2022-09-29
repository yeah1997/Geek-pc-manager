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

/**
 * Add article
 * @param {*} data
 * @returns
 */
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: `/mp/articles?draft=${draft}`,

    data,
  })
}
/**
 *
 * @param {*} id
 * @returns
 */
export const getArticleById = (id) => {
  return request({
    method: 'GET',
    url: `/mp/articles/${id}`,
  })
}

/**
 *
 * @param {*} data
 * @param {*} draft
 * @returns
 */
export const updateArticle = (data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/articles/${data.id}?draft=${draft}`,
    data,
  })
}
