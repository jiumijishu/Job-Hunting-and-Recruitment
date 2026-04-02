<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
      <el-form-item label="职位名称" prop="jobName">
        <el-input
          v-model="queryParams.jobName"
          placeholder="请输入职位名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="职位类型" prop="typeId">
        <el-select v-model="queryParams.typeId" placeholder="请选择">
          <el-option-group
            v-for="group in jobsTypeDataList"
            :key="group.categoryId"
            :label="group.categoryName">
            <el-option
              v-for="item in group.childList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="工作城市" prop="cityName">
        <el-input
          v-model="queryParams.cityName"
          placeholder="请输入工作城市"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="first"></el-tab-pane>
      <el-tab-pane label="已驳回" name="second"></el-tab-pane>
    </el-tabs>
    <el-table v-loading="loading" border :data="jobsList">
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="职位名称" align="center" prop="jobName" />
      <el-table-column label="职位类型" align="center" prop="typeName" />
      <el-table-column label="职位分类" align="center" prop="categoryName" />
      <el-table-column label="薪资" align="center" prop="minSalary" >
        <template slot-scope="scope">
          <span>{{scope.row.minSalary+'-'+scope.row.maxSalary}}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作地点" align="center" prop="addrId" >
        <template slot-scope="scope">
          <span>{{scope.row.province+'-'+scope.row.city+'-'+scope.row.area}}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <el-table-column label="发布时间" align="center" prop="createTime" />
      <el-table-column label="驳回原因" align="center" prop="backReason" v-if="activeName==='second'"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link
            :to="'/approve/jobsapprovedetail?id=' +scope.row.id"
          >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-info"
            >{{activeName==='first'?'审核':'详情'}}</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改职位对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="650px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="职位名称" prop="jobName">
          <el-input v-model="form.jobName" placeholder="请输入职位名称" />
        </el-form-item>
        <el-form-item label="职位类型" prop="typeId">
          <el-input v-model="form.typeId" placeholder="请输入职位类型" />
        </el-form-item>
        <el-form-item label="职位标签" prop="jobLabels">
          <el-input v-model="form.jobLabels" placeholder="请输入职位标签" />
        </el-form-item>
        <el-form-item label="经验" prop="workExperience">
          <el-input v-model="form.workExperience" placeholder="请输入经验" />
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-input v-model="form.education" placeholder="请输入学历" />
        </el-form-item>
        <el-form-item label="最低薪资" prop="minSalary">
          <el-input v-model="form.minSalary" placeholder="请输入最低薪资" />
        </el-form-item>
        <el-form-item label="最高薪资" prop="maxSalary">
          <el-input v-model="form.maxSalary" placeholder="请输入最高薪资" />
        </el-form-item>
        <el-form-item label="地址ID" prop="addrId">
          <el-input v-model="form.addrId" placeholder="请输入地址ID" />
        </el-form-item>
        <el-form-item label="公司ID" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入公司ID" />
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="职位描述" prop="intro">
          <el-input v-model="form.intro" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="发布人id" prop="createUserId">
          <el-input v-model="form.createUserId" placeholder="请输入发布人id" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listJobs, getJobs, delJobs, addJobs, updateJobs, listJobsApproveData} from "@/api/baseconfig/jobs";
import {getJobtypeData} from "@/api/servicepc";

export default {
  name: "jobsapprove",
  dicts:['sys_yes_no','sys_company_job_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      activeName:'first',
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 职位表格数据
      jobsList: [],
      jobsTypeDataList: [],
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
        cityName: null,
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
    this.getAllJobTypeData();
    this.queryParams.status='01';
    this.getList();
  },
  methods: {
    /** 查询职位列表 */
    getList() {
      this.loading = true;
      listJobsApproveData(this.queryParams).then(response => {
        this.jobsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    getAllJobTypeData() {
      getJobtypeData().then(response => {
        this.jobsTypeDataList = response.data;
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
      this.title = "添加职位";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getJobs(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改职位";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateJobs(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addJobs(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleReferrer(row) {
      let param={
        id:row.id,
        referrerFlag:row.referrerFlag==='Y'?'N':'Y'
      }
      this.$modal.confirm('是否确认该操作？').then(function() {
        return updateJobs(param);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("操作成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('baseconfig/jobs/export', {
        ...this.queryParams
      }, `jobs_${new Date().getTime()}.xlsx`)
    },
    handleClick(event){
      if(this.activeName==='second'){
        this.queryParams.status='03';
      }else{
        this.queryParams.status='01';
      }
      this.getList();
    }
  }
};
</script>
