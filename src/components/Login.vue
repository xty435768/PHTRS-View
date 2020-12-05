
<template>
  <body id="poster">
    <el-form :class="this.active_style?'login-container':'login-container_sign_up'" label-position="left"
           label-width="0px">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="登录" name="sign_in">
        <h3 class="login_title">登录</h3>
        <el-form-item>
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号" class="username_style"></el-input>
        </el-form-item>
        <el-form-item>
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码" class="username_style"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
        <!-- <el-checkbox v-model="remember_me" class="remember_me_style">记住我</el-checkbox> -->
        <el-button type="primary" class="login_button_style" v-on:click="login">登录</el-button>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="注册" name="sign_up">
        <h3 class="login_title">注册</h3>
        <el-form :model="basicSignUpForm" :rules="basic_info_rules" ref="basicSignUpForm" label-width="100px">
          <el-form-item prop="username" label="用户名" class="sign_up_style">
            <el-input placeholder="请输入注册用户名" v-model="basicSignUpForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="用户类型">
            <el-select v-model="basicSignUpForm.type" placeholder="请选择用户类型">
              <el-option
                v-for="item in type_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="新密码" prop="password" class="input_style">
            <el-input v-model="basicSignUpForm.password" placeholder="请输入新密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirm_password" class="input_style">
            <el-input v-model="basicSignUpForm.confirm_password" placeholder="请确认新密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="密码强度">
            <password-strength v-model="basicSignUpForm.password" style="padding-top: 10px;"></password-strength>
          </el-form-item>
        </el-form>
        <el-button style="margin-top: 12px;float: right;" @click="sign_up">注册</el-button>
      </el-tab-pane>
    </el-tabs>
  </el-form>
  </body>
</template>


<script>
  import PasswordStrength from "./common/PasswordStrengthCheck";
  export default {
    name: 'Login',
    components: { PasswordStrength, },
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        
        activeName:"sign_in",
        active_style: true,
        active:0,

        //基本信息表单
        basicSignUpForm:{
          username:'',
          password:'',
          confirm_password:'',
          type:''
        },
        basic_info_rules:{
          username: [{required: true,message: '请输入用户名', trigger: 'blur'}],
          password:[{required:true, message:'创建密码',trigger:'blur'},{ min: 6, max: 20, message: '密码长度须介于6与20之间！', trigger: 'blur' }],
          confirm_password:[{required:true,message:'确认密码',trigger:'blur'},{ validator:(rule,value,callback)=>{
            if(value==='') { callback(new Error('请再次输入密码')) }
            else if(value!==this.basicSignUpForm.password){ callback(new Error('两次输入密码不一致')) }
            else{ callback() }}, trigger:'blur'}],
          type: [{required: true,message: '请选择用户类型', trigger: 'change'}],
        },
        type_options:[
          {value:'citizen',label:'Citizen'},
          {value:'worker',label:'Maintenance worker'},
        ]
      }
    },
    methods: {
      login () {
        console.log(this.loginForm)
        
        //alert("haha")
        this.$axios
          .post('/login', {
            userName: this.loginForm.username,
            password: this.loginForm.password,
          })
          .then(successResponse => {
            if (successResponse.data.isSuccessful === 'true') {
              this.$message({message:'登录成功！',type:'success',center:true,showClose:true})
              window.sessionStorage.setItem('user',this.loginForm.username);
              window.sessionStorage.setItem('user_type',successResponse.data.user_type);
              this.$router.replace({path: '/index'})
            }
            else
            {
              this.$message({message:'登录失败！请检查账号或密码是否正确',type:'error',center:true,showClose:true})
            }
          })
          .catch(failResponse => {
            this.$notify.error({title: '登陆异常！',message: failResponse.message});
          })
      },
      sign_up() {
        if(this.submitFormCheck('basicSignUpForm')) {
          console.log(this.basicSignUpForm)
          this.$axios.post('/register', {
            userName: this.basicSignUpForm.username,
            password: this.basicSignUpForm.password,
            userType: this.basicSignUpForm.type,
          })
            .then(successResponse => {
              if (successResponse.data === 'OK') {
                this.$message({message:'注册成功！请返回登录页面登录！',type:'success',center:true,showClose:true})
              }
              else
              {
                this.$notify.error({title:'注册失败！',message: successResponse.data})
              }
            })
          .catch(failResponse => {
          this.$notify.error({title: '注册异常！',message: failResponse.data});
          })
          }
      },
      handleTabsClick: function (tab, event) {
        //console.log(event)
        if(event.target.getAttribute('id')==="tab-sign_in") this.active_style=true;
        else this.active_style=false;
      },
      submitFormCheck(formName) {
        var result;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(formName+' submit successful!');
            result = true;
          } else {
            console.log(formName+' error submit!!');
            result = false;
          }
        });
        return result;
      },
    
    }
  }
</script>

<style>
  #poster {
    /* background:url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602591084969&di=4d48c247ed1f1b1a8ea4cb72979e2df4&imgtype=0&src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F646%2F311%2F178%2Fe2a0d127977b4e5b9c4094cbeb80c253.jpg") no-repeat; */
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  #app{
    text-align:left;
  }
  body{
    margin: 0px;
  }

  .login-container {
    border-radius: 30px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 15px 35px 30px 35px;
    background: #ffffff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login-container_sign_up {
    border-radius: 30px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 450px;
    /* height: ; */
    padding: 15px 35px 30px 35px;
    background: #ffffff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  
  .login_title {
    margin: 0px auto 15px auto;
    text-align: center;
    color: #505458;
  }

  .username_style {
    margin: 0px auto 22px auto;
  }
  .login_button_style{
    
    background: #313538;
    width: 100%;
    border: none;
  }
  .remember_me_style{
    margin: 5px auto 5px auto;
  }
  .input_style{
    margin-bottom:20px; margin-top:20px;
  }

  .el-form-item{
    margin-bottom: 0px;
  }
  .sign_up_style{
    margin: 20px auto 20px auto
  }
  /* .el-scrollbar__wrap { 
    overflow-x: hidden; 
    overflow-y: hidden;
  } */
  .el-select-dropdown .el-scrollbar .el-scrollbar__wrap{
    overflow: scroll!important;
  }
</style>
