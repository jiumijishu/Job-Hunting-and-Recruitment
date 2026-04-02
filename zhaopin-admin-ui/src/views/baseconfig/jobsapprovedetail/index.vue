<template>
  <div class="app-container">
    <el-container>
      <el-aside width="70%" style="overflow: hidden">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width:80%;padding-left:100px;padding-top:50px;">
          <el-form-item label="职位名称" prop="jobName">
            <span>{{jobsData.jobName}}</span>
          </el-form-item>
          <el-form-item label="职位类型" prop="jobName">
            <span>{{jobsData.typeName}}</span>
          </el-form-item>
          <el-form-item label="职位性质" prop="jobNature">
            <span>{{jobsData.jobNature}}</span>
          </el-form-item>
          <el-form-item label="职位标签" prop="typeId">
            <el-tag v-for="label in jobsData.jobLabels?jobsData.jobLabels.split(','):[]" style="margin-left:5px;">{{ label }}</el-tag>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="经验" prop="workExperience">
                <span>{{jobsData.workExperience}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历" prop="education">
                <span>{{jobsData.education}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="最低薪资" prop="minSalary">
                <span>{{jobsData.minSalary}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最高薪资" prop="maxSalary">
                <span>{{jobsData.maxSalary}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="工作地点" prop="addrId">
            <span><i class="el-icon-location"></i>{{jobsData.companyAddress?jobsData.companyAddress.province+jobsData.companyAddress.city+jobsData.companyAddress.address:''}}</span>
          </el-form-item>
          <el-form-item label="职位描述" prop="intro" >
            <div v-html="jobsData.intro"></div>
          </el-form-item>
        </el-form>
      </el-aside>
      <el-main>
        <el-card v-show="jobsData.status==='01'">
          <h3>职位审核</h3>
          <el-form ref="jobForm" :model="jobForm" :rules="rules" label-width="80px">
            <el-form-item label="审核意见" prop="status">
              <el-radio-group v-model="jobForm.status">
                <el-radio label="02">通过</el-radio>
                <el-radio label="03">拒绝</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="驳回原因" prop="backReason">
              <el-input v-model="jobForm.backReason" type="textarea" placeholder="请输入经验" />
            </el-form-item>
          </el-form>
          <div style="text-align: center">
            <el-button type="primary" @click="submitForm">提 交</el-button>
          </div>
        </el-card>
        <el-card style="margin-top:5px">
          <h3>职位日志</h3>
          <el-row style="margin-top:5px;margin-bottom:5px;line-height:25px;" v-for="log in jobsLogsData">
            <div>{{log.createTime}}</div>
            <el-row style="font-weight: bold">
              <el-col :span="12">
                <span>{{log.content}}</span>
              </el-col>
              <el-col :span="12">
                <i class="el-icon-s-custom"></i> {{log.createBy}}
              </el-col>
            </el-row>
            <div>
              <span>{{log.remark}}</span>
            </div>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <router-link    :to="'/approve/jobsapprove'">
        <el-button  size="medium">返  回</el-button>
      </router-link>
    </div>

  </div>
</template>

<script>
import { listJobs, getJobs, delJobs, addJobs, updateJobs } from "@/api/baseconfig/jobs";
import {
  addCompanyJobs, approveCompanyJobs,
  editCompanyJobs,
  getCompanyJobDetail,
  listCompanyAddress,
  listJobTypeData
} from "@/api/service/service";
import {getJobLogs} from "@/api/baseconfig/joblogs";

export default {
  name: "jobsapprovedetail",
  dicts: ['sys_work_experience', 'sys_education','sys_work_salary'],
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
      jobsData: {},
      jobsLogsData: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      labelOptions: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
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
      jobForm: {},
      // 表单校验
      rules: {
        status: [
          { required: true, message: "请选择审核意见", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    const jobId = this.$route.query && this.$route.query.id;
    this.getJobDetail(jobId);
    this.getJobLogsList(jobId);
  },
  methods: {


    getJobDetail(id) {
      getCompanyJobDetail(id).then(response => {
        this.jobsData = response.data;
        this.jobForm.id=this.jobsData.id;
      });
    },

    getJobLogsList(id) {
      let param={
        jobId:id
      }
      getJobLogs(param).then(response => {
        this.jobsLogsData = response.data;
      });
    },


    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.jobForm = {
        id: null,
        status: "2",
        backReason:null
      };
      this.resetForm("jobForm");
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加岗位";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getJobs(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改岗位";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["jobForm"].validate(valid => {
        if (valid) {
          if(this.jobForm.status=='03'){
            if(!this.jobForm.backReason){
              this.$modal.msgError("请填写驳回原因");
              return false;
            }
          }
          approveCompanyJobs(this.jobForm).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除岗位编号为"' + ids + '"的数据项？').then(function() {
        return delJobs(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('baseconfig/jobs/export', {
        ...this.queryParams
      }, `jobs_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
