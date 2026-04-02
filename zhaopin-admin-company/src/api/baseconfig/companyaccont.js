import request from '@/utils/request'

// 查询公司招聘人员列表
export function listCompanyaccont(query) {
  return request({
    url: '/baseconfig/companyaccont/list',
    method: 'get',
    params: query
  })
}

// 查询公司招聘人员详细
export function getCompanyaccont(id) {
  return request({
    url: '/baseconfig/companyaccont/' + id,
    method: 'get'
  })
}

// 新增公司招聘人员
export function addCompanyaccont(data) {
  return request({
    url: '/baseconfig/companyaccont',
    method: 'post',
    data: data
  })
}

// 修改公司招聘人员
export function updateCompanyaccont(data) {
  return request({
    url: '/baseconfig/companyaccont',
    method: 'put',
    data: data
  })
}

// 删除公司招聘人员
export function delCompanyaccont(id) {
  return request({
    url: '/baseconfig/companyaccont/' + id,
    method: 'delete'
  })
}
