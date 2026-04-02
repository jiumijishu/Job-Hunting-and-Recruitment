import request from '@/utils/request'

// 查询待审核公司列表
export function listCompany(query) {
  return request({
    url: '/baseconfig/company/list',
    method: 'get',
    params: query
  })
}

// 查询待审核公司详细
export function getCompany(id) {
  return request({
    url: '/baseconfig/company/' + id,
    method: 'get'
  })
}

// 新增待审核公司
export function addCompany(data) {
  return request({
    url: '/baseconfig/company',
    method: 'post',
    data: data
  })
}

// 修改待审核公司
export function updateCompany(data) {
  return request({
    url: '/baseconfig/company',
    method: 'put',
    data: data
  })
}

// 删除待审核公司
export function delCompany(id) {
  return request({
    url: '/baseconfig/company/' + id,
    method: 'delete'
  })
}
