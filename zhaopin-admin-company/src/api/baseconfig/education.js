import request from '@/utils/request'

// 查询教育经历列表
export function listEducation(query) {
  return request({
    url: '/baseconfig/education/list',
    method: 'get',
    params: query
  })
}

// 查询教育经历详细
export function getEducation(id) {
  return request({
    url: '/baseconfig/education/' + id,
    method: 'get'
  })
}

// 新增教育经历
export function addEducation(data) {
  return request({
    url: '/baseconfig/education',
    method: 'post',
    data: data
  })
}

// 修改教育经历
export function updateEducation(data) {
  return request({
    url: '/baseconfig/education',
    method: 'put',
    data: data
  })
}

// 删除教育经历
export function delEducation(id) {
  return request({
    url: '/baseconfig/education/' + id,
    method: 'delete'
  })
}
