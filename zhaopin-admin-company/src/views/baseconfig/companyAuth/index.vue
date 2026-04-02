<template>
  <div class="app-container">
    <el-card shadow="hover">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公司名称">
          <span>{{companyData.companyName}}</span>
        </el-form-item>
        <el-form-item label="信用代码">
          <span>{{companyData.uniformSocialCreditCode}}</span>
        </el-form-item>
        <el-form-item label="营业执照">
          <span>
            <img style="width:200px;" :src="companyData.businessLicense">
          </span>
        </el-form-item>
        <el-form-item label="联系人">
          <span>{{companyData.contactName}}</span>
        </el-form-item>
        <el-form-item label="联系电话">
          <span>{{companyData.contactPhone}}</span>
        </el-form-item>
      </el-form>

    </el-card>


  </div>
</template>

<script>
import {getCurrentCompany} from "@/api/service/service";

export default {
  name: "CompanyAuth",
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
      companyData:{},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false
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
    }
  }
};
</script>
