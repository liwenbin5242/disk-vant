
const env = process.env.NODE_ENV
export const API_URL = env === 'development' ?  'http://127.0.0.1:3101/' : 'http://api.aassc.cn/' // 开发测试环境地址

export const TOKEN_KEY = 'token'
export const USERNAME = 'username'

export const AXIOS_BASE_URL = API_URL
// export const CODE =  env === 'development'? 'aaaaaa' : window.location.hostname.slice(0,6)
export const CODE = 'aaaaaa'

export const AXIOS_TIMEOUT = 60000 // 请求超时时间
