<template>
  <div>
    <!-- nav -->
    <div class="main">
      <el-row>
        <el-col :span="24">话题分类</el-col>
      </el-row>
    </div>
    <!-- 分类 -->
    <ul>
      <li
        v-for="item in sectionsData"
        :key="item.id"
        @click="goTopic(item.id,item.name)"
      >
        <img
          :src="item.thumbnail"
          :onerror="defaultImg"
        >
        <div class="description">
          <h4>{{item.name}}</h4>
          <p>{{item.description}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import API from '../api/index'
export default {
  data() {
    return {
      defaultImg: 'this.src="' + require('../assets/loading.gif') + '"',
      sectionsData: {}
    }
  },
  created() {
    this.getSectionsDate()
  },
  methods: {
    async getSectionsDate() {
      const { data } = await API.SectionsResource()
      this.sectionsData = data.data
      console.log(this.sectionsData)
    },
    goTopic(id, name) {
      this.$router.push({ path: '/topic/' + id + '/' + name })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 120px;
  font-size: 25px;
  line-height: 120px;
}
ul {
  width: 960px;
  li {
    cursor: pointer;
    width: 45%;
    margin: 20px 2%;
    padding: 3%;
    background-color: #fff;
    float: left;
    box-sizing: border-box;
    img {
      width: 75px;
      height: 75px;
      display: inline-block;
      vertical-align: bottom;
    }
    .description {
      margin-top: -5px;
      display: inline-block;
      h4 {
        height: 40px;
        line-height: 40px;
      }
      p {
        height: 35px;
        line-height: 35px;
        padding: 0;
      }
    }
  }
}
</style>
