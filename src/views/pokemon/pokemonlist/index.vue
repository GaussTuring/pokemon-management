<template>
  <div class="pokemonview-container">
    <div class="query-container">
      <div class="sort-container">
        <el-select
          v-model="selectRegion"
          @change="regionSelectChange"
          :multiple="true"
          clearable
          placeholder="请选择地区"
        >
          <el-option
            v-for="region in regions"
            :key="region.regionName"
            :label="region.regionName"
            :value="region.regionName"
          ></el-option>
        </el-select>
        <el-select
          v-model="selectType"
          @change="typeSelectChange"
          :multiple="true"
          clearable
          placeholder="请选择属性"
        >
          <el-option v-for="type in types" :key="type" :label="type" :value="type"></el-option>
        </el-select>
        <el-button size="small" type="success">全部</el-button>
      </div>
      <div class="search-container">
        <el-input placeholder="请输入内容" v-model="name">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div class="pokemon-table">
      <el-table
        ref="multipleTable"
        :data="pokemonlist"
        tooltip-effect="dark"
        style="width: 100%"
        :border="true"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="id"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon" width="60" alt />
          </template>
        </el-table-column>
        <el-table-column label="属性">
          <template slot-scope="scope">
            <el-tag type="info" v-for="type in scope.row.feature.type" :key="type">{{type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="region" label="地区">
          <template slot-scope="scope">
            <el-tag type="info" v-for="region in scope.row.region" :key="region">{{region}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="TaBlbottom-container">
      <el-button type="danger" @click="deleteSelected">删除选中选项</el-button>
      <el-pagination
        @current-change="pageChange"
        background
        :page-size="15"
        :currentPage="currentPage"
        @prev-click="prev"
        @next-click="next"
        layout="prev, pager, next,total,jumper"
        :total="pokemonCount"
      ></el-pagination>
    </div>

    <el-dialog title="删除" v-loading="dialogLoading" :visible.sync="deleteDialogVisible" width="30%">
      <span>您确定删除此宝可梦吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="宝可梦信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="formRef" v-loading="updateLoading" label-width="180px">
        <el-form-item label="宝可梦名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div class="upload-container">
            <el-input
              ref="imgUploadRef"
              class="image-upload-input"
              @change="onImgChange"
              type="file"
              v-model="form.img"
            />
            <img class="image-upload" :src="imageUrl" alt />
          </div>
        </el-form-item>

        <el-form-item label="图标">
          <div class="upload-container">
            <el-input
              ref="iconUploadRef"
              class="icon-upload-input"
              @change="onIconChange"
              type="file"
              v-model="form.icon"
            />
            <img class="icon-upload" :src="iconUrl" alt />
          </div>
        </el-form-item>

        <el-form-item label="身长" prop="height">
          <el-input-number
            v-model="form.height"
            controls-position="right"
            :precision="1"
            :step="0.1"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input-number
            v-model="form.weight"
            controls-position="right"
            :precision="1"
            :step="0.1"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="属性" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox v-for="type in types" :key="type" :label="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特性" prop="ability">
          <el-select v-model="form.ability" multiple placeholder="请选择">
            <el-option
              v-for="ability in abilities"
              :key="ability.abilityName"
              :label="ability.abilityName"
              :value="ability.abilityName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属地区" prop="region">
          <el-select v-model="form.region" multiple placeholder="请选择">
            <el-option
              v-for="region in regions"
              :key="region.regionName"
              :label="region.regionName"
              :value="region.regionName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import Mock from "mockjs";
import {
  getPokemonList,
  updatePokemon,
  deletePokemon,
  deleteManyPokemon
} from "../../../api/pokemon";
import { getAllRegion } from "../../../api/region.js";
import { getAllAbility } from "../../../api/ability";
import types from "../../../common/pokemon-type";

export default {
  created() {
    this.initData();
  },
  data() {
    return {
      pokemonlist: null,
      pokemonCount: 0,
      multipleSelection: null,
      delSign: null,
      regions: null,
      selectType: [],
      selectRegion: [],
      name: "",
      dialogFormVisible: false,
      deleteDialogVisible: false,
      formLabelWidth: "120px",
      form: {
        id: null,
        name: "",
        img: "",
        icon: "",
        height: 0,
        weight: 0,
        type: [],
        ability: [],
        region: []
      },
      types: null,
      abilities: null,
      imageUrl: "",
      iconUrl: "",
      currentPage: 1,
      loading: false,
      dialogLoading: false,
      updateLoading: false,
      visible: false
    };
  },
  methods: {
    initData() {
      this.loading = true;
      getPokemonList()
        .then(res => {
          this.pokemonlist = res.data.data.list;
          this.pokemonCount = res.data.data.total;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
      getAllRegion().then(res => {
        this.regions = res.data.data.list;
      });
      getAllAbility().then(res => {
        this.abilities = res.data.data.list;
      });
      this.types = types;
    },
    handleSelectionChange(val) {
      const array = [];
      val.forEach(item => {
        array.push(item._id);
      });
      this.multipleSelection = array;
    },
    deleteSelected() {
      deleteManyPokemon(this.multipleSelection).then(() => {
        this.pageChange(1);
        this.$message({
          message: "删除成功",
          type: "success"
        });
      });
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.form.id = row._id;
      this.form.name = row.name;
      this.form.type = row.feature.type;
      this.form.ability = row.feature.ability;
      this.form.height = row.feature.height;
      this.form.weight = row.feature.weight;
      this.form.region = row.region;
      this.imageUrl = row.img;
      this.iconUrl = row.icon;
    },
    updateSubmit() {
      this.updateLoading = true;
      let formdata = new FormData();
      formdata.append("id", this.form.id);
      formdata.append("name", this.form.name);
      formdata.append("height", this.form.height);
      formdata.append("weight", this.form.weight);
      formdata.append("type", this.form.type);
      formdata.append("ability", this.form.ability);
      formdata.append("region", this.form.region);
      formdata.append("img", this.$refs.imgUploadRef.$refs.input.files[0]);
      formdata.append("icon", this.$refs.iconUploadRef.$refs.input.files[0]);

      updatePokemon(formdata)
        .then(() => {
          this.updateLoading = false;
          this.dialogFormVisible = false;
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.resetForm("formRef");
          this.imageUrl = "";
          this.iconUrl = "";
          this.form.img = "";
          this.form.icon = "";
          this.pageChange(this.currentPage);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleDelete(id) {
      this.deleteDialogVisible = true;
      this.delSign = id;
    },
    deleteSubmit() {
      this.dialogLoading = true;
      deletePokemon(this.delSign).then(() => {
        this.dialogLoading = false;
        this.deleteDialogVisible = false;
        this.pageChange(1);
      });
    },
    typeSelectChange() {
      this.pageChange(1);
    },
    regionSelectChange() {
      this.pageChange(1);
    },
    prev() {
      this.currentPage -= 1;
    },
    next() {
      this.currentPage += 1;
    },
    pageChange(currentPage) {
      this.currentPage = currentPage;
      this.loading = true;
      getPokemonList(currentPage, null, this.selectType, this.selectRegion)
        .then(res => {
          this.pokemonlist = res.data.data.list;
          this.pokemonCount = res.data.data.total;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    onImgChange() {
      const file = this.$refs.imgUploadRef.$refs.input.files[0];
      const URL = window.URL || window.webkitURL;
      this.imageUrl = URL.createObjectURL(file);
    },
    onIconChange() {
      const file = this.$refs.iconUploadRef.$refs.input.files[0];
      this.iconUrl = window.URL.createObjectURL(file);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.pokemonview-container {
  .query-container {
    display: flex;
    justify-content: space-between;
    .sort-container {
      width: 35%;
      display: flex;
      .el-select {
        margin-right: 7px;
      }
    }
    .search-container {
      width: 30%;
    }
  }
  .pokemon-table {
    margin: 1% 0;
    .el-tag {
      margin-left: 2px;
    }
  }
  .TaBlbottom-container {
    margin-bottom: 1%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-dialog {
    .el-input,
    .el-select {
      width: 60%;
    }
  }
  .upload-container {
    display: flex;
    flex-direction: column;
  }

  .image-upload-input,
  .icon-upload-input {
    margin-bottom: 5px;
    /deep/ .el-input__inner {
      padding: 0;
    }
  }
  .image-upload {
    width: 168px;
    height: 168px;
    border: 1px dashed #ccc;
  }
  .icon-upload {
    width: 60px;
    height: 49px;
    border: 1px dashed #ccc;
  }
}
</style>