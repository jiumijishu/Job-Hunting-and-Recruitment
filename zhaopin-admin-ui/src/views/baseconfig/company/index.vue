<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
      <el-form-item label="公司简称" prop="shortName">
        <el-input
          v-model="queryParams.shortName"
          placeholder="请输入公司简称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司全称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司全称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="联系电话" prop="contactPhone">
        <el-input
          v-model="queryParams.contactPhone"
          placeholder="请输入联系电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否可用" prop="availableFlag">
        <el-select v-model="queryParams.availableFlag" placeholder="请选择是否可用" clearable>
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="行业" prop="industry">
        <el-select v-model="queryParams.industry" placeholder="请选择行业" clearable>
          <el-option
            v-for="dict in industryList"
            :key="dict.id"
            :label="dict.name"
            :value="dict.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['baseconfig:company:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" border :data="companyList">
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="公司简称" align="center" prop="shortName" />
      <el-table-column label="公司全称" align="center" prop="companyName" />
      <el-table-column label="主营行业" align="center" prop="industry" />
      <el-table-column label="公司规模" align="center" prop="size" />
      <el-table-column label="在招职位" align="center" prop="jobNum" />
      <el-table-column label="HR账号" align="center" prop="hrnum" />
      <el-table-column label="联系电话" align="center" prop="contactPhone" />
      <el-table-column label="注册时间" align="center" prop="createTime" />
      <el-table-column label="状态" align="center" prop="availableFlag">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.availableFlag"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link
            :to="'/users/companydetail?id=' +scope.row.id"
          >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-info"
            >详情</el-button>
          </router-link>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-setting"
            @click="handleStatusFun(scope.row)"
          >{{scope.row.availableFlag==='Y'?'禁用':'恢复'}}</el-button>
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

    <!-- 添加或修改待审核公司对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="650px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公司简称" prop="shortName">
          <el-input v-model="form.shortName" placeholder="请输入公司简称" />
        </el-form-item>
        <el-form-item label="公司全称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司全称" />
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="uniformSocialCreditCode">
          <el-input v-model="form.uniformSocialCreditCode" placeholder="请输入统一社会信用代码" />
        </el-form-item>
        <el-form-item label="营业执照">
          <image-upload v-model="form.businessLicense"/>
        </el-form-item>
        <el-form-item label="企业LOGO">
          <image-upload v-model="form.logo"/>
        </el-form-item>
        <el-form-item label="行业" prop="industry">
          <el-input v-model="form.industry" placeholder="请输入行业" />
        </el-form-item>
        <el-form-item label="信誉" prop="credit">
          <el-input v-model="form.credit" placeholder="请输入信誉" />
        </el-form-item>
        <el-form-item label="公司简介" prop="intro">
          <el-input v-model="form.intro" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="状态 Y正常N禁用">
          <el-radio-group v-model="form.availableFlag">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核状态01 待审核  02 审核通过 03 审核不通过">
          <el-radio-group v-model="form.auditStatus">
            <el-radio
              v-for="dict in dict.type.base_company_approve_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核时间" prop="auditTime">
          <el-date-picker clearable
            v-model="form.auditTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="驳回原因" prop="auditRemark">
          <el-input v-model="form.auditRemark" placeholder="请输入驳回原因" />
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="form.contactName" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="证明材料">
          <file-upload v-model="form.evidentiaryFile"/>
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
import { listCompany, getCompany, delCompany, addCompany, updateCompany } from "@/api/baseconfig/company";
import {getAllindustryData} from "@/api/service/service";

export default {
  name: "Company",
  dicts: ['sys_yes_no', 'base_company_approve_status'],
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
      // 待审核公司表格数据
      companyList: [],
      industryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        shortName: null,
        companyName: null,
        uniformSocialCreditCode: null,
        businessLicense: null,
        logo: null,
        industry: null,
        companyType: null,
        size: null,
        credit: null,
        intro: null,
        availableFlag: null,
        auditStatus: null,
        auditTime: null,
        auditRemark: null,
        contactName: null,
        contactPhone: null,
        evidentiaryFile: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getIndustryData();
    this.getList();
  },
  methods: {
    /** 查询待审核公司列表 */
    getList() {
      this.loading = true;
      this.queryParams.auditStatus='02';
      listCompany(this.queryParams).then(response => {
        this.companyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getIndustryData(){
      getAllindustryData().then(response => {
        this.industryList = response.data;
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
        shortName: null,
        companyName: null,
        uniformSocialCreditCode: null,
        businessLicense: null,
        logo: null,
        industry: null,
        companyType: null,
        size: null,
        credit: null,
        intro: null,
        availableFlag: "0",
        createBy: null,
        createTime: null,
        auditStatus: "0",
        auditTime: null,
        auditRemark: null,
        contactName: null,
        contactPhone: null,
        evidentiaryFile: null
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
      this.title = "添加待审核公司";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCompany(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改待审核公司";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCompany(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCompany(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleStatusFun(row) {
      const ids = row.id;
      let param={
        id:row.id,
        availableFlag:row.availableFlag==='Y'?'N':'Y'
      }
      let title=row.availableFlag==='Y'?'是否确认禁用【'+row.companyName+'】?':'是否确认恢复【'+row.companyName+'】?'
      this.$modal.confirm(title).then(function() {
        return updateCompany(param);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("操作成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('baseconfig/company/export', {
        ...this.queryParams
      }, `company_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
