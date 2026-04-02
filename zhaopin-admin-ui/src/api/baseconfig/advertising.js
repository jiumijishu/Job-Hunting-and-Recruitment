import request from '@/utils/request'

// 查询企业端广告列表
export function listAdvertising(query) {
  return request({
    url: '/baseconfig/advertising/list',
    method: 'get',
    params: query
  })
}

// 查询企业端广告详细
export function getAdvertising(id) {
  return request({
    url: '/baseconfig/advertising/' + id,
    method: 'get'
  })
}

// 新增企业端广告
export function addAdvertising(data) {
  return request({
    url: '/baseconfig/advertising',
    method: 'post',
    data: data
  })
}

// 修改企业端广告
export function updateAdvertising(data) {
  return request({
    url: '/baseconfig/advertising',
    method: 'put',
    data: data
  })
}

// 删除企业端广告
export function delAdvertising(id) {
  return request({
    url: '/baseconfig/advertising/' + id,
    method: 'delete'
  })
}
