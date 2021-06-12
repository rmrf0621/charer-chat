/**   
 * api接口统一管理
 */
import {get, post } from './http'

// 登录接口
export const login = params => post('user/login', params)

// 获取好友列表
export const friendlist = params => get('friends/list', params)

// 获取当前登录用户的相关配置
export const userconfig = params => get('user/userconfig')