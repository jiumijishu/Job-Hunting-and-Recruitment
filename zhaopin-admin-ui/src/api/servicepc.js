import request from '@/utils/request'

// 查询职位分类列表
export function getJobtypeData() {
  return request({
    url: '/api/noAuth/queryJobTypeData',
    method: 'get'
  })
}

