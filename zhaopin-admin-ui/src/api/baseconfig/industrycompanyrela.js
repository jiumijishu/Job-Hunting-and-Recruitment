import request from '@/utils/request'

// 查询行业推荐企业列表
export function listIndustrycompanyrela(query) {
  return request({
    url: '/baseconfig/industrycompanyrela/list',
    method: 'get',
    params: query
  })
}

// 查询行业推荐企业详细
export function getIndustrycompanyrela(id) {
  return request({
    url: '/baseconfig/industrycompanyrela/' + id,
    method: 'get'
  })
}

// 新增行业推荐企业
export function addIndustrycompanyrela(data) {
  return request({
    url: '/baseconfig/industrycompanyrela',
    method: 'post',
    data: data
  })
}

// 修改行业推荐企业
export function updateIndustrycompanyrela(data) {
  return request({
    url: '/baseconfig/industrycompanyrela',
    method: 'put',
    data: data
  })
}

// 删除行业推荐企业
export function delIndustrycompanyrela(id) {
  return request({
    url: '/baseconfig/industrycompanyrela/' + id,
    method: 'delete'
  })
}
