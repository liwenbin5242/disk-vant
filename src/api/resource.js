/**
 * @author 
 * @date 2024/1/5
 * @project yingxiao-pc
 * @description
 */
import request from '../utils/request'
import { API_URL } from '@/config/public-config'

export const accountApi = {
  panList: API_URL + 'api/cors/disks/files',//获取网盘目录文件列表
  treeList: API_URL + 'api/cors/v2/disks/paths', //04.通过后台用户code获取共享的网盘目录列表(目录列表是在后台自己创建的一个树状目录)
  fList: API_URL + 'api/cors/v2/disks/path/id', 
  filesList: API_URL + 'api/cors/v2/disks/files', //通过官方api查询获取文件列表
  search: API_URL + 'api/cors/disks/files/search',//  搜索框接口
  shareUrl: API_URL + 'api/cors/disks/files/shareurl', //获取分享地址
  permission: API_URL + 'api/cors/v2/disks/files/permission', //获取文件许可
  filesLinks: API_URL + 'api/cors/v2/disks/files/links', //获取文件许可
}

export const getPanList = (params, config) => request.get(accountApi.panList, {params, ...config})
export const getTreeList = (params, config) => request.get(accountApi.treeList, {params, ...config})
export const getFList = (params, config) => request.get(accountApi.fList, {params, ...config})
export const getSearch = (params, config) => request.get(accountApi.search, {params, ...config})
export const getShareUrl = (params, config) => request.get(accountApi.shareUrl, {params, ...config})
export const getPermission = (params, config) => request.post(accountApi.permission, {params, ...config})
export const getFilesList = (params, config) => request.get(accountApi.filesList, {params, ...config})
export const getFilesLinks = (params, config) => request.post(accountApi.filesLinks, {...params, ...config})
