<template>
  <div class="addAbilityview-container" v-loading="loading">
    <h1 class="title">新增特性</h1>
    <el-form class="addAbilityForm" :model="form" ref="formRef" label-width="180px">
      <el-form-item label="特性名称" prop="abilityName">
        <el-input v-model="form.abilityName"></el-input>
      </el-form-item>
      <el-form-item label="特性描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addAbility } from "../../api/ability";

export default {
  data() {
    return {
      form: {
        abilityName: "",
        description: ""
      },
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      addAbility(this.form)
        .then(() => {
          this.loading = false;
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.resetForm();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.addAbilityview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 1.25rem;
    padding: 0 2rem;
    color: #409eff;
  }
  .addAbilityForm {
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