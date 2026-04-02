import request from '@/utils/request'

// 查询用户收藏列表
export function listUsercollect(query) {
  return request({
    url: '/baseconfig/usercollect/list',
    method: 'get',
    params: query
  })
}

// 查询用户收藏详细
export function getUsercollect(id) {
  return request({
    url: '/baseconfig/usercollect/' + id,
    method: 'get'
  })
}

// 新增用户收藏
export function addUsercollect(data) {
  return request({
    url: '/baseconfig/usercollect',
    method: 'post',
    data: data
  })
}

// 修改用户收藏
export function updateUsercollect(data) {
  return request({
    url: '/baseconfig/usercollect',
    method: 'put',
    data: data
  })
}

// 删除用户收藏
export function delUsercollect(id) {
  return request({
    url: '/baseconfig/usercollect/' + id,
    method: 'delete'
  })
}
