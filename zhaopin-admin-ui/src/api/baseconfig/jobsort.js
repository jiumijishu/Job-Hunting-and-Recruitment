import request from '@/utils/request'

// 查询职位分类1列表
export function listJobsort(query) {
  return request({
    url: '/baseconfig/jobsort/list',
    method: 'get',
    params: query
  })
}

// 查询职位分类1详细
export function getJobsort(id) {
  return request({
    url: '/baseconfig/jobsort/' + id,
    method: 'get'
  })
}

// 新增职位分类1
export function addJobsort(data) {
  return request({
    url: '/baseconfig/jobsort',
    method: 'post',
    data: data
  })
}

// 修改职位分类1
export function updateJobsort(data) {
  return request({
    url: '/baseconfig/jobsort',
    method: 'put',
    data: data
  })
}

// 删除职位分类1
export function delJobsort(id) {
  return request({
    url: '/baseconfig/jobsort/' + id,
    method: 'delete'
  })
}
