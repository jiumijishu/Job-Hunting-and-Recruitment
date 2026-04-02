import request from '@/utils/request'

// 查询求职简历列表
export function listResume(query) {
  return request({
    url: '/baseconfig/resume/list',
    method: 'get',
    params: query
  })
}

// 查询求职简历详细
export function getResume(id) {
  return request({
    url: '/baseconfig/resume/' + id,
    method: 'get'
  })
}

// 新增求职简历
export function addResume(data) {
  return request({
    url: '/baseconfig/resume',
    method: 'post',
    data: data
  })
}

// 修改求职简历
export function updateResume(data) {
  return request({
    url: '/baseconfig/resume',
    method: 'put',
    data: data
  })
}

// 删除求职简历
export function delResume(id) {
  return request({
    url: '/baseconfig/resume/' + id,
    method: 'delete'
  })
}
