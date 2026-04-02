import request from '@/utils/request'

// 查询资讯动态列表
export function listArticle(query) {
  return request({
    url: '/baseconfig/article/list',
    method: 'get',
    params: query
  })
}

// 查询资讯动态详细
export function getArticle(id) {
  return request({
    url: '/baseconfig/article/' + id,
    method: 'get'
  })
}

// 新增资讯动态
export function addArticle(data) {
  return request({
    url: '/baseconfig/article',
    method: 'post',
    data: data
  })
}

// 修改资讯动态
export function updateArticle(data) {
  return request({
    url: '/baseconfig/article',
    method: 'put',
    data: data
  })
}

// 删除资讯动态
export function delArticle(id) {
  return request({
    url: '/baseconfig/article/' + id,
    method: 'delete'
  })
}
