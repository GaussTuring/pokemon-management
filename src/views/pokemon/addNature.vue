<template>
  <div class="addNatureview-container" v-loading="loading">
    <h1 class="title">新增性格</h1>
    <div class="addNatureForm">
      <el-form ref="form" :model="form" label-width="180px">
        <el-form-item label="性格名称" prop="natureName">
          <el-input v-model="form.natureName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
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
import {addNature} from '../../api/nature'

export default {
  data() {
    return {
      form: {
        natureName: "",
        description: ""
      },
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      addNature(this.form)
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
.addNatureview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 1.25rem;
    padding: 0 2rem;
    color: #409eff;
  }
  .addNatureForm {
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