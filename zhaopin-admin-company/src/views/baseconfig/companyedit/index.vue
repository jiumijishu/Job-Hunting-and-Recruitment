<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-card shadow="hover" style="width:70%;margin:0px auto;">
        <div slot="header" class="clearfix">
          <span class="container">编辑公司信息</span>
        </div>
        <el-row>
          <el-form-item label="公司全称" prop="companyName">
            <el-input v-model="form.companyName" placeholder="请输入公司全称" disabled/>
          </el-form-item>
          <el-form-item label="统一信用代码" prop="uniformSocialCreditCode">
            <el-input v-model="form.uniformSocialCreditCode" placeholder="请输入统一社会信用代码" disabled/>
          </el-form-item>
          <el-form-item label="公司简称" prop="shortName">
            <el-input v-model="form.shortName" placeholder="请输入公司简称"/>
          </el-form-item>
          <el-form-item label="公司规模" prop="size">
            <el-select v-model="form.size" placeholder="请选择公司规模">
              <el-option
                v-for="item in dict.type.sys_company_large_scale"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业LOGO">
            <image-upload v-model="form.logo"/>
          </el-form-item>
          <el-form-item label="行业" prop="industry">
            <el-select v-model="form.industry" placeholder="请选择行业">
              <el-option
                v-for="item in industryList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="企业福利" prop="companyBenefit">
            <el-select v-model="form.companyBenefit" multiple placeholder="请选择企业福利">
              <el-option
                v-for="item in dict.type.base_company_benefit"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-row>
      </el-card>

      <el-card shadow="hover" style="width:70%;margin:10px auto">
        <div slot="header" class="clearfix">
          <span class="container">公司相册</span>
        </div>
        <el-row>
          <image-upload v-model="form.companyPhotos"/>
        </el-row>
      </el-card>

      <el-card shadow="hover" style="width:70%;margin:10px auto">
        <div slot="header" class="clearfix">
          <span class="container">公司简介</span>
        </div>
        <el-row>
          <editor v-model="form.intro" :min-height="250"/>
        </el-row>
      </el-card>
      <el-row style="margin-top:30px;text-align: center">
        <el-form-item >
          <el-button type="primary" @click="submitForm">保存企业信息</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link    :to="'/setConfig/company'">
            <el-button @click="cancel">取 消</el-button>
          </router-link>
        </el-form-item>
      </el-row>
    </el-form>

  </div>
</template>

<script>
import {listCompany, getCompany, delCompany, addCompany, updateCompany} from "@/api/baseconfig/company";
import {editCompanyDetail, getCurrentCompany} from "@/api/service/service";
import {listAllIndustry} from "@/api/baseconfig/industry";

export default {
  name: "Company",
  dicts: ['sys_company_large_scale','base_company_benefit'],
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
      industryList:[],
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
        companyBenefit: [],
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
      rules: {}
    };
  },
  created() {
    this.queryIndustryData();
    this.getCompanyData();
  },
  methods: {
    /** 查询待审核公司列表 */
    getCompanyData() {
      this.loading = true;
      getCurrentCompany().then(response => {
        this.form = response.data;
        this.loading = false;
      });
    },

    queryIndustryData() {
      listAllIndustry().then(response => {
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
        companyBenefit: [],
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
        evidentiaryFile: null,
        companyPhotos:''
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
      this.single = selection.length !== 1
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
            editCompanyDetail(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
            });
          } else {
            this.$modal.msgSuccess("企业不存在");
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除待审核公司编号为"' + ids + '"的数据项？').then(function () {
        return delCompany(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
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

.container {
  font-size: 18px;

}
</style>
