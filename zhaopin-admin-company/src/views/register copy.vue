<template>
  <div class="register">
    <!-- 头部 -->
    <!-- <div class="head">
      <img src="../assets/images/yaoqi.png" alt="" srcset="">
      <img src="../assets/images/i.png" alt="" srcset="" style="margin:0 20px">
      <img src="../assets/images/text.png" alt="" srcset="">
    </div>
    <div class="bgStyle">

          <div class="image"   v-loading="load">
          <el-carousel height="440px" indicator-position="none" arrow="never">
            <el-carousel-item v-for="item in advertisement" :key="item.id">
              <img :src="item.image" alt="" style="height:100%;width:100%;">
            </el-carousel-item>
          </el-carousel>
        </div>

    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form">
      <h3 class="title">九米招聘企业管理</h3>
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleRegister"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          auto-complete="off"
          placeholder="确认密码"
          @keyup.enter.native="handleRegister"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="registerForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleRegister"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="register-code">
          <img :src="codeUrl" @click="getCode" class="register-code-img"/>
        </div>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleRegister"
        >
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <div style="float: right;">
          <router-link class="link-type" :to="'/login'">使用已有账户登录</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div> -->
    <!--  底部  -->
    <!-- <div class="el-register-footer">
      <span>Copyright © 2018-2022 ruoyi.vip All Rights Reserved.</span>
    </div> -->
    <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCodeImg, register ,getAdvertisingList} from "@/api/login";

export default {
  name: "Register",
  data() {
    // const equalToPassword = (rule, value, callback) => {
    //   if (this.registerForm.password !== value) {
    //     callback(new Error("两次输入的密码不一致"));
    //   } else {
    //     callback();
    //   }
    // };
    var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },



      // 首页广告
      advertisement:[],
      load:true,
      codeUrl: "",
      // registerForm: {
      //   username: "",
      //   password: "",
      //   confirmPassword: "",
      //   code: "",
      //   uuid: ""
      // },
      // registerRules: {
      //   username: [
      //     { required: true, trigger: "blur", message: "请输入您的账号" },
      //     { min: 2, max: 20, message: '用户账号长度必须介于 2 和 20 之间', trigger: 'blur' }
      //   ],
      //   password: [
      //     { required: true, trigger: "blur", message: "请输入您的密码" },
      //     { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
      //   ],
      //   confirmPassword: [
      //     { required: true, trigger: "blur", message: "请再次输入您的密码" },
      //     { required: true, validator: equalToPassword, trigger: "blur" }
      //   ],
      //   code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      // },
      loading: false,
      captchaEnabled: true
    };
  },
  created() {
    this.getCode();
    this.getAdvertisingList()
  },
  methods: {
       // 首页广告
       getAdvertisingList(){
      getAdvertisingList().then(res=>{
      this.load=false;
        console.log("首页广告",res)
        this.advertisement=res.data;
      }).catch(err=>{
        console.log(err)
      })
    },
    getCode() {
      getCodeImg().then(res => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.registerForm.uuid = res.uuid;
        }
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true;
          register(this.registerForm).then(res => {
            const username = this.registerForm.username;
            this.$alert("<font color='red'>恭喜你，您的账号 " + username + " 注册成功！</font>", '系统提示', {
              dangerouslyUseHTMLString: true,
              type: 'success'
            }).then(() => {
              this.$router.push("/login");
            }).catch(() => {});
          }).catch(() => {
            this.loading = false;
            if (this.captchaEnabled) {
              this.getCode();
            }
          })
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff;
  // background-image: url("../assets/images/login-background.jpg");

  background-size: cover;
}
.head{
  display: flex;
  align-items: center;
  margin-bottom: 30px;

}
.bgStyle{
  display: flex;
  align-items: center;
  justify-content: center;

}
.image{
width:600px;
height:440px;
background-color: #fff;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.register-form {
  border-radius:0 6px 6px 0;
  background: #ffffff;
  width: 400px;
  height:440px;
  padding: 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.register-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-register-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.register-code-img {
  height: 38px;
}
</style>
