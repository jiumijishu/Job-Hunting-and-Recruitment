<template>
  <div class="app-container">
    <el-container>
      <el-main style="padding-left:15%;padding-right:15%">
        <el-row>
          <el-col :span="20">
            <div>{{resumeData.userName}}</div>
            <div>
              <span>{{resumeData.educationList &&resumeData.educationList[0]?resumeData.educationList[0].schoolName:''}}</span>&nbsp;
              <span>{{resumeData.educationList &&resumeData.educationList[0]?resumeData.educationList[0].major:''}}</span>
              <span v-if="resumeData.educationList">-</span>
              <span>{{resumeData.educationList &&resumeData.educationList[0]?resumeData.educationList[0].education:''}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div>
              <el-image
                style="width: 60px; height: 60px;margin-top:10px "
                :src="resumeData.avatar"
                fit="fit"></el-image>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <h2>个人优势</h2>
          <div>
            {{resumeData.advantage}}
          </div>
        </el-row>
        <el-row>
          <h2>工作&实习经历</h2>
          <div v-for="work in resumeData.experienceList" class="work-box">
            <el-row >
              <el-col :span="4">
                <div style="font-weight: bold">{{work.companyName}}</div>
              </el-col>
              <el-col :span="20">
                <div>{{work.startDate+''+work.endDate}}</div>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="4">
                <div>职位名称</div>
              </el-col>
              <el-col :span="20">
                <div>{{ work.postName }}</div>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="4">
                <div>工作内容</div>
              </el-col>
              <el-col :span="20">
                <div>{{ work.workContent }}</div>
              </el-col>
            </el-row>
          </div>
        </el-row>

        <el-row>
          <h2>教育经历</h2>
          <div v-for="work in resumeData.educationList" class="work-box">
            <el-row >
              <el-col :span="4">
                <div style="font-weight: bold">{{work.schoolName}}</div>
              </el-col>
              <el-col :span="20">
                <div>{{work.education+'-'+work.major}}&nbsp;&nbsp;&nbsp;{{work.startDate+''+work.endDate}}</div>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="4">
                <div>在校经历</div>
              </el-col>
              <el-col :span="20">
                <div>{{ work.experience }}</div>
              </el-col>
            </el-row>
          </div>
        </el-row>

        <el-row>
          <h2>项目经历</h2>
          <div v-for="work in resumeData.projectList" class="work-box">
            <el-row >
              <el-col :span="4">
                <div style="font-weight: bold">{{work.projectName}}</div>
              </el-col>
              <el-col :span="20">
                <div>{{work.startDate+''+work.endDate}}</div>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="4">
                <div>项目描述</div>
              </el-col>
              <el-col :span="20">
                <div>{{ work.projectContent }}</div>
              </el-col>
            </el-row>
          </div>
        </el-row>

        <el-row>
          <h2>职业技能证书</h2>
          <div v-for="work in resumeData.certList" class="work-box">
            <el-row >
              <el-col :span="4">
                <div style="font-weight: bold">{{work.certificateName}}</div>
              </el-col>
              <el-col :span="20">
                <div>{{work.inceptDate+'获得'}}</div>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-main>
    </el-container>




  </div>
</template>

<script>
import {getUserResumeData, approveResume, getResumeDataByResumeId} from "@/api/service/service";

export default {
  name: "userdetail",
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
      resumeList: [],
      resumeData: {},
      applyData: {},
      logsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        title: null,
        type: null,
        advantage: null,
        resumeUrl: null,
        defaultFlag: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    const applyId = this.$route.query && this.$route.query.id;
    this.getResumeData(applyId);
  },
  methods: {
    /** 查询求职简历列表 */
    getResumeData(id) {
      this.loading = true;
      getResumeDataByResumeId(id).then(response => {
        this.resumeData = response.data;
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
        approveStatus: null,
        remark: null
      };
      this.resetForm("form");
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
    /** 提交按钮 */
    submitForm() {
      if(!this.form.id){
        this.$modal.msgError("数据有误，请联系管理员");
      }
      if(!this.form.approveStatus){
        this.$modal.msgError("请选择处理意见");
      }
      approveResume(this.form).then(response => {
        this.$modal.msgSuccess("修改成功");
        this.getList();
      });
    }
  }
};
</script>
<style>
.work-box{
  margin-bottom:20px;
}
</style>
