import request from '@/utils/request'

// 查询求职简历列表
export function listReferrerUser(query) {
  return request({
    url: '/api/service/getReferrerUserslist',
    method: 'get',
    params: query
  })
}

export function listAllProvince() {
  return request({
    url: '/api/service/getAllProvinceData',
    method: 'get'
  })
}

export function listApplyJobUser(query) {
  return request({
    url: '/api/service/getApplyJobUserslist',
    method: 'get',
    params: query
  })
}

export function listApplyJobUserCount(query) {
  return request({
    url: '/api/service/getApplyJobUsersCount',
    method: 'get',
    params: query
  })
}

export function userJobInvite(data) {
  return request({
    url: '/api/service/addUserJobInvite',
    method: 'post',
    data: data
  })
}

export function getCompanyJobs(query) {
  return request({
    url: '/api/service/getCompanyJobList',
    method: 'get',
    params: query
  })
}

export function getCompanyJobsData(query) {
  return request({
    url: '/api/service/getCompanyJobData',
    method: 'get',
    params: query
  })
}

export function refreshCompanyJobsData() {
  return request({
    url: '/api/service/refreshCompanyJobData',
    method: 'get'
  })
}

export function closeCompanyJobsData(id) {
  return request({
    url: '/api/service/closeCompanyJobData/'+id,
    method: 'get'
  })
}

export function getHotSearchHistory() {
  return request({
    url: '/api/service/getSearchHistory',
    method: 'get'
  })
}

export function getCompanyJobsCount(query) {
  return request({
    url: '/api/service/getCompanyJobTypeCount',
    method: 'get',
    params: query
  })
}

export function getUserResumeData(id) {
  return request({
    url: '/api/service/getUserResumeDetail?id='+id,
    method: 'get'
  })
}

export function getCompanyJobDetail(id) {
  return request({
    url: '/api/service/getCompanyJobDetail/'+id,
    method: 'get'
  })
}

export function approveResume(data) {
  return request({
    url: '/api/service/approveJobApply',
    method: 'post',
    data: data
  })
}

export function listJobTypeData() {
  return request({
    url: '/api/service/queryJobTypeData',
    method: 'get'
  })
}

export function queryJobSortData() {
  return request({
    url: '/api/service/queryJobSortData',
    method: 'get'
  })
}


export function queryJobSortInfo(id) {
  return request({
    url: '/api/service/queryJobSortInfo/'+id,
    method: 'get'
  })
}


export function queryIndustryData() {
  return request({
    url: '/api/service/queryIndustryData',
    method: 'get'
  })
}


export function listCompanyAddress() {
  return request({
    url: '/api/service/getCompanyAddressList',
    method: 'get'
  })
}

export function getCurrentCompany() {
  return request({
    url: '/api/service/getCurrentCompanyDetail',
    method: 'get'
  })
}

export function getCompanyAccountData(query) {
  return request({
    url: '/api/service/getCompanyAccountList',
    method: 'get',
    params: query
  })
}

export function getJobLogsData(query) {
  return request({
    url: '/baseconfig/joblogs/getLogsByJobId',
    method: 'get',
    params: query
  })
}

// 修改岗位
export function editCompanyJobs(data) {
  return request({
    url: '/api/service/editCompanyJob',
    method: 'put',
    data: data
  })
}

// 新增岗位
export function addCompanyJobs(data) {
  return request({
    url: '/api/service/addCompanyJob',
    method: 'post',
    data: data
  })
}

export function editCompanyDetail(data) {
  return request({
    url: '/api/service/editCompanyInfo',
    method: 'put',
    data: data
  })
}


