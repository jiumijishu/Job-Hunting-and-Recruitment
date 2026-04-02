<template>
  <div class="app-container">
    <el-container>
      <el-aside width="20%">
        <h3>按职位筛选</h3>
        <el-link :underline="false" style="display: block;margin-top:5px;" v-for="job in jobsList" :key="job.id" @click="jobItemFun(job)">
          <el-card :class="job.id===queryParams.jobId?'box-card':''" >
            <div >
              {{job.jobName}}
            </div>
            <div >
              {{job.minSalary+'-'+job.maxSalary}}
            </div>
          </el-card>
        </el-link>

      </el-aside>
      <el-main>
        <el-row :gutter="10" class="mb8" >
          <el-col :span="1.5">
            <h4 style="font-weight: bold">为您推荐以下人才:</h4>
          </el-col>
          <el-col :span="1.5" style="float: right">
            <el-button
              type="primary"
              size="medium"
              plain
              icon="el-icon-search"
              @click="handleQuery"
            >搜索</el-button>
          </el-col>
          <el-col :span="1.5" style="float: right">
            <el-input
              v-model="queryParams.name"
              placeholder="搜索院校名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-col>
        </el-row>
        <el-card v-loading="loading" style="min-height:500px;">
          <el-row v-for="user in resumeList" style="line-height:36px;border-bottom:1px solid gainsboro;min-height:60px;padding:10px 0;">
            <el-col :span="3" class="userInfo">
              <el-image
                style="width: 60px; height: 60px;margin-top:10px border-radius: 4px;"
                :src="user.avatar"
                fit="fit"></el-image>
                <div class="info" style="margin-top: 6px;">{{user.userName}}</div>
              <div class="info">{{user.objData?user.objData.age+'岁':''}}</div>
            </el-col>
            <el-col :span="17" style="min-width:540px;  overflow-x: auto;">
              <div >
                <span class="school">{{user.objData && user.objData.educationList &&user.objData.educationList[0] ?user.objData.educationList[0].schoolName:''}}</span>&nbsp;
                <span class="major">{{user.objData && user.objData.educationList &&user.objData.educationList[0]?user.objData.educationList[0].major:''}}</span>
                <span class="major" v-if="user.objData && user.objData.educationList">-</span>
                <span class="major">{{user.objData && user.objData.educationList &&user.objData.educationList[0]?user.objData.educationList[0].education:''}}</span>
              </div>
              <div>
               <span class="advantage"> 获得证书：</span>
                <el-tag v-for="cert in user.objData.certList" style="margin-left:5px;">{{ cert.certificateName }}</el-tag>
              </div>
              <div>
               <span class="advantage"> 工作实习：</span>
                <span>{{user.objData && user.objData.experienceList &&user.objData.experienceList[0]?user.objData.experienceList[0].startDate+' ~ '+user.objData.experienceList[0].endDate:''}}</span>
                <span style="margin:0 20px;">{{user.objData && user.objData.experienceList &&user.objData.experienceList[0]?user.objData.experienceList[0].companyName:''}}</span>&nbsp;
                <span>{{user.objData && user.objData.experienceList &&user.objData.experienceList[0]?user.objData.experienceList[0].postName:''}}</span>
              </div>
              <div>
               <span class="advantage"> 求职意向：</span>
                <span>{{user.objData && user.objData.intentionList &&user.objData.intentionList[0]?user.objData.intentionList[0].typeName:''}}</span>
                <span class="nbsp" v-if="user.objData && user.objData.intentionList">|</span>
                <span>{{user.objData && user.objData.intentionList &&user.objData.intentionList[0]?user.objData.intentionList[0].workCity:''}}</span>
                <span class="nbsp" v-if="user.objData && user.objData.intentionList"> | </span>
                <span>{{user.objData && user.objData.intentionList &&user.objData.intentionList[0]?user.objData.intentionList[0].lowSalary:''}}</span>
                <span v-if="user.objData && user.objData.intentionList">-</span>
                <span>{{user.objData && user.objData.intentionList &&user.objData.intentionList[0]?user.objData.intentionList[0].highSalary:''}}</span>
              </div>
            </el-col>
            <el-col :span="4" style="margin-top:20px;">
              <el-button
                type="primary"
                size="medium"
                plain
                icon="el-icon-plus"
                :disabled="user.inviteFlag"
                @click="handleInvite(user)"
              >{{user.inviteFlag?'已邀请':'邀请投递'}}</el-button>
            </el-col>
          </el-row>
        </el-card>


        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-main>
    </el-container>



  </div>
</template>

<script>
import {listReferrerUser, userJobInvite,getCompanyJobs} from "@/api/service/service";

export default {
  name: "Referrer",
  dicts: ['sys_yes_no'],
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
      // 求职简历表格数据
      jobsList: [],
      resumeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        typeId:null,
        jobId:null,
        name:null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getcompanyJobList();
    this.getList();
    
  },
  methods: {
  
    getcompanyJobList() {
      getCompanyJobs().then(response => {
        this.jobsList = response.data;
      });
    },
    /** 查询求职简历列表 */
    getList() {
      this.loading = true;
      listReferrerUser(this.queryParams).then(response => {
        this.resumeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

    /** 邀请按钮操作 */
    handleInvite(row) {
      let param={
        jobId:this.queryParams.jobId,
        userId:row.userId
      };
      this.$modal.confirm('是否确认邀请"' + row.userName + '"？').then(function() {
        return userJobInvite(param);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("邀请成功");
      }).catch(() => {});
    },
    jobItemFun(job){
      this.queryParams.typeId=job.typeId;
      this.queryParams.jobId=job.id;
      this.getList();
    }
  }
};
</script>
<style>

.box-card {
  background-color:#e1f3fb;
}
.userInfo{
  min-width:80px;

  display: flex;
    flex-direction: column;
    padding-left: 20px;
}
.info{
  height:28px;
  font-size: 16px;
}
.school{
  font-size: 18px;
  color: black;
}
.major{
  font-size: 14px;
  margin-left: 5px;
}
.advantage{
  font-size: 14px;
  color:#878987;
}
.nbsp{
  margin:0 10px;
}
</style>
