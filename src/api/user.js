import request from 'utils/request'

/**
 *
 * @param {String} mobile
 * @param {String} code
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code,
    },
  })
}

/**
 *
 * @returns profile
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/user/profile',
  })
}
