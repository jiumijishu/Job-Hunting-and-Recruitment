import request from '@/utils/request'

// 查询求职意向列表
export function listIntention(query) {
  return request({
    url: '/baseconfig/intention/list',
    method: 'get',
    params: query
  })
}

// 查询求职意向详细
export function getIntention(id) {
  return request({
    url: '/baseconfig/intention/' + id,
    method: 'get'
  })
}

// 新增求职意向
export function addIntention(data) {
  return request({
    url: '/baseconfig/intention',
    method: 'post',
    data: data
  })
}

// 修改求职意向
export function updateIntention(data) {
  return request({
    url: '/baseconfig/intention',
    method: 'put',
    data: data
  })
}

// 删除求职意向
export function delIntention(id) {
  return request({
    url: '/baseconfig/intention/' + id,
    method: 'delete'
  })
}
