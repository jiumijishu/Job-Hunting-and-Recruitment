import request from '@/utils/request'

// 查询用户投递简历申请列表
export function listJobapply(query) {
  return request({
    url: '/baseconfig/jobapply/list',
    method: 'get',
    params: query
  })
}

// 查询用户投递简历申请详细
export function getJobapply(id) {
  return request({
    url: '/baseconfig/jobapply/' + id,
    method: 'get'
  })
}

// 新增用户投递简历申请
export function addJobapply(data) {
  return request({
    url: '/baseconfig/jobapply',
    method: 'post',
    data: data
  })
}

// 修改用户投递简历申请
export function updateJobapply(data) {
  return request({
    url: '/baseconfig/jobapply',
    method: 'put',
    data: data
  })
}

// 删除用户投递简历申请
export function delJobapply(id) {
  return request({
    url: '/baseconfig/jobapply/' + id,
    method: 'delete'
  })
}
