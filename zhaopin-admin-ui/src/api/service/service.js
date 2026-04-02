import request from '@/utils/request'

// 查询求职简历列表
export function listReferrerUser(query) {
  return request({
    url: '/api/service/getReferrerUserslist',
    method: 'get',
    params: query
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

export function getResumeDataByResumeId(id) {
  return request({
    url: '/api/service/getUserResumeByResumeId?id='+id,
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

export function getCompanyDetail(id) {
  return request({
    url: '/api/service/getCompanyDetail?id='+id,
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

// 修改岗位
export function editCompanyJobs(data) {
  return request({
    url: '/api/service/editCompanyJob',
    method: 'put',
    data: data
  })
}

export function approveCompanyJobs(data) {
  return request({
    url: '/api/service/approveCompanyJob',
    method: 'put',
    data: data
  })
}

export function approveCompany(data) {
  return request({
    url: '/api/service/approveCompany',
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

export function getAllindustryData() {
  return request({
    url: '/api/noAuth/queryIndustryData',
    method: 'get'
  })
}

export function getJobLogsData(query) {
  return request({
    url: '/baseconfig/joblogs/getLogsByJobId',
    method: 'get',
    params: query
  })
}
