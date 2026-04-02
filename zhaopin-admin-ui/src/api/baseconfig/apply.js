import request from '@/utils/request'

// 查询邀请投递列表
export function listApply(query) {
  return request({
    url: '/baseconfig/apply/list',
    method: 'get',
    params: query
  })
}

// 查询邀请投递详细
export function getApply(id) {
  return request({
    url: '/baseconfig/apply/' + id,
    method: 'get'
  })
}

// 新增邀请投递
export function addApply(data) {
  return request({
    url: '/baseconfig/apply',
    method: 'post',
    data: data
  })
}

// 修改邀请投递
export function updateApply(data) {
  return request({
    url: '/baseconfig/apply',
    method: 'put',
    data: data
  })
}

// 删除邀请投递
export function delApply(id) {
  return request({
    url: '/baseconfig/apply/' + id,
    method: 'delete'
  })
}
