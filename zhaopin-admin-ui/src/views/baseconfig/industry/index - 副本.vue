<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
      <el-form-item label="行业名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入行业名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否可用" prop="availableFlag">
        <el-select v-model="queryParams.availableFlag" placeholder="请选择行业状态" clearable>
          <el-option
            v-for="dict in dict.type.sys_yes_no"
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['baseconfig:industry:add']"
        >新增</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>


    <el-table v-loading="loading" border :data="industryList" @selection-change="handleSelectionChange">
      <el-table-column label="排序" align="center" prop="sortNo" />
        <el-table-column label="行业名称" align="center" prop="name" />
        <el-table-column label="行业图标" align="center" prop="iconImg" width="100">
          <template slot-scope="scope">
            <image-preview :src="scope.row.iconImg" :width="50" :height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="对口专业" align="center" prop="profession" />
        <el-table-column label="推荐企业" align="center" prop="companyNum" />
        <el-table-column label="最近更新时间" align="center" prop="updateTime" />
        <el-table-column label="是否可用" align="center" prop="availableFlag">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.availableFlag"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['baseconfig:industry:edit']"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleDisableFun(scope.row)"
              v-hasPermi="['baseconfig:industry:edit']"
            >{{scope.row.availableFlag==='Y'?'禁用':'恢复'}}</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-share"
              @click="handleRefferrer(scope.row)"
              v-hasPermi="['baseconfig:industry:edit']"
            >推荐企业</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['baseconfig:industry:remove']"
            >删除</el-button>
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

    <!-- 添加或修改行业信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="650px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="行业名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入行业名称" />
        </el-form-item>
        <el-form-item label="行业图标">
          <image-upload v-model="form.iconImg"/>
        </el-form-item>
        <el-form-item label="对口专业" prop="profession">
          <el-input v-model="form.profession" placeholder="请输入对口专业" />
        </el-form-item>
        <el-form-item label="行业介绍">
          <editor v-model="form.introduction" :min-height="192"/>
        </el-form-item>
        <el-form-item label="排序编号" prop="sortNo">
          <el-input-number v-model="form.sortNo" placeholder="请输入排序编号" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog title="设置推荐企业" :visible.sync="companyOpen" width="750px" append-to-body :close-on-click-modal="false">
      <el-table v-loading="companyLoading" border :data="industrycompanyrelaList" height="450">
        <el-table-column label="排序" align="center" prop="sortNo" />
        <el-table-column label="公司名称" align="center" prop="companyName" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handlesetSort(scope.row)"
              v-hasPermi="['baseconfig:industry:edit']"
            >设置排序</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDeleteRela(scope.row)"
              v-hasPermi="['baseconfig:industry:remove']"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="companyTotal>0"
        :total="companyTotal"
        :page.sync="companyParams.pageNum"
        :limit.sync="companyParams.pageSize"
        @pagination="getReferrerCompanyList"
      />
      <el-row style="margin-top:30px;">
        <el-form ref="companyForm" :model="companyForm" :rules="companyRules" label-width="80px">
          <el-form-item label="公司名称" prop="companyId">
            <el-select
              v-model="companyForm.companyId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入公司名称"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in companyData"
                :key="item.id"
                :label="item.companyName"
                :value="item.id">
              </el-option>
            </el-select>
            <el-button type="primary" @click="submitCompanyForm" style="margin-left:10px">添 加</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCompany">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listIndustry, getIndustry, delIndustry, addIndustry, updateIndustry } from "@/api/baseconfig/industry";
import {
  addIndustrycompanyrela, delIndustrycompanyrela,
  listIndustrycompanyrela,
  updateIndustrycompanyrela
} from "@/api/baseconfig/industrycompanyrela";
import {getMarkCompanyData} from "@/api/baseconfig/benchmark";

export default {
  name: "Industry",
  dicts: ['sys_yes_no'],
  data() {
    return {
      // 遮罩层
      loading: true,
      companyLoading: false,
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
      companyTotal: 0,
      // 行业信息表格数据
      industrycompanyrelaList: [],
      industryList: [],
      companyData: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      companyOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        iconImg: null,
        availableFlag: null,
        profession: null,
        introduction: null,
        sortNo: null,
      },
      companyParams: {
        pageNum: 1,
        pageSize: 10,
        industryId: null
      },
      // 表单参数
      form: {},
      companyForm:{},
      companyRules:{
        companyId: [
          { required: true, message: "请选择推荐企业", trigger: "blur" }
        ]
      },
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询行业信息列表 */
    getList() {
      this.loading = true;
      listIndustry(this.queryParams).then(response => {
        this.industryList = response.rows;
        this.total = response.total;
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
        name: null,
        iconImg: null,
        availableFlag: "Y",
        profession: null,
        introduction: null,
        sortNo: null,
        createTime: null
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
      this.title = "添加行业信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getIndustry(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改行业信息";
      });
    },

    handleDisableFun(row){
      let param={
        id:row.id,
        availableFlag:row.availableFlag==='Y'?'N':'Y'
      }
      let title=row.availableFlag==='Y'?'是否确认禁用【'+row.name+'】?':'是否确认恢复【'+row.name+'】?'
      this.$modal.confirm(title).then(function() {
        return updateIndustry(param);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("操作成功");
      }).catch(() => {});
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateIndustry(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addIndustry(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除行业信息编号为"' + ids + '"的数据项？').then(function() {
        return delIndustry(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('baseconfig/industry/export', {
        ...this.queryParams
      }, `industry_${new Date().getTime()}.xlsx`)
    },

    handleRefferrer(row){
      this.companyOpen=true
      this.companyForm={
        companyId:null,
        industryId:null
      }
      this.companyParams.industryId=row.id
      this.getReferrerCompanyList();
    },
    cancelCompany(){
      this.companyOpen=false
    },
    getReferrerCompanyList() {
      this.companyLoading=true;
      listIndustrycompanyrela(this.companyParams).then(response => {
        this.industrycompanyrelaList = response.rows;
        this.companyTotal = response.total;
        this.companyLoading = false;
      });
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          getMarkCompanyData(query).then(response => {
            this.companyData = response.data;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },

    submitCompanyForm(){
      this.$refs["companyForm"].validate(valid => {
        if (valid) {
          this.companyForm.industryId=this.companyParams.industryId;
          if (this.companyForm.companyId != null) {
            addIndustrycompanyrela(this.companyForm).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.getReferrerCompanyList();
            });
          } else {
            this.$modal.msgError("请选择需要推荐的企业");
          }
        }
      });
    },
    handleDeleteRela(row) {
      const ids = row.id;
      this.$modal.confirm('是否确认删除选择数据项？').then(function() {
        return delIndustrycompanyrela(ids);
      }).then(() => {
        this.getReferrerCompanyList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    handlesetSort(row){
        this.$prompt('请输入排序编号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[0-9]*$/,
          inputErrorMessage: '格式不正确'
        }).then(({ value }) => {
          let param={
            id:row.id,
            sortNo:value
          }
          updateIndustrycompanyrela(param).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.getReferrerCompanyList();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
  }
};
</script>
