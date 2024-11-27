/*!*
 * request 用于发送及初步处理请求，
 * 包括，处理未登录，无权限，基本操作提示信息，以及loading动画，
 * loading 目前只能用默认配置 loadingConfig
 */
import axios from 'axios'
import _ from 'lodash'
import { AXIOS_TIMEOUT, } from '../config/public-config'
import {  removeToken, getToken  } from './token'
import { Toast } from 'vant';

const request = axios.create({
    timeout: AXIOS_TIMEOUT,
})

// let currentLoading = []
request.interceptors.request.use((config) => {
    const token = getToken();
    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    // 去除data和params种的空参数
    if (config.data) {
        config.data = _.omitBy(config.data, (value, key) => {
            key
            return value === null
        })
    }
    if (config.params) {
        config.params = _.omitBy(config.params, (value, key) => {
            key
            return value === null || value === ''
        })
    }
    if (config.loading) {
        // currentLoading.push(ElLoading.service({
        //     target: config.loading
        // }))
    }
    return config
},(error) => {
    return Promise.reject(error)}
)
// respone拦截器
request.interceptors.response.use(
    (response) => {
        const { data, headers } = response
        headers
        if (data.code!==0) {
            Toast.fail(data.message)
            return Promise.reject()
        }
        return Promise.resolve(data)
    },
    (error) => {
        const err = error
        // loading.close()
        const resp = err.response
        const cfg = err.config

        if (resp == null) {
            return Promise.reject(resp)
        }
        if (resp.status === 401) {
            removeToken()

        } else if (resp.status === 423) {
            removeToken()
            window.location.reload()
        } else if (!cfg.extra?.silent) {
             ({
                message: resp.data.message,
                type: 'error',
                duration: 2000
            })
        }

        if (cfg.extra?.allData) {
            return Promise.reject(resp)
        }
        return Promise.reject(resp.data)
    }
)

export default request
