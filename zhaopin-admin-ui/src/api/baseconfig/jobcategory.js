import request from '@/utils/request'

// 查询岗位类型列表
export function listJobcategory(query) {
  return request({
    url: '/baseconfig/jobcategory/list',
    method: 'get',
    params: query
  })
}

// 查询岗位类型详细
export function getJobcategory(categoryId) {
  return request({
    url: '/baseconfig/jobcategory/' + categoryId,
    method: 'get'
  })
}

// 新增岗位类型
export function addJobcategory(data) {
  return request({
    url: '/baseconfig/jobcategory',
    method: 'post',
    data: data
  })
}

// 修改岗位类型
export function updateJobcategory(data) {
  return request({
    url: '/baseconfig/jobcategory',
    method: 'put',
    data: data
  })
}

// 删除岗位类型
export function delJobcategory(categoryId) {
  return request({
    url: '/baseconfig/jobcategory/' + categoryId,
    method: 'delete'
  })
}
