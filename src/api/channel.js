import request from 'utils/request'

/**
 * Get Channel Data
 * @returns
 */
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/channels',
  })
}
