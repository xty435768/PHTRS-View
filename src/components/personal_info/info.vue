<template>
  <div>
    <el-form
      style="margin-right: 100px;margin-left:100px;"
      :rules="user_info_rules"
      label-width="100px"
      ref="user_info_form"
      :model="user_info_form"
    >
      <el-form-item
        label="登录用户名"
        align="left"
        style="margin-bottom:22px"
      >
        <el-tag>{{username_display}}</el-tag>
      </el-form-item>
      <el-form-item
        label="用户种类"
        align="left"
        style="margin-bottom:22px"
      >
        <el-tag>{{usertype_display}}</el-tag>
      </el-form-item>
      <el-form-item
        prop="name"
        label="姓名"
      >
        <el-input
          v-model="user_info_form.name"
          placeholder="请输入姓名"
          class="username_style"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="address"
        label="地址"
      >
        <el-input
          v-model="user_info_form.address"
          placeholder="请输入地址"
          class="username_style"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="mobile"
        label="联系电话"
      >
        <el-input
          v-model="user_info_form.mobile"
          placeholder="请输入联系电话"
          class="username_style"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%;"
          round
          @click="modify_information"
        >修改信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'info',
  data () {
    return {
      username_display: 'null',
      usertype_display: 'null',
      user_info_rules: {
        name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        address: [{ required: true, message: '请填写地址', trigger: 'blur' }],
        mobile: [{ required: true, message: '请填写手机号码', trigger: 'blur' }],
      },
      user_info_form: {
        name: '',
        address: '',
        mobile: '',
      },
    }
  },
  methods: {
    modify_information: function () {
      //user_info_form = { name: this.name, address: this.address, mobile: this.mobile };
      var s = this.submitFormCheck('user_info_form');
      console.log(this.user_info_form);
      if(s){
        this.$axios.post('/user_info/set',{
          userName: window.sessionStorage.getItem('user'),
          name: this.user_info_form.name,
          address: this.user_info_form.address,
          mobile: this.user_info_form.mobile
        }).then(res=>{
          if(res.data=='OK'){
            this.$message({message:'修改成功！',type:'success',center:true,showClose:true})
          }
          else this.$notify.error({title:'修改失败！',message: res.data})
        }).catch(failResponse=>{
          this.$notify.error({title: '修改异常！',message: failResponse.data});
        })
      }
      else this.$notify.error({title: '修改失败！',message: '请确保必填项目不为空！'});
    },
    submitFormCheck: function (formName) {
      var result;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(formName + ' submit successful!');
          result = true;
        } else {
          console.log(formName + ' error submit!!');
          result = false;
        }
      });
      return result;
    },
  },
  mounted () {
    this.username_display = window.sessionStorage.getItem('user');
    this.usertype_display = window.sessionStorage.getItem('user_type');
    this.$axios.post('/user_info/get',{
        userName: window.sessionStorage.getItem('user')
      }).then(res=>{
        this.user_info_form.name = res.data.name;
        this.user_info_form.mobile = res.data.mobile;
        this.user_info_form.address = res.data.address;

      }).catch(failResponse=>{
        this.$notify.error({title: '调取用户信息异常！',message: failResponse.data});
      })
  }
}
</script>