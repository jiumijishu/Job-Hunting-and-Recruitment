<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
      <el-form-item label="类型  1工资" prop="typeUnit">
        <el-input
          v-model="queryParams.typeUnit"
          placeholder="请输入类型  1工资"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="typeName">
        <el-input
          v-model="queryParams.typeName"
          placeholder="请输入类型"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最小" prop="minValue">
        <el-input
          v-model="queryParams.minValue"
          placeholder="请输入最小"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最大值" prop="maxValue">
        <el-input
          v-model="queryParams.maxValue"
          placeholder="请输入最大值"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="字符串" prop="rangeStr">
        <el-input
          v-model="queryParams.rangeStr"
          placeholder="请输入字符串"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="排序" prop="sortNo">
        <el-input
          v-model="queryParams.sortNo"
          placeholder="请输入排序"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['baseconfig:rangeconfig:add']"
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
          v-hasPermi="['baseconfig:rangeconfig:edit']"
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
          v-hasPermi="['baseconfig:rangeconfig:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['baseconfig:rangeconfig:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" border :data="rangeconfigList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="类型  1工资" align="center" prop="typeUnit" />
      <el-table-column label="类型" align="center" prop="typeName" />
      <el-table-column label="最小" align="center" prop="minValue" />
      <el-table-column label="最大值" align="center" prop="maxValue" />
      <el-table-column label="字符串" align="center" prop="rangeStr" />
      <el-table-column label="排序" align="center" prop="sortNo" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['baseconfig:rangeconfig:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['baseconfig:rangeconfig:remove']"
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

    <!-- 添加或修改区间设置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="650px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类型  1工资" prop="typeUnit">
          <el-input v-model="form.typeUnit" placeholder="请输入类型  1工资" />
        </el-form-item>
        <el-form-item label="类型" prop="typeName">
          <el-input v-model="form.typeName" placeholder="请输入类型" />
        </el-form-item>
        <el-form-item label="最小" prop="minValue">
          <el-input v-model="form.minValue" placeholder="请输入最小" />
        </el-form-item>
        <el-form-item label="最大值" prop="maxValue">
          <el-input v-model="form.maxValue" placeholder="请输入最大值" />
        </el-form-item>
        <el-form-item label="字符串" prop="rangeStr">
          <el-input v-model="form.rangeStr" placeholder="请输入字符串" />
        </el-form-item>
        <el-form-item label="排序" prop="sortNo">
          <el-input v-model="form.sortNo" placeholder="请输入排序" />
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
import { listRangeconfig, getRangeconfig, delRangeconfig, addRangeconfig, updateRangeconfig } from "@/api/baseconfig/rangeconfig";

export default {
  name: "Rangeconfig",
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
      // 区间设置表格数据
      rangeconfigList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        typeUnit: null,
        typeName: null,
        minValue: null,
        maxValue: null,
        rangeStr: null,
        sortNo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询区间设置列表 */
    getList() {
      this.loading = true;
      listRangeconfig(this.queryParams).then(response => {
        this.rangeconfigList = response.rows;
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
        typeUnit: null,
        typeName: null,
        minValue: null,
        maxValue: null,
        rangeStr: null,
        sortNo: null
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
      this.title = "添加区间设置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRangeconfig(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改区间设置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRangeconfig(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRangeconfig(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除区间设置编号为"' + ids + '"的数据项？').then(function() {
        return delRangeconfig(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('baseconfig/rangeconfig/export', {
        ...this.queryParams
      }, `rangeconfig_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
