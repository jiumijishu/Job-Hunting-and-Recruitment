import request from '@/utils/request'

// 查询用户支付明细列表
export function listOrderPay(query) {
  return request({
    url: '/baseconfig/orderPay/list',
    method: 'get',
    params: query
  })
}

// 查询用户支付明细详细
export function getOrderPay(id) {
  return request({
    url: '/baseconfig/orderPay/' + id,
    method: 'get'
  })
}

// 新增用户支付明细
export function addOrderPay(data) {
  return request({
    url: '/baseconfig/orderPay',
    method: 'post',
    data: data
  })
}

// 修改用户支付明细
export function updateOrderPay(data) {
  return request({
    url: '/baseconfig/orderPay',
    method: 'put',
    data: data
  })
}

// 删除用户支付明细
export function delOrderPay(id) {
  return request({
    url: '/baseconfig/orderPay/' + id,
    method: 'delete'
  })
}
