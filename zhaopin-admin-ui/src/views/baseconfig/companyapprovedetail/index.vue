<template>
  <div class="app-container">
    <el-container>
      <el-aside width="70%" style="overflow: hidden">
        <el-card shadow="hover">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="公司简称">
              <span>{{ companyData.shortName }}</span>
            </el-form-item>
            <el-form-item label="公司名称">
              <span>{{ companyData.companyName }}</span>
            </el-form-item>
            <el-form-item label="信用代码">
              <span>{{ companyData.uniformSocialCreditCode }}</span>
            </el-form-item>
            <el-form-item label="营业执照">
          <span>
            <img style="width:200px;" :src="companyData.businessLicense">
          </span>
            </el-form-item>
            <el-form-item label="联系人">
              <span>{{ companyData.contactName }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ companyData.contactPhone }}</span>
            </el-form-item>
            <el-form-item label="主营行业">
              <span>{{ companyData.industry }}</span>
            </el-form-item>
          </el-form>

        </el-card>
      </el-aside>
      <el-main>
        <el-card v-show="companyData.auditStatus==='01'">
          <h3>职位审核</h3>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="审核意见" prop="auditStatus">
              <el-radio-group v-model="form.auditStatus">
                <el-radio label="02">通过</el-radio>
                <el-radio label="03">拒绝</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="驳回原因" prop="auditRemark">
              <el-input v-model="form.auditRemark" type="textarea" placeholder="请输入经验"/>
            </el-form-item>
          </el-form>
          <div style="text-align: center">
            <el-button type="primary" @click="submitForm">提 交</el-button>
          </div>
        </el-card>
        <el-card style="margin-top:5px">
          <h3>职位日志</h3>
          <el-row style="margin-top:5px;margin-bottom:5px;line-height:25px;" v-for="log in companyLogsData">
            <div>{{ log.createTime }}</div>
            <el-row style="font-weight: bold">
              <el-col :span="12">
                <span>{{ log.content }}</span>
              </el-col>
              <el-col :span="12">
                <i class="el-icon-s-custom"></i> {{ log.createBy }}
              </el-col>
            </el-row>
            <div>
              <span>{{ log.remark }}</span>
            </div>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <router-link :to="'/approve/companyapprove'">
        <el-button size="medium">返 回</el-button>
      </router-link>
    </div>


  </div>
</template>

<script>
import {approveCompany, approveCompanyJobs, getCompanyById} from "@/api/service/service";
import {getJobLogs} from "@/api/baseconfig/joblogs";
import {getCompanyLogsById} from "@/api/baseconfig/companylogs";
import {getCompany} from "@/api/baseconfig/company";

export default {
  name: "companyapprovedetail",
  dicts: ['sys_yes_no', 'base_company_approve_auditStatus'],
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
      companyData: {},
      companyLogsData:[],

      form: {},
      // 表单校验
      rules: {
        auditStatus: [
          { required: true, message: "请选择审核意见", trigger: "blur" }
        ]
      },
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false
    };
  },
  created() {
    const companyId = this.$route.query && this.$route.query.id;
    this.getCompanyData(companyId);
    this.getCompanyLogsList(companyId);
  },
  methods: {

    /** 查询待审核公司列表 */
    getCompanyData(id) {
      this.loading = true;
      getCompany(id).then(response => {
        this.companyData = response.data;
        this.form.id=this.companyData.id;
        this.loading = false;
      });
    },
    getCompanyLogsList(id) {
      let param={
        companyId:id
      }
      getCompanyLogsById(param).then(response => {
        this.companyLogsData = response.data;
      });
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.form.auditStatus=='03'){
            if(!this.form.auditRemark){
              this.$modal.msgError("请填写驳回原因");
              return false;
            }
          }
          approveCompany(this.form).then(response => {
            this.$modal.msgSuccess("提交审核成功");
            this.open = false;
            this.getList();
          });
        }
      });
    }
  }
};
</script>
