import request from '@/utils/request'

// 查询省份信息列表
export function listProvince(query) {
  return request({
    url: '/baseconfig/province/list',
    method: 'get',
    params: query
  })
}

// 查询省份信息详细
export function getProvince(provinceId) {
  return request({
    url: '/baseconfig/province/' + provinceId,
    method: 'get'
  })
}

// 新增省份信息
export function addProvince(data) {
  return request({
    url: '/baseconfig/province',
    method: 'post',
    data: data
  })
}

// 修改省份信息
export function updateProvince(data) {
  return request({
    url: '/baseconfig/province',
    method: 'put',
    data: data
  })
}

// 删除省份信息
export function delProvince(provinceId) {
  return request({
    url: '/baseconfig/province/' + provinceId,
    method: 'delete'
  })
}
