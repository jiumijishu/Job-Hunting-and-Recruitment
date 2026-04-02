<template>
  <div class="app-container">
    <el-container>
      <el-aside width="20%">
        <h3>按职位筛选</h3>
        <el-link :underline="false" style="display: block;margin-top:5px;" v-for="job in jobsList" :key="job.id" @click="jobItemFun(job)">
          <el-card :class="checkJobSelect(job.id)?'box-card':''" >
            <div class="resumeJob">
              {{job.jobName}}
            </div>
            <div >
              <span class="resumeItem">{{'新简历 '+job.newNum}}</span>
              <span class="resumeItem">{{'沟通中 '+job.contactNum}}</span><br>
              <span class="resumeItem">{{'面试中 '+job.interviewNum}}</span>
            </div>
          </el-card>
        </el-link>

      </el-aside>
      <el-main>
        <el-row :gutter="10" class="mb8" >
          <el-col :span="2" style="float: left">
              <el-button size="small" @click="applyStatusChangeFun('')">全部</el-button>
          </el-col>
          <el-col :span="2" style="float: left">
            <el-badge :value="resumeData.newNum" class="item" v-show="resumeData.newNum>0">
              <el-button size="small" @click="applyStatusChangeFun('01')">新简历</el-button>
            </el-badge>
            <el-button size="small" @click="applyStatusChangeFun('01')" v-show="resumeData.newNum===0">新简历</el-button>
          </el-col>
          <el-col :span="2" style="float: left">
            <el-badge :value="resumeData.contactNum" class="item" v-show="resumeData.contactNum>0">
              <el-button size="small" @click="applyStatusChangeFun('02')">沟通中</el-button>
            </el-badge>
            <el-button size="small" @click="applyStatusChangeFun('02')" v-show="resumeData.contactNum===0">沟通中</el-button>
          </el-col>
          <el-col :span="2" style="float: left">
            <el-badge :value="resumeData.interviewNum" class="item" v-show="resumeData.interviewNum>0">
              <el-button size="small" @click="applyStatusChangeFun('04')">面试中</el-button>
            </el-badge>
            <el-button size="small" @click="applyStatusChangeFun('04')" v-show="resumeData.interviewNum===0">面试中</el-button>
          </el-col>
          <el-col :span="2" style="float: left">
              <el-button size="small" @click="applyStatusChangeFun('03')">不合适</el-button>
          </el-col>
          <el-col :span="2" style="float: left">
              <el-button size="small" @click="applyStatusChangeFun('05')">面试通过</el-button>
          </el-col>
          <el-col :span="12" >
            <el-tag style="float: right;margin-left:5px;"
              v-for="tag in jobIds"
              :key="tag"
              @close="jobIdsCloseFun(tag)"
              closable
              >
              {{fomatJobName(tag)}}
            </el-tag>
          </el-col>
        </el-row>
        <!-- 简历 -->
        <el-card v-loading="loading" style="min-height:500px;">
          <el-row v-for="user in resumeList" style="line-height:25px;border:1px solid gainsboro;min-height:60px;margin-top:10px;padding-bottom:10px;">
            <el-row style="border:1px solid lightgray;background-color:lightgray">
              <el-col :span="20" style="font-size:14px">
                <span style="margin-left:20px ;color:#919191">{{user.applyTime}}</span>
                <span style="margin-left:30px">投递职位：【{{user.jobName}}】</span>
              </el-col>
              <el-col :span="4">
                <dict-tag :options="dict.type.base_job_apply_status" :value="user.applyStatus"/>
              </el-col>
            </el-row>
            <!-- 基本信息 -->
            <el-col :span="2" style="padding-left:20px;min-width:82px; position: relative;">
              <i :class="user.objData.sex==0?'el-icon-male':'el-icon-female'"></i>
              <el-image
                style="width: 60px; height: 60px;margin-top:10px "
                :src="user.avatar"
                fit="fit">
              </el-image><br>
              <span>{{user.objData.userName}}</span><br>
              <span style="font-size:14px;">{{user.objData?user.objData.age+'岁':''}}</span><br>
              <!-- <span>{{user.objData.sex==0?'男':'女'}}</span> -->
            </el-col>
            <!-- 简历信息 -->
            <el-col :span="17" style="padding:14px;">
              <div >
                <span class="school">{{user.objData && user.objData.type===1 &&  user.objData.educationList.length>0 && Array.isArray() ?user.objData.educationList[0].schoolName:''}}</span>
                <span class="major">{{user.objData && user.objData.type===1 && user.objData.educationList.length>0 ?user.objData.educationList[0].major:''}}</span>
                <span class="major" v-if="user.objData && user.objData.type===1 && user.objData.educationList.length>0" style="font-size:16px;font-weight: 600;">·</span>
                <span class="major">{{user.objData && user.objData.type===1 && user.objData.educationList.length>0 ?user.objData.educationList[0].education:''}}</span>
              </div>
              <div class="content">
                {{user.objData.advantage}}
              </div>
              <div>
                获得证书：
                <el-tag v-for="cert in user.objData.certList" style="margin-left:5px;">{{ cert.certificateName }}</el-tag>
              </div>
            </el-col>
            <el-col :span="4" >
              <router-link
                :to="'/resumeManage/resumeDetail?id=' + user.id"
              >
              <el-button
                style="margin-top:30px;margin-left:15px;"
                type="primary"
                size="mini"
                plain
                icon="el-icon-info"
              >查看简历</el-button>
              </router-link>&nbsp;
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
import {listApplyJobUser, getCompanyJobs, userJobInvite,listApplyJobUserCount} from "@/api/service/service";

