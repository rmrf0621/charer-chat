/**   
 * api接口统一管理
 */
 import { get, post } from './http'

// 登录接口
 export const login = params => post('/api/user/login', params)

 // 获取好友列表
 export const friendlist = params =>get('api/friends/list',params)