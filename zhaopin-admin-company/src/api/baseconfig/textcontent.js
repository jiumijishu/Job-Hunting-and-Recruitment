import request from '@/utils/request'

// 查询文案管理列表
export function listTextcontent(query) {
  return request({
    url: '/baseconfig/textcontent/list',
    method: 'get',
    params: query
  })
}

// 查询文案管理详细
export function getTextcontent(id) {
  return request({
    url: '/baseconfig/textcontent/' + id,
    method: 'get'
  })
}

// 新增文案管理
export function addTextcontent(data) {
  return request({
    url: '/baseconfig/textcontent',
    method: 'post',
    data: data
  })
}

// 修改文案管理
export function updateTextcontent(data) {
  return request({
    url: '/baseconfig/textcontent',
    method: 'put',
    data: data
  })
}

// 删除文案管理
export function delTextcontent(id) {
  return request({
    url: '/baseconfig/textcontent/' + id,
    method: 'delete'
  })
}
