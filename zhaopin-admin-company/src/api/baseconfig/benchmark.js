import request from '@/utils/request'

// 查询标杆企业列表
export function listBenchmark(query) {
  return request({
    url: '/baseconfig/benchmark/list',
    method: 'get',
    params: query
  })
}

// 查询标杆企业详细
export function getBenchmark(id) {
  return request({
    url: '/baseconfig/benchmark/' + id,
    method: 'get'
  })
}

// 新增标杆企业
export function addBenchmark(data) {
  return request({
    url: '/baseconfig/benchmark',
    method: 'post',
    data: data
  })
}

// 修改标杆企业
export function updateBenchmark(data) {
  return request({
    url: '/baseconfig/benchmark',
    method: 'put',
    data: data
  })
}

// 删除标杆企业
export function delBenchmark(id) {
  return request({
    url: '/baseconfig/benchmark/' + id,
    method: 'delete'
  })
}
