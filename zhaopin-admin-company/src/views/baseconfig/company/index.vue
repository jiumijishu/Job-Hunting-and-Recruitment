<template>
  <div class="app-container">
    <el-card shadow="hover" style="width:70%;margin:0px auto">
      <div slot="header" class="clearfix">
        <span class="container">基础信息</span>
        <router-link :to="'/setConfig/companyedit?id=' +companyData.id">
          <el-button style="float: right; padding: 3px 0" type="text">编辑公司信息</el-button>
        </router-link>
      </div>
      <el-row>
        <el-col :span="8">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #9c9898">公司简称:</span>
            <span>{{companyData.companyName}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #9c9898">公司规模:</span>
            <span>{{companyData.size}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #9c9898">公司LOGO:</span>
            <span style="margin-left:10px">
              <img style="width:100px;" :src="companyData.logo" align="top">
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #9c9898">主营行业:</span>
            <span>{{companyData.industry}}</span>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #9c9898">公司福利:</span>
            <span>{{companyData.companyBenefitDesc}}</span>
          </div>
        </el-col>
      </el-row>

    </el-card>

    <el-card shadow="hover" style="width:70%;margin:10px auto">
      <div slot="header" class="clearfix">
        <span class="container">公司相册</span>
      </div>
      <el-row>
        <span v-for="item in companyData.photoList?companyData.photoList:[]" style="margin:10px;">
          <image-preview :src="item.fileUrl" :width="160" :height="160"/>
        </span>
      </el-row>
    </el-card>

    <el-card shadow="hover" style="width:70%;margin:10px auto">
      <div slot="header" class="clearfix">
        <span class="container">公司简介</span>
      </div>
      <el-row>
        <div v-html="companyData.intro">
        </div>
      </el-row>
    </el-card>



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
import {getCurrentCompany} from "@/api/service/service";

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
      companyData: {},
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
    this.getCompanyData();
  },
  methods: {
    /** 查询待审核公司列表 */
    getCompanyData() {
      this.loading = true;
      getCurrentCompany().then(response => {
        this.companyData = response.data;
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
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除待审核公司编号为"' + ids + '"的数据项？').then(function() {
        return delCompany(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
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
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.container{
  font-size: 18px;

}
</style>
