<template>
  <div class="login">
    <el-form
      :model="form"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <el-form-item>
        <el-input
          type="text"
          v-model="form.userid"
          auto-complete="off"
          placeholder="账号"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="密码"
          prefix-icon="el-icon-key"
        ></el-input>
      </el-form-item>
      <el-checkbox checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userid: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.http.post(this.api.login).then(res => {
        if (res.code == 200) {
          this.$message.success("登录成功");
          localStorage.setItem("username", res.data[0].username);
          this.$router.push("/student");
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 0px auto;
  width: 250px;
  padding: 35px 35px 15px 35px;
  background: #ffffff4a;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: left;
  color: #67717b;
}
.remember {
  margin: 0px 0px 35px 0px;
  float: left;
}
.login {
  overflow: hidden;
  padding-top: 300px;
  margin-top: -10px;
  height: 800px;
  background: url("../assets/login.png") no-repeat;
  background-size: 100%;
}
.el-checkbox__label,
.el-checkbox {
  color: rgb(255, 255, 255) !important;
}
.check {
  letter-spacing: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>