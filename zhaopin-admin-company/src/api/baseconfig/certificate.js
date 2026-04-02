import request from '@/utils/request'

// 查询职业证书列表
export function listCertificate(query) {
  return request({
    url: '/baseconfig/certificate/list',
    method: 'get',
    params: query
  })
}

// 查询职业证书详细
export function getCertificate(id) {
  return request({
    url: '/baseconfig/certificate/' + id,
    method: 'get'
  })
}

// 新增职业证书
export function addCertificate(data) {
  return request({
    url: '/baseconfig/certificate',
    method: 'post',
    data: data
  })
}

// 修改职业证书
export function updateCertificate(data) {
  return request({
    url: '/baseconfig/certificate',
    method: 'put',
    data: data
  })
}

// 删除职业证书
export function delCertificate(id) {
  return request({
    url: '/baseconfig/certificate/' + id,
    method: 'delete'
  })
}
