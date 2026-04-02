<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width:80%;padding-left:100px;padding-top:50px;">

      <el-form-item label="职位类型" prop="typeData" >
        <el-cascader
          v-model="form.typeData"
          :options="provinceData"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>


      <el-form-item label="职位标签" prop="jobLabelsArray">
        <el-select
          style="width:350px"
          v-model="form.jobLabelsArray"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择职位标签">
          <el-option
            v-for="item in jobLabelsArrayData"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="职位名称" prop="jobName">
        <el-input v-model="form.jobName" placeholder="请输入职位名称" />
      </el-form-item>


      <el-row>
        <el-col :span="12">
          <el-form-item label="经验" prop="workExperience">
            <el-select v-model="form.workExperience" placeholder="请选择经验">
              <el-option
                v-for="item in dict.type.sys_work_experience"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学历" prop="education">
            <el-select v-model="form.education" placeholder="请选择学历">
              <el-option
                v-for="item in dict.type.sys_education"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="职位性质" prop="jobNature">
            <el-select v-model="form.jobNature" placeholder="请选择职位性质">
              <el-option
                v-for="item in dict.type.base_job_nature"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>

      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="最低薪资" prop="minSalary">
            <el-select v-model="form.minSalary" placeholder="请选择最低薪资">
              <el-option
                v-for="item in dict.type.sys_work_salary"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最高薪资" prop="maxSalary">
            <el-select v-model="form.maxSalary" placeholder="请选择最高薪资">
              <el-option
                v-for="item in dict.type.sys_work_salary"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="工作地点" prop="addrId">
        <el-select v-model="form.addrId" placeholder="请选择工作地点"  style="width:450px">
          <el-option
            v-for="item in companyAddressList"
            :key="item.id"
            :label="item.province+item.city+item.address"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位描述" prop="intro">
        <editor v-model="form.intro" :min-height="300"/>
      </el-form-item>
      <el-form-item label="" >
        <el-button type="primary" @click="submitForm">发布/保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <router-link    :to="'/jobManage/jobs'">
        <el-button @click="cancel">取 消</el-button>
      </router-link>
      </el-form-item>
    </el-form>
    <!-- <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button type="primary" @click="submitForm">发布/保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <router-link    :to="'/jobs'">
        <el-button @click="cancel">取 消</el-button>
      </router-link>
    </div> -->


  </div>
</template>

<script>
import { listJobs, getJobs, delJobs, addJobs, updateJobs } from "@/api/baseconfig/jobs";
import {
  addCompanyJobs,
  editCompanyJobs,
  getCompanyJobDetail, listAllProvince,
  listCompanyAddress,
  listJobTypeData,
  queryJobSortData,
  queryJobSortInfo
} from "@/api/service/service";

export default {
  name: "jobsPublish",
  dicts: ['sys_work_experience', 'sys_education','sys_work_salary','base_job_nature'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      typeIds: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      currentJobId:null,
      jobsData:{},
      // 岗位表格数据
      jobsList: [],
      // jobsTypeDataList: [],
      jobLabelsArrayData: [],
      companyAddressList: [],
      provinceData: [],
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
        jobNature: null,
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
      form: {
        typeData:[]
      },
      // 表单校验
      rules: {
        typeData: [
          { required: true, message: "请选择职位；类型", trigger: "blur" }
        ],
        jobName: [
          { required: true, message: "请填写职位名称", trigger: "blur" }
        ],
        workExperience: [
          { required: true, message: "请选择工作经验", trigger: "blur" }
        ],
        education: [
          { required: true, message: "请选择学历", trigger: "blur" }
        ],
        jobNature: [
          { required: true, message: "请选择职位性质", trigger: "blur" }
        ],
        /*minSalary: [
          { required: true, message: "请选择最低薪资", trigger: "blur" }
        ],
        maxSalary: [
          { required: true, message: "请选择最高薪资", trigger: "blur" }
        ],*/
        addrId: [
          { required: true, message: "请选择工作地点", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "请填写职位描述", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    const jobId = this.$route.query && this.$route.query.id;
    if(jobId){
      this.currentJobId=jobId
    }
    this.getJobTypeDataList();
    this.getCompanyAddressList();
    this.getProvinceData();
  },
  methods: {

    getJobDetail(id) {
      getCompanyJobDetail(id).then(response => {
        this.form=response.data;
        let typeData=[response.data.typeName.split(',')[0],response.data.typeName.split(',')[1],response.data.typeName.split(',')[2]];
        console.log(response.data.typeName);
        console.log(typeData);
        this.$set(this.form,'typeData',typeData);
        this.$set(this.form,'jobLabelsArray',response.data.jobLabels?response.data.jobLabels.split(','):[])

      });
    },
    /** 查询岗位列表 */
    getList() {
      this.loading = true;
      listJobs(this.queryParams).then(response => {
        this.jobsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    handleChange(value) {
      queryJobSortInfo(value[2]).then(response => {
        this.jobLabelsArrayData=response.data.lables?response.data.lables.split(','):[];
      });
    },

    getProvinceData() {
      queryJobSortData().then(response => {
        this.provinceData = response.data;
      });
    },

    getJobTypeDataList() {
      queryJobSortData().then(response => {
        this.jobsTypeDataList = response.data;
        if(this.currentJobId){
          this.getJobDetail(this.currentJobId);
        }
      });
    },

    getCompanyAddressList() {
      listCompanyAddress().then(response => {
        this.companyAddressList = response.data;
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
        typeData: [],
        typeId: null,
        typeName: null,
        jobLabels: null,
        jobLabelsArray: [],
        workExperience: null,
        education: null,
        jobNature: null,
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
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.jobLabels=this.form.jobLabelsArray?this.form.jobLabelsArray.join(','):'';

          //取职位类型级联ID
          this.form.typeIds=this.form.typeData;
          // alert(this.form.typeId);
          if (this.form.id != null) {
            this.form.status='01';
            editCompanyJobs(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.$router.push("/jobManage/jobs");
              //this.getList();
            });
          } else {
            addCompanyJobs(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.$router.push("/jobManage/jobs");
            });
          }
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
