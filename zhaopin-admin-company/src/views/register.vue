<template>
  <div class="register">
    <div style="margin:30px">

      <img src="../assets/images/yq.png" alt="">
      <img src="../assets/images/i.png" alt="" style="margin:0 20px;">
      <img src="../assets/images/text.png" alt="">
    </div>
    <div class="form">

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item label="公司名称" prop="companyName">
            <el-input  v-model="ruleForm.companyName"></el-input>
          </el-form-item>
          <el-form-item label="公司简称" prop="shortName">
            <el-input  v-model="ruleForm.shortName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="企业组织机构代码" prop="uniformSocialCreditCode">
            <el-input v-model="ruleForm.uniformSocialCreditCode"></el-input>
          </el-form-item>
          <el-form-item label="营业执照" prop="businessLicense">
            <image-upload v-model="ruleForm.businessLicense" :action="uploadImgUrl"/>
          </el-form-item>
          <el-form-item label="联系人" prop="contactName">
            <el-input  v-model="ruleForm.contactName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input v-model.number="ruleForm.contactPhone"></el-input>
          </el-form-item>
<!--          <el-form-item label="招聘证明文件" prop="evidentiaryFile">
            <image-upload v-model="ruleForm.evidentiaryFile" :action="uploadImgUrl"/>
          </el-form-item>-->
<!--          <el-form-item label="主营行业" prop="industry">

            <el-select v-model="ruleForm.industry" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>

            &lt;!&ndash; <el-input v-model.number="ruleForm.industry"></el-input> &ndash;&gt;
          </el-form-item>-->

        <el-form-item label="主营行业" prop="industry">
          <el-select v-model="ruleForm.industryData" placeholder="请选择" value-key="id" style="width:350px" clearable>
            <el-option-group
              v-for="group in jobsTypeDataList"
              :key="group.id"
              :label="group.name">
              <el-option
                v-for="item in group.childList"
                :key="item.id"
                :label="item.name"
                :value="item">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>


          <h5 style="padding-left:200px;color: red">
            <span>如果您提交的公司已经存在，系统将会重新进行审核！</span>
          </h5>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交入驻信息</el-button>
            <router-link class="link-type" style="margin-left:6px;" :to="'/login'">使用已有帐号登录</router-link>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {register, queryIndustryData, queryIndustryById} from "@/api/login";


export default {
  name: "Register",
  data() {
    const validateCompanyName = (rule, value, callback) => {
        if(value==""){
          return callback(new Error('不能为空'));
        }else{
          callback();
        }
      };
      const validateShortName = (rule, value, callback) => {
        if(value==""){
          return callback(new Error('不能为空'));
        }else{
          callback();
        }
      };
      const validateBusinessLicense = (rule, value, callback) => {
        if(value==""){
          return callback(new Error('不能为空'));
        }else{
          callback();
        }
      };
      const creditCode = (rule, value, callback) => {
        if(value==""){
          return callback(new Error('不能为空'));
        }else{
          callback();
        }
      };
      const validateContactName = (rule, value, callback) => {
        if(value==""){
          return callback(new Error('不能为空'));
        }else{
          callback();
        }
      };


      const vcontactPhone = (rule, value, callback) => {
        const res=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if(value==""){
          return callback(new Error('不能为空'));
        }else if(!res.test(value)){
          return callback(new Error('手机号格式错误'));
        }else{
          callback();
        }
      };
      const vevidentiaryFile = (rule, value, callback) => {
        if(value==""){
          return callback(new Error('不能为空'));
        }else{
          callback();
        }
      };


    return {
      jobsTypeDataList: [],
      uploadImgUrl:process.env.VUE_APP_BASE_API + "/api/noAuth/upload",
      ruleForm: {
        companyName:'',
        shortName:'',
        businessLicense:'',
        uniformSocialCreditCode:'',
        contactName:'',
        contactPhone:'',
        evidentiaryFile:'',
        industry:'',
        industryData:'',
        },
        rules: {
          companyName: [
            { validator: validateCompanyName, trigger: 'blur' }
          ],
          shortName: [
            { validator: validateShortName, trigger: 'blur' }
          ],
          businessLicense: [
            { validator: validateBusinessLicense, trigger: 'blur' }
          ],
          uniformSocialCreditCode: [
            { required: true, message: '请填写企业信用代码', trigger: 'blur' }
          ],
          contactName: [
            { validator: validateContactName, trigger: 'blur' }
          ],
          contactPhone: [
            { validator: vcontactPhone, trigger: 'blur' }
          ],
         /* evidentiaryFile: [
            { validator: vevidentiaryFile, trigger: 'blur' }
          ],*/
          industryData: [
            { required: true, message: '请选择主营行业', trigger: 'change' }
          ],
        },
        // 图片
        imageUrl1: '',
        imageUrl2: '',
        // 行业 value,label
        options: [],
    };
  },
  created() {

    this.queryIndustryData();
    this.getJobTypeDataList();
  },
  methods: {
    init(){
      this.ruleForm= {
        companyName:'',
        shortName:'',
        businessLicense:'',
        uniformSocialCreditCode:'',
        contactName:'',
        contactPhone:'',
        evidentiaryFile:'',
        industry:''
        }
    },

    getJobTypeDataList() {
      queryIndustryById().then(response => {
        this.jobsTypeDataList = response.data;
      });
    },

      // 行业列表
      queryIndustryData(){
        queryIndustryData().then(res=>{
          this.options=res.data;
        }).catch(err=>{
          console.log("错误",err)
        })
      },
      // 提交入驻信息
      submitForm(ruleForm){
        console.log(this.$refs,this.ruleForm)
        this.$refs[ruleForm].validate((valid) => {
          if(valid) {
            this.ruleForm.industry=this.ruleForm.industryData.name;
            register(this.ruleForm).then(res=>{
              console.log(res)
              this.init()
              this.$modal.msgError("提交成功，请耐心等待审核");
              window.location='/login';
            }).catch(err=>{
              console.log(err)
            })
          }else{
            this.$modal.msgError("表单填写错误");
            return false;
          }
        });


      }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // height: 100%;
  // background-color: #fff;
  background-image: url("../assets/images/BG.png");
  background-size: cover;
}
::v-deep .el-input__inner{
  height: 46px;
    width: 400px;
    border-radius: 0;
    background-color: rgb(255, 255, 255,0.7);
}
::v-deep .el-form-item__label{
  height:46px;
  line-height: 46px;
  font-weight: 500;
  font-size: 16px;
}
::v-deep .el-form-item__label::before{
  content: "*";
  color:#F56E7F;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    border: 1px dashed #C4C8D0;
    background-color: rgb(255, 255, 255,0.7);
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
