<template>
  <div
    class="loginview-container"
    v-loading="isloading"
    element-loading-text="登录中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <img src="../../assets/logo_2.webp" alt />
    <h1>宝可梦管理</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="login">
        <el-form :model="form" label-width="3rem">
          <el-form-item label="账号">
            <el-input v-model="form.username" type="text" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              :show-password="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-form :model="form2" label-width="4.3rem">
          <el-form-item label="账号">
            <el-input v-model="form2.username" type="text" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form2.password"
              type="password"
              placeholder="请输入密码"
              :show-password="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              v-model="form2.confirmPass"
              type="password"
              placeholder="请确认密码"
              :show-password="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="registerSubmit">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      form2: {
        username: "",
        password: "",
        confirmPass: ""
      },
      isloading: false,
      activeName: "login"
    };
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    loginSubmit() {
      this.isloading = true;
      if (this.form.username == "" || this.form.password == "") {
        this.$message({
          message: "用户名或密码不能为空!",
          type: "danger"
        });
        return;
      }
      this.$store
        .dispatch("LoginAction", this.form)
        .then(() => {
          this.$router.push({ path: "/dashboard" });
          this.isloading = false;
        })
        .catch(() => {
          this.isloading = false;
        });
      // const userinfo = { name: this.form.username, role: ["editor"] };
    },
    registerSubmit() {},
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.loginview-container {
  height: 100%;
  background-color: #555555;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: 4%;
  }
  h1 {
    font-weight: 500;
    margin-top: 7%;
    color: #ffffff;
    text-shadow: 0 2px 7px rgba($color: #ffffff, $alpha: 0.4);
  }
  .el-tabs {
    width: 25rem;
    background-color: #fff;
    padding: 1% 3.5% 0;
    border-radius: 0.5rem;
  }
  .el-form {
    margin-top: 1%;
    width: 100%;
    background-color: #fff;
    .el-button {
      width: 100%;
    }
  }
}
</style>