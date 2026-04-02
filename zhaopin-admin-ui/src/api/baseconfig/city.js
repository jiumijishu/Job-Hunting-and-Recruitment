import request from '@/utils/request'

// 查询城市列表
export function listCity(query) {
  return request({
    url: '/baseconfig/city/list',
    method: 'get',
    params: query
  })
}

// 查询城市详细
export function getCity(cityId) {
  return request({
    url: '/baseconfig/city/' + cityId,
    method: 'get'
  })
}

// 新增城市
export function addCity(data) {
  return request({
    url: '/baseconfig/city',
    method: 'post',
    data: data
  })
}

// 修改城市
export function updateCity(data) {
  return request({
    url: '/baseconfig/city',
    method: 'put',
    data: data
  })
}

// 删除城市
export function delCity(cityId) {
  return request({
    url: '/baseconfig/city/' + cityId,
    method: 'delete'
  })
}
