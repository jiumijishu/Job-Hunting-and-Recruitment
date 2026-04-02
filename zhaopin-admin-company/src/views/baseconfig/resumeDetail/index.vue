<template>
  <div class="app-container">
    <el-container>
      <el-aside width="70%" style="padding:20px;" v-show="resumeData.type===2">
        <PdfFileView :src="resumeData.pdfBase64"></PdfFileView>
      </el-aside>
      <el-aside width="70%" style="padding:48px;" v-show="resumeData.type!=2">

        <el-row>
          <el-col :span="20">
            <h2>{{resumeData.userName}}</h2>
            <div style="font-size:18px;">
              <span>{{resumeData.educationList ?resumeData.educationList[0].schoolName:''}}</span>&nbsp;
              <span>{{resumeData.educationList ?resumeData.educationList[0].major:''}}</span>
              <span v-if="resumeData.educationList">-</span>
              <span>{{resumeData.educationList ?resumeData.educationList[0].education:''}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div>
              <el-image
                style="width: 110px; height: 152px;margin-top:10px "
                :src="resumeData.avatar"
                fit="fit"></el-image>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <h2>个人优势</h2>
          <div>
            {{resumeData.advantage}}
          </div>
        </el-row>
        <el-row>
          <h2 class="h-2">工作&实习经历</h2>
          <div v-for="work in resumeData.experienceList" class="work-box">
            <el-row >
              <el-col :span="4" class="elCol">
                <div style="font-weight: bold">{{work.companyName}}</div>
              </el-col>
              <el-col :span="20">
                <div>{{work.startDate+'~'+work.endDate}}</div>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="4">
                <div class="textColor">职位名称</div>
              </el-col>
              <el-col :span="20">
                <div>{{ work.postName }}</div>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="4">
                <div class="textColor">工作内容</div>
              </el-col>
              <el-col :span="20">
                <div>{{ work.workContent }}</div>
              </el-col>
            </el-row>
          </div>
        </el-row>

        <el-row>
          <h2>教育经历</h2>
          <div v-for="work in resumeData.educationList" class="work-box">
            <el-row >
              <el-col :span="4"  class="elCol">
                <div style="font-weight: bold">{{work.schoolName}}</div>
              </el-col>
              <el-col :span="20">
                <div>{{work.education+'-'+work.major}}&nbsp;&nbsp;&nbsp;{{work.startDate+'~'+work.endDate}}</div>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="4">
                <div class="textColor">在校经历</div>
              </el-col>
              <el-col :span="20">
                <div>{{ work.experience }}</div>
              </el-col>
            </el-row>
          </div>
        </el-row>

        <el-row>
          <h2>项目经历</h2>
          <div v-for="work in resumeData.projectList" class="work-box">
            <el-row >
              <el-col :span="4"  class="elCol">
                <div style="font-weight: bold">{{work.projectName}}</div>
              </el-col>
              <el-col :span="20">
                <div>{{work.startDate+'~'+work.endDate}}</div>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="4">
                <div class="textColor">项目描述</div>
              </el-col>
              <el-col :span="20">
                <div>{{ work.projectContent }}</div>
              </el-col>
            </el-row>
          </div>
        </el-row>

        <el-row>
          <h2>职业技能证书</h2>
          <div v-for="work in resumeData.certList" class="work-box">
            <el-row >
              <el-col :span="4"  class="elCol">
                <div style="font-weight: bold">{{work.certificateName}}</div>
              </el-col>
              <el-col :span="20">
                <div>{{work.inceptDate+'获得'}}</div>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-aside>

      <el-main  style="padding-left:40px; min-width:296px;">
        <el-row>
          <el-col :span="6">
            <div>
              <el-image
                style="width: 60px; height: 60px;margin-top:10px "
                :src="resumeData.avatar"
                fit="fit"></el-image>
            </div>
          </el-col>
          <el-col :span="18" style="line-height:25px;padding-top:6px">
            <div>
             <span style="font-size:18px;"> {{resumeData.userName}} </span>&nbsp;&nbsp;&nbsp;
              <span style="color:gray;font-size: 15px;">{{resumeData.educationList ?resumeData.educationList[0].education:''}}·{{resumeData.age?resumeData.age+'岁':''}}</span></div>
            <div  style="color:gray;font-size: 15px; margin-top:10px;">
              <span>{{resumeData.educationList ?resumeData.educationList[0].schoolName:''}}</span>&nbsp;
              <span>{{resumeData.educationList ?resumeData.educationList[0].major:''}}</span>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div style="line-height:30px;"><span style="color:gray;">投递职位：</span><span>{{applyData.jobName}}</span></div>
        <div style="line-height:30px;"><span style="color:gray;">当前状态：</span><span style="color:#3894FF">{{applyData.applyStatusLabel}}</span></div>
        <div style="line-height:30px;color:gray;"><span>处理意见：</span></div>
        <div style="margin:10px;font-size:18px;">
          <el-radio-group v-model="form.approveStatus" v-show="applyData.applyStatus==='01'">
            <el-radio label="02" style="margin-top:10px">继续沟通</el-radio><br/>
            <el-radio label="04" style="margin-top:10px">邀请面试</el-radio><br/>
            <el-radio label="03" style="margin-top:10px">不合适，不再沟通</el-radio>
          </el-radio-group>
          <el-radio-group v-model="form.approveStatus" v-show="applyData.applyStatus==='02'">
            <el-radio label="04" style="margin-top:10px">邀请面试</el-radio><br/>
            <el-radio label="03" style="margin-top:10px">不合适，不再沟通</el-radio>
            <el-radio label="05" style="margin-top:10px">确认录用</el-radio><br/>
          </el-radio-group>
          <el-radio-group v-model="form.approveStatus" v-show="applyData.applyStatus==='04'">
            <el-radio label="05" style="margin-top:10px">面试通过</el-radio><br/>
            <el-radio label="06" style="margin-top:10px">面试未通过</el-radio>
            <el-radio label="03" style="margin-top:10px">不合适</el-radio><br/>
          </el-radio-group>
        </div>
        <div>
          <div style="line-height:30px;margin-top:30px;color:gray;">备注:</div>
          <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
        </div>
        <div style="text-align: center;margin-top:40px;">
          <el-button
            style="width:100%;"
            type="primary"
            size="medium"
            :disabled="!form.approveStatus"
            @click="submitForm"
            icon="el-icon-check"
          >提交</el-button>
        </div>
        <el-divider></el-divider>
        <div style="line-height:25px;">
          <h3 >处理记录</h3>
          <div style="margin-top:15px;" v-for="log in logsList">
            <div>{{log.createTime}}</div>
            <div style="font-weight: bold">
              <el-descriptions title="">
                <el-descriptions-item label="处理意见">{{log.content}}</el-descriptions-item>
                <el-descriptions-item label="操作人"><i class="el-icon-user-solid"></i>{{log.createBy}}</el-descriptions-item>
              </el-descriptions>
             </div>
            <div v-if="log.remark">{{log.remark}}</div>
          </div>
        </div>
      </el-main>
    </el-container>




  </div>
</template>

<script>
import {getUserResumeData,approveResume} from "@/api/service/service";
import PdfFileView from '@/components/PdfFileView';
export default {
  name: "resumeDetail",
  dicts: ['sys_yes_no','base_job_apply_status'],
  components:{PdfFileView},
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
      // 求职简历表格数据
      resumeList: [],
      resumeData: {},
      applyData: {},
      logsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        title: null,
        type: null,
        advantage: null,
        resumeUrl: null,
        defaultFlag: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    const applyId = this.$route.query && this.$route.query.id;
    this.getResumeData(applyId);
  },
  methods: {
    /** 查询求职简历列表 */
    getResumeData(id) {
      this.loading = true;
      getUserResumeData(id).then(response => {
        this.resumeData = response.data;
        this.applyData = response.applyData;
        this.logsList = response.logsData;
        this.form.id=this.applyData.id;
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
        approveStatus: null,
        remark: null
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
    /** 提交按钮 */
    submitForm() {
      if(!this.form.id){
        this.$modal.msgError("数据有误，请联系管理员");
      }
      if(!this.form.approveStatus){
        this.$modal.msgError("请选择处理意见");
      }
      approveResume(this.form).then(response => {
        this.$modal.msgSuccess("修改成功");
        this.getList();
      });
    }
  }
};
</script>
<style>
.work-box{
  margin-bottom:20px;
}
.h-2{
margin:50px 0 20px 0;
}
.elCol{
  padding-right: 20px;
}
.textColor{
color:gray

}
</style>
