import request from '@/utils/request'

// 查询岗位列表
export function listJobs(query) {
  return request({
    url: '/baseconfig/jobs/list',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function getJobs(id) {
  return request({
    url: '/baseconfig/jobs/' + id,
    method: 'get'
  })
}

// 新增岗位
export function addJobs(data) {
  return request({
    url: '/baseconfig/jobs',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updateJobs(data) {
  return request({
    url: '/baseconfig/jobs',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delJobs(id) {
  return request({
    url: '/baseconfig/jobs/' + id,
    method: 'delete'
  })
}
