import request from '@/utils/request'

// 查询公司地址列表
export function listAddress(query) {
  return request({
    url: '/baseconfig/address/list',
    method: 'get',
    params: query
  })
}

// 查询公司地址详细
export function getAddress(id) {
  return request({
    url: '/baseconfig/address/' + id,
    method: 'get'
  })
}

// 新增公司地址
export function addAddress(data) {
  return request({
    url: '/baseconfig/address',
    method: 'post',
    data: data
  })
}

// 修改公司地址
export function updateAddress(data) {
  return request({
    url: '/baseconfig/address',
    method: 'put',
    data: data
  })
}

// 删除公司地址
export function delAddress(id) {
  return request({
    url: '/baseconfig/address/' + id,
    method: 'delete'
  })
}
