<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
      <el-form-item label="姓名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="毕业学校" prop="schoolName">
        <el-input
          v-model="queryParams.schoolName"
          placeholder="请输入毕业学校"
          clearable
        />
      </el-form-item>
      <el-form-item label="学历" prop="education">
        <el-select v-model="queryParams.education" placeholder="请选择学历">
          <el-option
            v-for="item in dict.type.sys_education"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入毕业学校"
          clearable
        />
      </el-form-item>
      <el-form-item label="职位名称" prop="jobName">
        <el-input
          v-model="queryParams.jobName"
          placeholder="请输入职位名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="职位类型" prop="typeName">
        <el-select v-model="queryParams.typeName" placeholder="请选择">
          <el-option-group
            v-for="group in jobsTypeDataList"
            :key="group.categoryId"
            :label="group.categoryName">
            <el-option
              v-for="item in group.childList"
              :key="item.id"
              :label="item.typeName"
              :value="item.typeName">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="投递状态" prop="applyStatus">
        <el-select v-model="queryParams.applyStatus" placeholder="请选择投递状态" clearable>
          <el-option
            v-for="dict in dict.type.base_job_apply_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

<!--    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['baseconfig:jobapply:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['baseconfig:jobapply:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['baseconfig:jobapply:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['baseconfig:jobapply:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>-->

    <el-table v-loading="loading" border :data="jobapplyList">
      <el-table-column label="编号" align="center" type="index" />
      <el-table-column label="姓名" align="center" prop="userName" />
      <el-table-column label="手机号" align="center" prop="phonenumber" />
      <el-table-column label="毕业学校" align="center" prop="schoolName"  width="180"/>
      <el-table-column label="学历" align="center" prop="education"></el-table-column>
      <el-table-column label="职位名称" align="center" prop="jobName" />
      <el-table-column label="分类" align="center" prop="typeName" />
      <el-table-column label="类型" align="center" prop="categoryName" />
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <el-table-column label="投递时间" align="center" prop="applyTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="applyStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.base_job_apply_status" :value="scope.row.applyStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link
            :to="'/business/jobapplydetail?id=' +scope.row.id"
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-info"
          >详情</el-button>
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

    <!-- 添加或修改用户投递简历申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="650px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="简历ID" prop="resumeId">
          <el-input v-model="form.resumeId" placeholder="请输入简历ID" />
        </el-form-item>
        <el-form-item label="职位ID" prop="jobId">
          <el-input v-model="form.jobId" placeholder="请输入职位ID" />
        </el-form-item>
        <el-form-item label="申请时间" prop="applyTime">
          <el-date-picker clearable
            v-model="form.applyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择申请时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="投递状态">
          <el-radio-group v-model="form.applyStatus">
            <el-radio
              v-for="dict in dict.type.base_job_apply_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="处理人" prop="dealUser">
          <el-input v-model="form.dealUser" placeholder="请输入处理人" />
        </el-form-item>
        <el-form-item label="处理时间" prop="dealTime">
          <el-date-picker clearable
            v-model="form.dealTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择处理时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="入职时间" prop="entryTime">
          <el-date-picker clearable
            v-model="form.entryTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择入职时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入职附件">
          <file-upload v-model="form.entryFile"/>
        </el-form-item>
        <el-form-item label="确认人" prop="approveUser">
          <el-input v-model="form.approveUser" placeholder="请输入确认人" />
        </el-form-item>
        <el-form-item label="确认时间" prop="approveTime">
          <el-date-picker clearable
            v-model="form.approveTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择确认时间">
          </el-date-picker>
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
import { listJobapply, getJobapply, delJobapply, addJobapply, updateJobapply } from "@/api/baseconfig/jobapply";
import {getJobtypeData} from "@/api/servicepc";

export default {
  name: "Jobapply",
  dicts: ['base_job_apply_status','sys_education'],
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
      // 用户投递简历申请表格数据
      jobapplyList: [],
      jobsTypeDataList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: null,
        phonenumber: null,
        companyName: null,
        schoolName: null,
        applyStatus: null,
        education: null,
        jobName: null,
        typeName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        resumeId: [
          { required: true, message: "简历ID不能为空", trigger: "blur" }
        ],
        jobId: [
          { required: true, message: "职位ID不能为空", trigger: "blur" }
        ],
        applyTime: [
          { required: true, message: "申请时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getAllJobTypeData();
    this.getList();
  },
  methods: {
    /** 查询用户投递简历申请列表 */
    getList() {
      this.loading = true;
      listJobapply(this.queryParams).then(response => {
        this.jobapplyList = response.rows;
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
        userId: null,
        resumeId: null,
        jobId: null,
        applyTime: null,
        applyStatus: "0",
        dealUser: null,
        dealTime: null,
        remark: null,
        entryTime: null,
        entryFile: null,
        approveUser: null,
        approveTime: null
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
      this.title = "添加用户投递简历申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getJobapply(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户投递简历申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateJobapply(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addJobapply(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除用户投递简历申请编号为"' + ids + '"的数据项？').then(function() {
        return delJobapply(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('baseconfig/jobapply/export', {
        ...this.queryParams
      }, `jobapply_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
