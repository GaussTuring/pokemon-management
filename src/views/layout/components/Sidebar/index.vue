<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :collapse-transition="false"
        mode="vertical"
        :router="true"
        :default-active="currentRoute"
      >
        <el-menu-item index="/dashboard" route="/dashboard">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu v-for="menu in menuList" :key="menu.title" :index="menu.index">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.title}}</span>
          </template>
          <template v-for="submenu1 in menu.sub">
            <el-submenu
              v-if="submenu1.sub && submenu1.sub.length>0"
              :index="submenu1.index"
              :key="submenu1.title"
            >
              <span slot="title">{{submenu1.title}}</span>
              <el-menu-item
                v-for="submenu2 in submenu1.sub"
                :key="submenu2.title"
                :index="submenu2.index"
                :route="submenu2.index"
                @click="menuItemClick(submenu2.title,submenu2.index)"
              >{{submenu2.title}}</el-menu-item>
            </el-submenu>
            <el-menu-item
              v-else
              :key="submenu1.title"
              :index="submenu1.index"
              :route="submenu1.index"
              @click="menuItemClick(submenu1.title,submenu1.index)"
            >{{submenu1.title}}</el-menu-item>
          </template>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import "../../../../styles/variables.scss";

export default {
  data() {
    return {
      menuList: [
        {
          title: "宝可梦管理",
          index: "1",
          icon: "el-icon-menu",
          sub: [
            {
              title: "宝可梦",
              index: "1-1",
              sub: [
                {
                  title: "宝可梦图鉴",
                  index: "/pokemon/pokemonList"
                },
                {
                  title: "新增宝可梦",
                  index: "/pokemon/addPokemon"
                }
              ]
            },
            {
              title: "宝可梦性格",
              index: "1-2",
              sub: [
                {
                  title:'性格列表',
                  index:'/pokemon/natureList'
                },
                {
                  title:'新增性格',
                  index:'/pokemon/addNature'
                }
              ]
            },
            {
              title: "宝可梦特性",
              index: "1-3",
              sub: [
                {
                  title:'特性列表',
                  index:'/pokemon/abilityList'
                },
                {
                  title:'新增特性',
                  index:'/pokemon/addAbility'
                }
              ]
            }
          ]
        },
        {
          title: "地区管理",
          index: "2",
          icon: "el-icon-place",
          sub: [
            {
              title: "地区列表",
              index: "/region/regionList",
              sub: []
            },
            {
              title: "新增地区",
              index: "/region/addRegion",
              sub: []
            }
          ]
        },
        {
          title: "道具管理",
          index: "3",
          icon: "el-icon-goods",
          sub: [
            {
              title: "战斗道具管理",
              index: "3-1"
            },
            {
              title: "携带道具管理",
              index: "3-2"
            },
            {
              title: "捕捉道具管理",
              index: "3-3"
            },
            {
              title: "进化道具管理",
              index: "3-4"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["isCollapse", "activeTags", "currentRoute"])
  },
  watch: {
    $route(to) {
      this.SET_CURRENTROUTE(to.path);
    }
  },
  methods: {
    ...mapMutations(["ADD_ACTIVETAG", "SET_CURRENTROUTE"]),
    menuItemClick(title, route) {
      for (let i = 0; i < this.activeTags.length; i++) {
        if (this.activeTags[i].route == route) return;
      }
      let tag = { title, route };
      this.ADD_ACTIVETAG(tag);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../styles/variables.scss";

.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: $sideBarWidth;
  height: 100%;
  z-index: 50;
  /deep/ .scrollbar-wrapper {
    overflow-x: auto;
  }
  .el-scrollbar {
    height: 100%;
    /deep/ .el-scrollbar__view {
      height: 100%;
      .el-menu {
        height: 100%;
      }
      .el-menu:not(.el-menu--collapse) {
        width: 200px;
        min-height: 100%;
      }
    }
  }
}
</style>