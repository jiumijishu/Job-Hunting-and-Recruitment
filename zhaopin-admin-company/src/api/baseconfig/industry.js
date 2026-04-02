import request from '@/utils/request'

// 查询行业信息列表
export function listIndustry(query) {
  return request({
    url: '/baseconfig/industry/list',
    method: 'get',
    params: query
  })
}

export function listAllIndustry() {
  return request({
    url: '/baseconfig/industry/getAllIndustryList',
    method: 'get'
  })
}

// 查询行业信息详细
export function getIndustry(id) {
  return request({
    url: '/baseconfig/industry/' + id,
    method: 'get'
  })
}

// 新增行业信息
export function addIndustry(data) {
  return request({
    url: '/baseconfig/industry',
    method: 'post',
    data: data
  })
}

// 修改行业信息
export function updateIndustry(data) {
  return request({
    url: '/baseconfig/industry',
    method: 'put',
    data: data
  })
}

// 删除行业信息
export function delIndustry(id) {
  return request({
    url: '/baseconfig/industry/' + id,
    method: 'delete'
  })
}
