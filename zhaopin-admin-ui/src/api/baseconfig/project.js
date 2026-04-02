import request from '@/utils/request'

// 查询项目经验列表
export function listProject(query) {
  return request({
    url: '/baseconfig/project/list',
    method: 'get',
    params: query
  })
}

// 查询项目经验详细
export function getProject(id) {
  return request({
    url: '/baseconfig/project/' + id,
    method: 'get'
  })
}

// 新增项目经验
export function addProject(data) {
  return request({
    url: '/baseconfig/project',
    method: 'post',
    data: data
  })
}

// 修改项目经验
export function updateProject(data) {
  return request({
    url: '/baseconfig/project',
    method: 'put',
    data: data
  })
}

// 删除项目经验
export function delProject(id) {
  return request({
    url: '/baseconfig/project/' + id,
    method: 'delete'
  })
}
