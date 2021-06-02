/**   
 * api接口统一管理
 */
 import { get, post } from './http'

// 登录接口
 export const login = params => post('/api/user/login', params);