import request from '@/utils/request'

// 查询用户浏览记录列表
export function listBrowser(query) {
  return request({
    url: '/baseconfig/browser/list',
    method: 'get',
    params: query
  })
}

// 查询用户浏览记录详细
export function getBrowser(id) {
  return request({
    url: '/baseconfig/browser/' + id,
    method: 'get'
  })
}

// 新增用户浏览记录
export function addBrowser(data) {
  return request({
    url: '/baseconfig/browser',
    method: 'post',
    data: data
  })
}

// 修改用户浏览记录
export function updateBrowser(data) {
  return request({
    url: '/baseconfig/browser',
    method: 'put',
    data: data
  })
}

// 删除用户浏览记录
export function delBrowser(id) {
  return request({
    url: '/baseconfig/browser/' + id,
    method: 'delete'
  })
}
