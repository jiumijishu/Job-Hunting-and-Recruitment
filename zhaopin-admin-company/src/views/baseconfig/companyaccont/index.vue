<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5" offset="22">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >添加账号</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" border :data="companyaccontList">
      <el-table-column label="手机号" align="left" prop="userPhone">
        <template slot-scope="scope">
          <span>{{scope.row.userPhone}}</span>&nbsp;&nbsp;
          <span style="background-color: #99a9bf;font-weight: bold;font-size:18px;color: #FFFFFF;">{{scope.row.isMain==='Y'?'M':''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信号" align="center" prop="weixinNum" />
      <el-table-column label="姓名" align="center" prop="userName" />
      <el-table-column label="备注" align="center" prop="remark" />
<!--      v-show="scope.row.isMain!='Y'"-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            v-show="scope.row.isMain!='Y'"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <el-button
            size="mini"
            type="text"
            v-show="scope.row.isMain!='Y'"
            icon="el-icon-key"
            @click="handleResetPwd(scope.row)"
          >重置密码</el-button>
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

    <!-- 添加或修改公司招聘人员对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="650px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="form.userPhone" placeholder="请输入手机号" :disabled="form.id"/>
        </el-form-item>
        <el-form-item label="微信号" prop="weixinNum">
          <el-input v-model="form.weixinNum" placeholder="请输入微信号" />
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入姓名" :disabled="form.id"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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
import { listCompanyaccont, getCompanyaccont, delCompanyaccont, addCompanyaccont, updateCompanyaccont } from "@/api/baseconfig/companyaccont";
import {getCompanyAccountData} from "@/api/service/service";
import {resetUserPwd} from "@/api/system/user";

export default {
  name: "Companyaccont",
  dicts: ['sys_yes_no'],
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
      // 公司招聘人员表格数据
      companyaccontList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyId: null,
        userId: null,
        userPhone: null,
        weixinNum: null,
        userName: null,
        isMain: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userPhone: [
          { required: true, message: '手机号不能为空', trigger: 'change' }
        ],
        weixinNum: [
          { required: true, message: '微信号号不能为空', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '姓名不能为空', trigger: 'change' }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询公司招聘人员列表 */
    getList() {
      this.loading = true;
      getCompanyAccountData(this.queryParams).then(response => {
        console.log(response.rows)
        this.companyaccontList = response.rows;
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
        companyId: null,
        userId: null,
        userPhone: null,
        weixinNum: null,
        userName: null,
        remark: null,
        isMain: "N",
        status: "Y",
        createTime: null,
        createBy: null
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
      this.title = "添加公司招聘人员";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCompanyaccont(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公司招聘人员";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCompanyaccont(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCompanyaccont(this.form).then(response => {
              console.log(response)
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
      this.$modal.confirm('是否确认删除公司招聘人员编号为"' + ids + '"的数据项？').then(function() {
        return delCompanyaccont(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('baseconfig/companyaccont/export', {
        ...this.queryParams
      }, `companyaccont_${new Date().getTime()}.xlsx`)
    },

    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: "用户密码长度必须介于 5 和 20 之间"
      }).then(({ value }) => {
        resetUserPwd(row.userId, value).then(response => {
          this.$modal.msgSuccess("修改成功，新密码是：" + value);
        });
      }).catch(() => {});
    },
  }
};
</script>
