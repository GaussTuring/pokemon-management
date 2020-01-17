<template>
  <div class="abilityview-container">
    <el-table
      :data="abilitylist"
      v-loading="loading"
      @row-dblclick="openUpdateDialog"
      style="width:100%"
    >
      <el-table-column type="index" label="id" width="120px"></el-table-column>
      <el-table-column prop="abilityName" label="特性名称"></el-table-column>
      <el-table-column prop="description" label="特性描述"></el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="特性修改" width="40%" v-loading="updateLoading" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="updateForm" label-width="120px">
        <el-form-item label="特性">
          <el-input v-model="updateForm.abilityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="updateForm.description" type="textarea" :rows="3" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateSubmit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAbilityList,
  updateAbility,
  delAbility,
} from "../../../api/ability";

export default {
  data() {
    return {
      loading: false,
      updateLoading: false,
      dialogFormVisible: false,
      abilitylist: null,
      total: 0,
      updateForm: {
        id: "",
        abilityName: "",
        description: ""
      }
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    refresh(pageNum, pageSize) {
      this.loading = true;
      getAbilityList(pageNum, pageSize)
        .then(res => {
          this.abilitylist = res.data.data.list;
          this.total = res.data.data.total;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    openUpdateDialog(row) {
      this.dialogFormVisible = true;
      this.updateForm.id = row._id;
      this.updateForm.abilityName = row.abilityName;
      this.updateForm.description = row.description;
    },
    updateSubmit() {
      this.updateLoading = true;
      updateAbility(this.updateForm)
        .then(() => {
          this.updateLoading = false;
          this.resetForm();
          this.dialogFormVisible = false;
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.refresh();
        })
        .catch(() => {
          this.updateLoading = false;
        });
    },
    handleDelete(id) {
      delAbility(id).then(() => {
        this.refresh();
        this.$message({
          message: "删除成功",
          type: "success"
        });
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>