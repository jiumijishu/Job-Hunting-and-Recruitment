import request from '@/utils/request'

// 查询区间设置列表
export function listRangeconfig(query) {
  return request({
    url: '/baseconfig/rangeconfig/list',
    method: 'get',
    params: query
  })
}

// 查询区间设置详细
export function getRangeconfig(id) {
  return request({
    url: '/baseconfig/rangeconfig/' + id,
    method: 'get'
  })
}

// 新增区间设置
export function addRangeconfig(data) {
  return request({
    url: '/baseconfig/rangeconfig',
    method: 'post',
    data: data
  })
}

// 修改区间设置
export function updateRangeconfig(data) {
  return request({
    url: '/baseconfig/rangeconfig',
    method: 'put',
    data: data
  })
}

// 删除区间设置
export function delRangeconfig(id) {
  return request({
    url: '/baseconfig/rangeconfig/' + id,
    method: 'delete'
  })
}
