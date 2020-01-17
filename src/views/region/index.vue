<template>
  <div class="regionview-container">
    <el-table
      :data="regionlist"
      @row-dblclick="openUpdateDialog"
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column type="index" label="id" width="120px"></el-table-column>
      <el-table-column prop="regionName" label="地区名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="地区修改" width="40%" v-loading="updateLoading" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="updateForm" label-width="120px">
        <el-form-item label="地区">
          <el-input v-model="updateForm.regionName" autocomplete="off"></el-input>
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
import { getRegionList, updateRegion, delRegion } from "../../api/region";

export default {
  data() {
    return {
      loading: false,
      updateLoading: false,
      regionlist: null,
      total: 0,
      updateForm: {
        id: "",
        regionName: "",
        description: ""
      },
      dialogFormVisible: false
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    refresh(pageNum, pageSize) {
      this.loading = true;
      getRegionList(pageNum, pageSize)
        .then(res => {
          this.regionlist = res.data.data.list;
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
      this.updateForm.regionName = row.regionName;
      this.updateForm.description = row.description;
    },
    updateSubmit() {
      this.updateLoading = true;
      updateRegion(this.updateForm)
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
      delRegion(id).then(() => {
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
.regionview-container {
  .el-form {
    width: 80%;
  }
}
</style>