import request from '@/utils/request'

// 查询工作经历列表
export function listExperience(query) {
  return request({
    url: '/baseconfig/experience/list',
    method: 'get',
    params: query
  })
}

// 查询工作经历详细
export function getExperience(id) {
  return request({
    url: '/baseconfig/experience/' + id,
    method: 'get'
  })
}

// 新增工作经历
export function addExperience(data) {
  return request({
    url: '/baseconfig/experience',
    method: 'post',
    data: data
  })
}

// 修改工作经历
export function updateExperience(data) {
  return request({
    url: '/baseconfig/experience',
    method: 'put',
    data: data
  })
}

// 删除工作经历
export function delExperience(id) {
  return request({
    url: '/baseconfig/experience/' + id,
    method: 'delete'
  })
}
