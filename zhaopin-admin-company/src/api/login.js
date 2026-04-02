import request from '@/utils/request'

// 登录方法
export function login (username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register (data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo () {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg () {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

// 首页广告
export function getAdvertisingList () {
  return request({
    url: '/api/noAuth/getAdvertisingList',
    method: 'get'
  })
}
// 获取行业
export function queryIndustryData () {
  return request({
    url: '/api/noAuth/queryIndustryData',
    method: 'get'
  })
}
// 上传文件
export function upload (data) {
  return request({
    url: '/api/noAuth/upload',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}


//查询主营行业
export function queryIndustryById () {
  return request({
    url: '/api/noAuth/queryIndustryById',
    method: 'get'
  })
}

