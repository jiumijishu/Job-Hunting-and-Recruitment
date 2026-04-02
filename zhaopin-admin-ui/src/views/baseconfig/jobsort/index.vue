<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
      <el-form-item label="职位类型名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入职位类型名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否显示" prop="availableFlag">
        <el-select v-model="queryParams.availableFlag" placeholder="请选择职位状态" clearable>
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
          v-hasPermi="['baseconfig:jobsort:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          size="mini"
          @click="toggleExpandAll"
        >展开/折叠</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="industryList"
      row-key="id"
      :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="职位类型名称" :show-overflow-tooltip="true" width="160"></el-table-column>
      <el-table-column label="职位类型标签" align="center" prop="lables" />
      <el-table-column label="职位类型简述" align="center" prop="introduction"  show-tooltip-when-overflow/>
      <el-table-column label="是否显示" align="center" prop="availableFlg">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.availableFlag"/>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="sortNo" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:industry:add']"
          >新增</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['baseconfig:jobsort:edit']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDisableFun(scope.row)"
            v-hasPermi="['baseconfig:jobsort:edit']"
          >{{scope.row.availableFlag==='Y'?'隐藏':'显示'}}</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['baseconfig:jobsort:remove']"
          >删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 添加或修改职位分类信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="680px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>

          <el-form-item label="上级行业" prop="parentId">
            <treeselect
              v-model="form.parentId"
              :options="menuOptions"
              :normalizer="normalizer"
              :show-count="true"
              placeholder="选择上级职位"
            />
          </el-form-item>

          <el-form-item label="职位类型名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入职位类型名称" />
          </el-form-item>

          <el-form-item label="职位简述" prop="introduction">
            <el-input v-model="form.introduction" type="textarea" placeholder="请输入内容" />
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
            <editor v-model="form.details" :min-height="192"/>
          </el-form-item>

          <el-form-item label="序号" prop="sortNo">
            <el-input-number  :min="0" v-model="form.sortNo" placeholder="请输入序号" controls-position="right"/>
          </el-form-item>


        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { listJobsort, getJobsort, delJobsort, addJobsort, updateJobsort } from "@/api/baseconfig/jobsort";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";

export default {
  name: "Jobsort",
  dicts: ['sys_yes_no'],
  components: { Treeselect, IconSelect },
  data() {
    return {
      // 遮罩层
      loading: true,
      companyLoading: false,
      // 显示搜索条件
      showSearch: true,
      // 菜单表格树数据
      industryList: [],
      // 总条数
      total: 0,
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      companyOpen: false,
      // 是否展开，默认全部折叠
      isExpandAll: false,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        name: undefined,
        availableFlag: undefined
      },


      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "职位类型名称不能为空", trigger: "blur" }
        ],
        sortNo: [
          { required: true, message: "排序编号不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询菜单列表 */
    getList() {
      this.loading = true;
      listJobsort(this.queryParams).then(response => {
        this.industryList = this.handleTree(response.data, "id");
        this.loading = false;
      });
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      listJobsort().then(response => {
        this.menuOptions = [];
        const menu = { id: 0, name: '主职位', children: [] };
        menu.children = this.handleTree(response.data, "id");
        this.menuOptions.push(menu);
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
        parentId: 0,
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
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      if (row != null && row.id) {
        this.form.parentId = row.id;
      } else {
        this.form.parentId = 0;
      }
      this.open = true;
      this.title = "添加职位";
      this.dynamicTags=[];
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },

    handleDisableFun(row){
      let param={
        id:row.id,
        availableFlag:row.availableFlag==='Y'?'N':'Y'
      }
      let title=row.availableFlag==='Y'?'是否确认隐藏【'+row.name+'】?':'是否确认显示【'+row.name+'】?'
      this.$modal.confirm(title).then(function() {
        return updateJobsort(param);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("操作成功");
      }).catch(() => {});
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
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      getJobsort(row.id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改职业";
        this.dynamicTags=this.form.lables?this.form.lables.split(','):[];
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.lables=this.dynamicTags.join(',');
          if (this.form.id != undefined) {
            updateJobsort(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addJobsort(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除名称为"' + row.name + '"的数据项？').then(function() {
        return delJobsort(row.id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
  }
};
</script>
