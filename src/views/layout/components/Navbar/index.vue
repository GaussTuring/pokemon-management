<template>
  <div class="navbar-container">
    <el-button type="primary" icon="el-icon-s-fold" @click="setCollapse"></el-button>
    <div class="logo">
      <img src="../../../../assets/logo_2.webp" height="48px" alt />
      <h3>宝可梦中心</h3>
    </div>
    <div class="userinfo-container">
      <img src="../../../../assets/Poké Ball.webp" width="68px" alt />
      <el-dropdown @command="handleCommand" placement="bottom-start">
        <span class="el-dropdown-link">
          {{getUserinfo.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user" command="a">个人信息</el-dropdown-item>
          <el-dropdown-item class="clearfix" icon="el-icon-bell" command="b">
            消息
            <el-badge class="mark" :value="12"></el-badge>
            </el-dropdown-item>
          <el-dropdown-item icon="el-icon-setting" command="c">设置</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button" command="e" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters(["isCollapse","getUserinfo"])
  },
  methods: {
    ...mapMutations(["SET_COLLAPSE"]),
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    setCollapse() {
      this.SET_COLLAPSE(!this.isCollapse);
      this.$emit("changeCollapse");
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-container {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2% 0 1%;
  background-color: #fff;
  .logo {
    width: 168px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .userinfo-container {
    display: flex;
    align-items: center;
  }
}
</style>