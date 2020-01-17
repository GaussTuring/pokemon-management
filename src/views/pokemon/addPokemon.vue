<template>
  <div class="addpokemonview-container" v-loading="loading">
    <h1 class="title">新增宝可梦</h1>
    <el-form class="addpokemonform" :model="form" ref="formRef" label-width="180px">
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
          <el-option v-for="ability in abilities" :key="ability.abilityName" :label="ability.abilityName" :value="ability.abilityName"></el-option>
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

      <el-form-item>
        <el-button type="primary" @click="addPokemon">立即添加</el-button>
        <el-button @click="resetForm('formRef')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addPokemon } from "../../api/pokemon";
import { getAllRegion } from "../../api/region";
import { getAllAbility } from "../../api/ability";
import types from "../../common/pokemon-type";

export default {
  data() {
    return {
      form: {
        name: "",
        img: "",
        icon: "",
        height: 0,
        weight: 0,
        type: [],
        ability: [],
        region: []
      },
      types: types,
      abilities: null,
      regions: null,
      imageUrl: "",
      iconUrl: "",
      loading: false
    };
  },
  created() {
    getAllRegion().then(res => {
      this.regions = res.data.data.list;
    });
    getAllAbility().then(res => {
      this.abilities = res.data.data.list;
    });
  },
  methods: {
    addPokemon() {
      this.loading = true;
      let formdata = new FormData();
      formdata.append("name", this.form.name);
      formdata.append("height", this.form.height);
      formdata.append("weight", this.form.weight);
      formdata.append("type", this.form.type);
      formdata.append("ability", this.form.ability);
      formdata.append("region", this.form.region);
      formdata.append("img", this.$refs.imgUploadRef.$refs.input.files[0]);
      formdata.append("icon", this.$refs.iconUploadRef.$refs.input.files[0]);
      addPokemon(formdata)
        .then(() => {
          this.loading = false;
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.resetForm("formRef");
          this.imageUrl = "";
          this.iconUrl = "";
          this.form.img = "";
          this.form.icon = "";
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
.addpokemonview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 1.25rem;
    padding: 0 2rem;
    color: #409eff;
  }
  .addpokemonform {
    margin-top: 2.5rem;
    padding: 2.5rem 50px 2.5rem 0;
    width: 600px;
    background-color: #fff;
    box-shadow: 0 4px 27px 1px rgba($color: #000000, $alpha: 0.4);

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
  .el-form {
    .el-input {
      width: 80%;
    }
  }
}
</style>