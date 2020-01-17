<template>
  <div class="addRegionview-container" v-loading="loading">
    <h1 class="title">新增地区</h1>
    <div class="addRegion-form">
      <el-form ref="form" :model="form" label-width="180px">
        <el-form-item label="地区名称" prop="regionName">
          <el-input v-model="form.regionName"></el-input>
        </el-form-item>
        <el-form-item label="地区描述" prop="description">
          <el-input v-model="form.description" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addRegion } from "../../api/region";

export default {
  data() {
    return {
      form: {
        regionName: "",
        description: ""
      },
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      addRegion(this.form.regionName, this.form.description)
        .then(() => {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.resetForm()
          this.loading = false;
          
        })
        .catch(() => {
          this.loading = false;
        });
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.addRegionview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 1.25rem;
    padding: 0 2rem;
    color: #409eff;
  }
  .addRegion-form {
    margin-top: 2.5rem;
    padding: 2.5rem 50px 2.5rem 0;
    width: 600px;
    background-color: #fff;
    box-shadow: 0 4px 27px 1px rgba($color: #000000, $alpha: 0.4);
  }
  .el-form {
    .el-input,.el-textarea {
      width: 80%;
    }
  }
}
</style>