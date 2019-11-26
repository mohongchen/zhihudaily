<template>
  <div class="home wrapp">
    <!-- 头部导航 -->
    <header>
      <img src="../assets/top_logo.png">
      <el-button
        type="primary"
        @click="goHome"
      >浏览内容</el-button>
      <el-button type="primary" @click="goSections">话题分类</el-button>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    // 回到首页
    goHome() {
      this.$router.push('/')
    },
    goSections() {
      this.$router.push('/sections')
    }
  }
}
</script>

<style lang="less" scoped>
header {
  background-color: #fff;
  height: 78px;
  padding: 0 10px;
  position: fixed;
  top: 0;
  width: 62%;
  z-index: 3;
  img {
    margin-top: 10px;
  }
  .el-button {
    float: right;
    margin: 20px 10px;
  }
}
.home {
  padding-top: 78px;
}
.wrapp {
  width: 960px;
  margin: 0 auto;
}
</style>
