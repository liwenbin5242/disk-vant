/**
 * @author wangyingying
 * @date 2024/1/5
 * @project yingxiao-pc
 * @description
 */

import cookie from 'js-cookie'
import { TOKEN_KEY, USERNAME } from '@/config/public-config'

export const isLogin = () => {
    if (cookie.get(TOKEN_KEY) == 'undefined' || cookie.get(TOKEN_KEY) == 'null') {
        return false
    } else {
        return cookie.get(TOKEN_KEY)
    }
}
export const setUsername = (username) => {
  return cookie.set(USERNAME, username)
}

export const getUsername = () => {
  return cookie.get(USERNAME)
}

export const setToken = (token) => {
  return cookie.set(TOKEN_KEY, token)
}
export const getToken = () => {
  return cookie.get(TOKEN_KEY)
}
export const removeToken = () => {
  cookie.remove(USERNAME)
  return cookie.remove(TOKEN_KEY)
}
