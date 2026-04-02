import request from '@/utils/request'

// 查询用户详情信息列表
export function parseLocation(query) {
  return request({
    url: '/util/parseLocation',
    method: 'get',
    params: query
  })
}
