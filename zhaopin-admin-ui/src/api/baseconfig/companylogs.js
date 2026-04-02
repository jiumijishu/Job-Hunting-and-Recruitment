import request from '@/utils/request'

// 查询公司修改日志列表
export function listCompanylogs(query) {
  return request({
    url: '/baseconfig/companylogs/list',
    method: 'get',
    params: query
  })
}

export function getCompanyLogsById(query) {
  return request({
    url: '/baseconfig/companylogs/companyLogListById',
    method: 'get',
    params: query
  })
}

// 查询公司修改日志详细
export function getCompanylogs(id) {
  return request({
    url: '/baseconfig/companylogs/' + id,
    method: 'get'
  })
}

// 新增公司修改日志
export function addCompanylogs(data) {
  return request({
    url: '/baseconfig/companylogs',
    method: 'post',
    data: data
  })
}

// 修改公司修改日志
export function updateCompanylogs(data) {
  return request({
    url: '/baseconfig/companylogs',
    method: 'put',
    data: data
  })
}

// 删除公司修改日志
export function delCompanylogs(id) {
  return request({
    url: '/baseconfig/companylogs/' + id,
    method: 'delete'
  })
}
