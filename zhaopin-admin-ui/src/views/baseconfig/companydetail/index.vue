<template>
  <div class="app-container">
    <el-card shadow="hover" style="width:70%;margin:0px auto">
      <div slot="header" class="clearfix">
        <span>基础信息</span>
      </div>
      <el-row>
        <el-col :span="12">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #5a5e66">公司名称:</span>
            <span>{{companyData.companyName}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #5a5e66">公司LOGO:</span>
            <span style="margin-left:10px">
              <img style="width:100px;" :src="companyData.logo" align="top">
            </span>
          </div>
        </el-col>


      </el-row>
      <el-row style="line-height:50px;">
        <el-col :span="12">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #5a5e66">公司简称:</span>
            <span>{{companyData.shortName}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #5a5e66">公司规模:</span>
            <span>{{companyData.size}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row  style="line-height:50px;">
        <el-col :span="12">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #5a5e66">联系人:</span>
            <span>{{companyData.contactName}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #5a5e66">信用代码:</span>
            <span>{{companyData.uniformSocialCreditCode}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row  style="line-height:50px;">
        <el-col :span="12">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #5a5e66">联系电话:</span>
            <span>{{companyData.contactPhone}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #5a5e66">营业执照:</span>
            <span style="margin-left:10px">
              <img style="width:100px;" :src="companyData.businessLicense" align="top">
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row  style="line-height:50px;">
        <el-col :span="12">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #5a5e66">主营行业:</span>
            <span>{{companyData.industry}}</span>
            <el-button type="primary" style="margin-left:30px;" icon="el-icon-edit" size="mini" @click="handleEditFun">修改</el-button>
          </div>
        </el-col>

        <el-col :span="12">
          <div>
            <span style="font-weight: bold;margin-right:10px;color: #5a5e66">公司福利:</span>
            <span>{{companyData.companyBenefitDesc}}</span>
          </div>
        </el-col>

      </el-row>
    </el-card>

    <el-card shadow="hover" style="width:70%;margin:10px auto">
      <div slot="header" class="clearfix">
        <span>公司相册</span>
      </div>
      <el-row>
        <el-carousel :interval="4000" arrow="always" height="200px">
          <el-carousel-item v-for="item in companyData.photoList?companyData.photoList:[]" :key="item">
            <img :src="item.fileUrl">
          </el-carousel-item>
        </el-carousel>
      </el-row>
    </el-card>

    <el-card shadow="hover" style="width:70%;margin:10px auto">
      <div slot="header" class="clearfix">
        <span>公司介绍</span>
      </div>
      <el-row>
        <div v-html="companyData.intro">
        </div>
      </el-row>
    </el-card>

    <el-card shadow="hover" style="width:70%;margin:0px auto">
      <div slot="header" class="clearfix">
        <span>在招职位</span>
      </div>
      <el-table border :data="jobsList">
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
        <el-table-column label="投递次数" align="center" prop="applyNum" />
        <el-table-column label="发布时间" align="center" prop="createTime" />
        <el-table-column label="推荐" align="center" prop="referrerFlag" >
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.referrerFlag"/>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status" >
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_company_job_status" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <router-link
              :to="'/business/JobsDetail?id=' +scope.row.id"
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
        @pagination="getCompanyJobsData"
      />
    </el-card>



    <el-dialog :title="title" :visible.sync="open" width="650px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="行业" prop="industry">
          <el-select v-model="form.industry" placeholder="请选择行业">
            <el-option
              v-for="dict in industryList"
              :key="dict.id"
              :label="dict.name"
              :value="dict.name"
            />
          </el-select>
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
import {getAllindustryData, getCompanyDetail, getCurrentCompany} from "@/api/service/service";
import {listJobsAll} from "@/api/baseconfig/jobs";

export default {
  name: "companydetail",
  dicts: ['sys_yes_no', 'base_company_approve_status','sys_company_job_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      winOpen:false,
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
      jobsList:[],
      industryList:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyId:null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    const companyId = this.$route.query && this.$route.query.id;
    this.getCompanyData(companyId);
    this.getIndustryData();
  },
  methods: {
    /** 查询待审核公司列表 */
    getCompanyData(id) {
      this.loading = true;
      getCompanyDetail(id).then(response => {
        this.companyData = response.data;
        this.loading = false;
        this.getCompanyJobsData();
      });
    },

    getIndustryData(){
      getAllindustryData().then(response => {
        this.industryList = response.data;
      });
    },


    getCompanyJobsData() {
      this.loading = true;
      this.queryParams.companyId=this.companyData.id;
      listJobsAll(this.queryParams).then(response => {
        this.jobsList = response.rows;
        this.total=response.total
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
        industry: null
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
    handleEditFun() {
      this.reset();
      this.open=true;
      this.form.id=this.companyData.id;
      this.form.industry=this.companyData.industry;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCompany(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getCompanyData(this.form.id);
            });
          } else {
            this.$modal.msgError("参数错误");
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
</style>
