import request from '@/utils/request'

// 查询职位分类列表
export function listJobtype(query) {
  return request({
    url: '/baseconfig/jobtype/list',
    method: 'get',
    params: query
  })
}

// 查询职位分类详细
export function getJobtype(id) {
  return request({
    url: '/baseconfig/jobtype/' + id,
    method: 'get'
  })
}

// 新增职位分类
export function addJobtype(data) {
  return request({
    url: '/baseconfig/jobtype',
    method: 'post',
    data: data
  })
}

// 修改职位分类
export function updateJobtype(data) {
  return request({
    url: '/baseconfig/jobtype',
    method: 'put',
    data: data
  })
}

// 删除职位分类
export function delJobtype(id) {
  return request({
    url: '/baseconfig/jobtype/' + id,
    method: 'delete'
  })
}