export default {
  name: "Resume",
  dicts: ['sys_yes_no','base_job_apply_status'],
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
      jobIds:[],
      resumeList: [],
      resumeData: {},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        typeId:null,
        jobIds:null,
        applyStatus:null,
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
    this.getApplyJobCount();
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
      listApplyJobUser(this.queryParams).then(response => {
        this.resumeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getApplyJobCount() {
      this.loading = true;
      listApplyJobUserCount(this.queryParams).then(response => {
        this.resumeData = response.data;
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
      let index= this.jobIds.findIndex(jid=>jid===job.id);
      if(index===-1){
        this.jobIds.push(job.id)
      }
      this.queryParams.typeId=job.typeId;
      this.queryParams.jobIds=this.jobIds.join(",");
      this.queryParams.applyStatus='';
      this.getList();
      this.getApplyJobCount();
    },

    checkJobSelect(id){
      let index= this.jobIds.findIndex(jid=>jid===id);
      if(index>=0){
        return true;
      }else{
        return false;
      }
    },

    fomatJobName(jobId){
      let index=this.jobsList.findIndex(job=>job.id===jobId);
      return this.jobsList[index].jobName;
    },
    jobIdsCloseFun(jobid){
      let index= this.jobIds.findIndex(jid=>jid===jobid);
      this.jobIds.splice(index,1)
      this.queryParams.jobIds=this.jobIds.join(",");
      this.queryParams.applyStatus='';
      this.getList();
      this.getApplyJobCount();
    },
    applyStatusChangeFun(status){
      this.queryParams.applyStatus=status;
      this.getList();
    }
  }
};
</script>
<style>

.box-card {
  background-color:#e1f3fb;
}
.resumeJob{
  font-weight: bold;
  font-size:16px;

}
.resumeItem{
  margin-right:20px;
  color: #99a9bf;
}
.school{
  font-size: 18px;
  color: black;
  margin-right: 20px;
}
.major{
  font-size: 14px;
  margin-left: 5px;
}
.content {
  font-size: 14px;
  text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
    margin: 10px 0;
    }
    .el-icon-male,.el-icon-female{
      font-weight: 600;
      position: absolute;
      z-index: 9;
      top: 6px;
    right: -2px;
    }
    .el-icon-male{
      color:#0581FE;
    }
    .el-icon-female{
      color:#FE5B9F;
    }
</style>
