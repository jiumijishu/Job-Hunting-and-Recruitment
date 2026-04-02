<template>
  <div class="app-container">
    <el-container>
      <el-aside width="70%" style="overflow: hidden">
        <el-card v-loading="loading" style="min-height:500px;">
          <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
            <el-form-item label="岗位名称" prop="jobName">
              <el-input
                style="width:500px"
                v-model="queryParams.jobName"
                placeholder="请输入岗位名称"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查找</el-button>
            </el-form-item>
          </el-form>
          <el-row>
            <el-button-group>
              <el-button type="primary" @click="handleQuery">全部</el-button>
              <el-button type="primary" v-for="(type,index) in jobsCountData" :key="index" @click="queryDataFun(type.typeId)" v-if="type.typeId!=-1">{{type.typeName+' '+type.jobCount}}</el-button>
              <el-button style="height:36px;" type="primary" icon="el-icon-close" @click="queryDataStatusFun('00')">已关闭</el-button>
            </el-button-group>
          </el-row>
          <el-row v-for="job in jobsList" style="line-height:25px;border:1px solid gainsboro;min-height:60px;margin-top:10px;padding-bottom:10px;padding-left:20px;padding-top:10px">

            <el-col :span="19">
              <el-row>
                <el-col :span="16">
                  <span style="line-height:25px;font-weight: bold">{{ job.jobName }}</span>
                </el-col>
                <!-- <el-col :span="6">
                  <dict-tag :options="dict.type.sys_company_job_status" :value="job.status"/>
                </el-col> -->
                <el-col :span="8">
                  <span>{{ job.minSalary+'元 - '+job.maxSalary +'元'}}</span>
                </el-col>
              </el-row>
              <div style="margin-top:10px;margin-bottom:5px;">
                <el-tag v-for="label in job.jobLabels?job.jobLabels.split(','):[]" style="margin-left:5px;">{{ label }}</el-tag>
              </div>
              <div style="margin-top:10px;margin-bottom:5px;">
                <span><i class="el-icon-location"></i>{{job.companyAddress?job.companyAddress.province+job.companyAddress.city+job.companyAddress.address:''}}</span>
              </div>
            </el-col>
            <el-col :span="3" >
              <dict-tag :options="dict.type.sys_company_job_status" :value="job.status"/>

              <router-link
                :to="'/jobManage/JobsDetail?id=' +job.id"
              >
                <el-button
                  style="margin-top:6px;"
                  type="primary"
                  size="mini"
                  plain
                  icon="el-icon-info"
                >职位详情</el-button>
              </router-link>&nbsp;
            </el-col>
          </el-row>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
        </el-card>
      </el-aside>

      <el-main  style="padding-left:40px;">
        <el-row>
          <el-col :span="12">
            <router-link
              :to="'/jobManage/jobsPublish'"
            >
              <el-button type="primary" >发布新职位</el-button>
            </router-link>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" @click="refreshJobsFun">刷新职位</el-button>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="margin-top:10px">
          <div slot="header" class="clearfix">
            <span>新简历</span>
          </div>
          <el-row v-for="user in resumeList">
            <el-col :span="6">
              <i :class="user.objData.sex==0?'el-icon-male':'el-icon-female'"></i>
              <el-image
                style="width: 60px; height: 60px;margin-top:10px "
                :src="user.avatar"
                fit="fit">
              </el-image>
            </el-col>
            <el-col :span="18" style="line-height:25px;">
              <router-link
                :to="'/resumeManage/resumeDetail?id=' + user.id"
              >
              <div>
                <strong><span>{{user.objData.userName}}</span></strong>&nbsp;
                <span class="major">{{user.objData && user.objData.educationList && user.objData.educationList.length>0 ?user.objData.educationList[0].education:''}}</span>&nbsp;
                <span style="font-size:14px;">{{user.objData?user.objData.age+'岁':''}}</span>
              </div>
              <div >
                <span class="school">{{user.objData && user.objData.educationList && user.objData.educationList.length>0 ?user.objData.educationList[0].schoolName:''}}</span>
                <span class="major" v-if="user.objData && user.objData.educationList && user.objData.educationList.length>0" style="font-size:16px;font-weight: 600;">·</span>
                <span class="major">{{user.objData && user.objData.educationList && user.objData.educationList.length>0 ?user.objData.educationList[0].major:''}}</span>
              </div>
              </router-link>
            </el-col>
          </el-row>
          <el-row style="line-height:30px;text-align: center">
            <router-link
              :to="'/resumeManage/Resume'"
            >查看更多
            </router-link>
          </el-row>
        </el-card>
        <el-card shadow="hover" style="margin-top:10px">
          <div slot="header" class="clearfix">
            <span>最近热搜</span>
          </div>
          <el-row v-for="(user,index) in hotSearchList" style="line-height:30px">
            <div>{{index+1}}&nbsp;{{user.name}}</div>
          </el-row>
        </el-card>
      </el-main>
    </el-container>


  </div>
</template>

<script>
import {
  getCompanyJobsCount,
  getCompanyJobsData,
  getHotSearchHistory,
  listApplyJobUser,
  refreshCompanyJobsData
} from "@/api/service/service";
import {delTextcontent} from "@/api/baseconfig/textcontent";

export default {
  name: "Jobs",
  dicts: ['sys_company_job_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 岗位表格数据
      jobsList: [],
      jobsCountData: [],
      resumeList: [],
      hotSearchList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        jobName: null,
        typeId: null,
        jobLabels: null,
        workExperience: null,
        education: null,
        minSalary: null,
        maxSalary: null,
        addrId: null,
        companyId: null,
        companyName: null,
        intro: null,
        createUserId: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getJobApplyList();
    this.queryHotSearchHistory();
    this.getJobCount();
    this.getList();
  },
  methods: {

    getJobApplyList() {
      this.loading = true;
      let params={
        pageNum: 1,
        pageSize: 10,
        applyStatus:'01'
      }
      listApplyJobUser(params).then(response => {
        this.resumeList = response.rows;
        this.loading = false;
      });
    },

    getJobCount(){
      getCompanyJobsCount({status : '01,02'}).then(response => {
        this.jobsCountData = response.data;
      });
    },

    queryHotSearchHistory(){
      getHotSearchHistory().then(response => {
        this.hotSearchList = response.data;
      });
    },
    /** 查询岗位列表 */
    getList() {
      this.loading = true;
      getCompanyJobsData(this.queryParams).then(response => {
        this.jobsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        jobName: null,
        typeId: null,
        jobLabels: null,
        workExperience: null,
        education: null,
        minSalary: null,
        maxSalary: null,
        addrId: null,
        companyId: null,
        companyName: null,
        intro: null,
        createUserId: null,
        createBy: null,
        createTime: null,
        updateTime: null,
        status: "0"
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.typeId = null;
      this.queryParams.status = '00,01,02,03';
      this.getList();
    },

    queryDataFun(typeId) {
      this.queryParams.typeId = typeId;
      this.queryParams.status = '01,02';
      this.getList();
    },
    queryDataStatusFun(status) {
      this.queryParams.status = status;
      this.queryParams.typeId = null;
      this.getList();
    },
    refreshJobsFun() {
      this.$modal.confirm('确认是否刷新职位？').then(function() {
        return refreshCompanyJobsData();
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("刷新成功");
      }).catch(() => {});
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>
<style>
.el-icon-male,.el-icon-female{
  font-weight: 600;
  position: absolute;
  z-index: 9;
  margin-left:50px;
  top: 6px;
}
.el-icon-male{
  color:#0581FE;
}
.el-icon-female{
  color:#FE5B9F;
}
</style>
