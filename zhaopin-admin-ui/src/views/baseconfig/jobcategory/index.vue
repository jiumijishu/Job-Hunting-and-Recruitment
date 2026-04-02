<template>
  <div class="app-container">

    <el-container>
      <el-aside width="30%" style="overflow:hidden; background-color: #FFFFFF;">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              v-hasPermi="['baseconfig:jobcategory:add']"
            >添加分类</el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" ref="singleTable" highlight-current-row border :data="jobcategoryList"  @current-change="handleCurrentChange">
          <el-table-column label="ID" align="center" prop="categoryId" />
          <el-table-column label="分类名称" align="center" prop="categoryName" />
          <el-table-column label="排序" align="center" prop="sortNo" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['baseconfig:jobcategory:edit']"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['baseconfig:jobcategory:remove']"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-main>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5" style="float: right">
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleTypeAdd"
              v-hasPermi="['baseconfig:jobtype:add']"
            >添加职位类型</el-button>
          </el-col>
        </el-row>
        <el-table ref="jobTypeTable" v-loading="jobLoading" border :data="jobtypeList">
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="分类名称" align="center" prop="categoryName" />
          <el-table-column label="职位类型" align="center" prop="typeName" />
          <el-table-column label="职位简述" align="center" prop="introduction" show-tooltip-when-overflow/>
          <el-table-column label="职位标签" align="center" prop="lables" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleTypeUpdate(scope.row)"
                v-hasPermi="['baseconfig:jobtype:edit']"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleTypeDelete(scope.row)"
                v-hasPermi="['baseconfig:jobtype:remove']"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <!-- 添加或修改岗位类型对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="650px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="form.categoryName" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="序号" prop="sortNo">
          <el-input-number  :min="0" v-model="form.sortNo" placeholder="请输入序号" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="typeTitle" :visible.sync="typeOpen" width="650px" append-to-body :close-on-click-modal="false">
      <el-form ref="typeForm" :model="typeForm" :rules="typeRules" label-width="80px">
        <el-form-item label="职位分类" prop="categoryName">
          <el-input v-model="typeForm.categoryName" placeholder="请输入职位分类" disabled/>
        </el-form-item>
        <el-form-item label="职位类型" prop="typeName">
          <el-input v-model="typeForm.typeName" placeholder="请输入职位类型" />
        </el-form-item>
        <el-form-item label="职位简述" prop="introduction">
          <el-input v-model="typeForm.introduction" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="职位标签" prop="lables">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
        </el-form-item>
        <el-form-item label="职位介绍">
          <editor v-model="typeForm.details" :min-height="192"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="typeSubmitForm">确 定</el-button>
        <el-button @click="typeCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listJobcategory, getJobcategory, delJobcategory, addJobcategory, updateJobcategory } from "@/api/baseconfig/jobcategory";
import {addJobtype, delJobtype, getJobtype, listJobtype, updateJobtype} from "@/api/baseconfig/jobtype";

export default {
  name: "Jobcategory",
  data() {
    return {
      // 遮罩层
      loading: false,
      jobLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      currentRow:{},
      // 总条数
      total: 0,
      // 岗位类型表格数据
      jobcategoryList: [],
      jobtypeList: [],
      // 弹出层标题
      title: "",
      typeTitle: "",
      // 是否显示弹出层
      open: false,
      typeOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        categoryName: null,
      },
      // 表单参数
      form: {},
      typeForm: {},
      typeRules: {},
      // 表单校验
      rules: {
        categoryName: [
          { required: true, message: "类型名称不能为空", trigger: "blur" }
        ],
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询岗位类型列表 */
    getList() {
      this.loading = true;
      listJobcategory(this.queryParams).then(response => {
        this.jobcategoryList = response.data;
        this.jobtypeList= [];
        this.currentRow=this.jobcategoryList[0];
        this.$refs.singleTable.setCurrentRow(this.currentRow);
        this.getJobTypeList();
        this.total = response.total;
        this.loading = false;
      });
    },

    getJobTypeList() {
      this.jobLoading = true;
      let param={
        categoryId:this.currentRow?this.currentRow.categoryId:-1
      }
      listJobtype(param).then(response => {
        this.jobtypeList = response.data;
        this.jobLoading = false;
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
        categoryId: null,
        categoryName: null,
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
      this.ids = selection.map(item => item.categoryId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加岗位类型";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const categoryId = row.categoryId || this.ids
      getJobcategory(categoryId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改岗位类型";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.categoryId != null) {
            updateJobcategory(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addJobcategory(this.form).then(response => {
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
      const categoryIds = row.categoryId || this.ids;
      this.$modal.confirm('是否确认删除岗位类型编号为"' + categoryIds + '"的数据项？').then(function() {
        return delJobcategory(categoryIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('baseconfig/jobcategory/export', {
        ...this.queryParams
      }, `jobcategory_${new Date().getTime()}.xlsx`)
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      this.getJobTypeList();

    },
    handleTypeAdd() {
      if(!this.currentRow.categoryId){
        this.$modal.msgError("请选择职位分类");
        return false;
      }
      this.typeReset();
      this.typeOpen = true;
      this.typeTitle = "添加职位类型";
      this.typeForm.categoryId=this.currentRow.categoryId;
      this.typeForm.categoryName=this.currentRow.categoryName;
    },

    typeReset() {
      this.typeForm = {
        id: null,
        categoryId: null,
        categoryName: null,
        typeName: null,
        introduction: null,
        lables: null,
        details: null,
        createTime: null,
        createBy: null
      };
      this.dynamicTags=[];
      this.resetForm("typeForm");
    },
    /** 修改按钮操作 */
    handleTypeUpdate(row) {
      this.typeReset();
      const id = row.id || this.ids
      getJobtype(id).then(response => {
        this.typeForm = response.data;
        this.typeOpen = true;
        this.typeTitle = "修改职位分类";
        this.dynamicTags=this.typeForm.lables?this.typeForm.lables.split(','):[];
      });
    },
    /** 提交按钮 */
    typeSubmitForm() {
      this.$refs["typeForm"].validate(valid => {
        if (valid) {
          this.typeForm.lables=this.dynamicTags.join(',')
          if (this.typeForm.id != null) {
            updateJobtype(this.typeForm).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.typeOpen = false;
              this.getJobTypeList();
            });
          } else {
            addJobtype(this.typeForm).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.typeOpen = false;
              this.getJobTypeList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleTypeDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除职位分类编号为"' + ids + '"的数据项？').then(function() {
        return delJobtype(ids);
      }).then(() => {
        this.getJobTypeList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    typeCancel() {
      this.typeOpen = false;
      this.typeReset();
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
