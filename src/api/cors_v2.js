/**
 * @author 
 * @date 2024/1/5
 * @project yingxiao-pc
 * @description
 */
import request from '../utils/request'
import { API_URL } from '@/config/public-config'

export const accountApi = {
  register: API_URL + 'api/cors/v2/user/register',//用户注册
  login: API_URL + 'api/cors/v2/user/login', //用户登陆
  logout: API_URL + 'api/cors/v2/user/logout', //用户登出
  userInfo: API_URL + 'api/cors/v2/user/info',//  用户信息
  dokey: API_URL + 'api/cors/v2/user/dokey',//  兑换
  getAgentInfoApi: API_URL + 'api/cors/v2/agent/info',//  agent信息
}

export const userRegister = (params, config) => request.post(accountApi.register, {...params, ...config})
export const userLogin = (params, config) => request.post(accountApi.login, {...params, ...config})
export const getUserInfo = (params, config) => request.get(accountApi.userInfo, {params, ...config})
export const dokey = (params, config) => request.post(accountApi.dokey, {...params, ...config})
export const getAgentInfoApi = (params, config) => request.get(accountApi.getAgentInfoApi, {params, ...config})
export const doLogout = (params, config) => request.post(accountApi.logout, {...params, ...config})