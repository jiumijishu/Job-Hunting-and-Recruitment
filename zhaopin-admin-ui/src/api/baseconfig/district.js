import request from '@/utils/request'

// 查询区县信息列表
export function listDistrict(query) {
  return request({
    url: '/baseconfig/district/list',
    method: 'get',
    params: query
  })
}

// 查询区县信息详细
export function getDistrict(districtId) {
  return request({
    url: '/baseconfig/district/' + districtId,
    method: 'get'
  })
}

// 新增区县信息
export function addDistrict(data) {
  return request({
    url: '/baseconfig/district',
    method: 'post',
    data: data
  })
}

// 修改区县信息
export function updateDistrict(data) {
  return request({
    url: '/baseconfig/district',
    method: 'put',
    data: data
  })
}

// 删除区县信息
export function delDistrict(districtId) {
  return request({
    url: '/baseconfig/district/' + districtId,
    method: 'delete'
  })
}
