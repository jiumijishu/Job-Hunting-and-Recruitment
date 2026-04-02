import request from '@/utils/request'

// 查询职位修改日志列表
export function listJoblogs(query) {
  return request({
    url: '/baseconfig/joblogs/list',
    method: 'get',
    params: query
  })
}

export function getJobLogs(query) {
  return request({
    url: '/baseconfig/joblogs/getLogsByJobId',
    method: 'get',
    params: query
  })
}

// 查询职位修改日志详细
export function getJoblogs(id) {
  return request({
    url: '/baseconfig/joblogs/' + id,
    method: 'get'
  })
}

// 新增职位修改日志
export function addJoblogs(data) {
  return request({
    url: '/baseconfig/joblogs',
    method: 'post',
    data: data
  })
}

// 修改职位修改日志
export function updateJoblogs(data) {
  return request({
    url: '/baseconfig/joblogs',
    method: 'put',
    data: data
  })
}

// 删除职位修改日志
export function delJoblogs(id) {
  return request({
    url: '/baseconfig/joblogs/' + id,
    method: 'delete'
  })
}
