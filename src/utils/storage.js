const TOKEN_KEY = 'token-geek-pc-ver'

/**
 *
 * @param {String} token
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 *
 * @returns token
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY)

/**
 *
 * @returns no
 */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export const hasToken = () => !!getToken()
