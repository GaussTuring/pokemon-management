<template>
  <div class="tags-view-container">
    <el-tag
      v-for="tag in activeTags"
      @close="closeTag(tag)"
      :closable="tag.route !== '/dashboard'"
      :key="tag.title"
      :effect="$route.path == tag.route ? 'dark' : 'plain'"
    >
      <router-link :to="tag.route">{{tag.title}}</router-link>
    </el-tag>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["activeTags", "getUserinfo"])
  },
  watch: {
    $route(to) {
      const role = this.getUserinfo.role;
      if (role || role.length <= 0) {
        return;
      }
      const accessFlag = this.hasPermission(role, to.meta.role);
      console.log(accessFlag)
      if (!accessFlag) {
        return;
      }
      for (let i = 0; i < this.activeTags.length; i++) {
        if (this.activeTags[i].route == to.path) return;
      }
      this.ADD_ACTIVETAG({ title: to.meta.title, route: to.path });
    }
  },
  methods: {
    ...mapMutations(["ADD_ACTIVETAG", "REMOVE_ACTIVETAG"]),
    async closeTag(tag) {
      await this.REMOVE_ACTIVETAG(tag);
      this.$router.push({
        path: this.activeTags[this.activeTags.length - 1].route
      });
    },
    hasPermission(userRole, needRole) {
      if (!needRole || needRole.length <= 0) {
        return true;
      }
      let needl = needRole.length;
      for (let role in needRole) {
        if (userRole.includes(role)) {
          needl -= 1;
        }
      }
      if (needl === 0) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  padding: 2px 1% 7px;
  border-bottom: 1px solid #606266;
  background-color: #fff;
  .el-tag {
    margin-right: 0.5%;
  }
}
</style>