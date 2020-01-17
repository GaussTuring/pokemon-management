<template>
  <div class="layout">
    <Sidebar ref="sidebarRef" />
    <div class="main-container" ref="mainRef">
      <el-scrollbar>
        <Navbar @changeCollapse="changeCollapse" />
        <tag-view />
        <div class="main">
          <transition name="main" mode="out-in">
            <router-view />
          </transition>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Navbar from "./components/Navbar/index";
import Sidebar from "./components/Sidebar/index";
import TagView from "./components/TagView/index";

import anime from "animejs";

export default {
  components: {
    Navbar,
    Sidebar,
    TagView
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  methods: {
    changeCollapse() {
      if (this.isCollapse) {
        anime({
          targets: this.$refs.mainRef,
          marginLeft: "65px",
          duration: 100,
          easing: "linear"
        });
        anime({
          targets: this.$refs.sidebarRef.$el,
          width: "65px",
          duration: 100,
          easing: "linear"
        });
      } else {
        anime({
          targets: this.$refs.mainRef,
          marginLeft: "201px",
          duration: 100,
          easing: "linear"
        });
        anime({
          targets: this.$refs.sidebarRef.$el,
          width: "201px",
          duration: 100,
          easing: "linear"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.layout {
  height: 100%;
  .main-container {
    height: 100%;
    margin-left: $sideBarWidth;
    overflow: hidden;
    background-color: #f8f8ff;
    .el-scrollbar {
      height: 100%;
      /deep/.el-scrollbar__bar.is-vertical {
        right: 0px;
      }
      /deep/.el-scrollbar__wrap{
        overflow-x: hidden;
      }
      .main {
        padding: 1%;
      }
    }
  }
}

.main-enter-active,
.main-leave-active {
  transition: all 0.5s;
}
.main-enter, .main-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  // transform: translateX(100%);
}
</style>