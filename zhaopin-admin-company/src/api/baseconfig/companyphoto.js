import request from '@/utils/request'

// 查询公司相册列表
export function listCompanyphoto(query) {
  return request({
    url: '/baseconfig/companyphoto/list',
    method: 'get',
    params: query
  })
}

// 查询公司相册详细
export function getCompanyphoto(id) {
  return request({
    url: '/baseconfig/companyphoto/' + id,
    method: 'get'
  })
}

// 新增公司相册
export function addCompanyphoto(data) {
  return request({
    url: '/baseconfig/companyphoto',
    method: 'post',
    data: data
  })
}

// 修改公司相册
export function updateCompanyphoto(data) {
  return request({
    url: '/baseconfig/companyphoto',
    method: 'put',
    data: data
  })
}

// 删除公司相册
export function delCompanyphoto(id) {
  return request({
    url: '/baseconfig/companyphoto/' + id,
    method: 'delete'
  })
}
