<template>
  <div>
    <link
      rel="stylesheet"
      href="http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3"
    >
    <!-- 头部导航 -->
    <header>
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col :span="12"><img src="../assets/zhihuDaily.png">
          <div class="title">
            <h4>知乎日报</h4>
            <span>每日提供高质量新闻资讯</span>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            round
            @click="goHome"
          >回到首页</el-button>
        </el-col>
      </el-row>
    </header>
    <!-- 大图 -->
    <div class="wrapper">
      <img :src="this.storieDate.image">
    </div>
    <!-- 内容 -->
    <div
      v-html="storieDate.body"
      style="width:640px;margin: 0 auto;"
    >
    </div>
    <!-- 评论 -->
    <div
      class="wrapper comments"
      :style="'display:'+ isLongComments"
    >
      <span class="longComments">长评</span>
      <ul>
        <li
          v-for="item in longCommentsDate"
          :key="item.id"
        >
          <img
            :src="item.avatar"
            :onerror="defaultImg"
          ><span>{{item.author}}</span>
          <div class="time">{{item.time*1000 | dateFormat}}</div>
          <p>{{item.content}}</p>
        </li>
      </ul>
    </div>

    <div
      class="wrapper comments"
      :style="'display:'+ isShortComments"
    >
      <span class="shortComments">短评</span>
      <ul>
        <li
          v-for="item in shortCommentsDate"
          :key="item.id"
        >
          <img
            :src="item.avatar"
            :onerror="defaultImg"
          ><span>{{item.author}}</span>
          <div class="time">{{item.time*1000 | dateFormat}}</div>
          <p>{{item.content}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import API from '../api/index'
export default {
  data() {
    return {
      defaultImg: 'this.src="' + require('../assets/loading.gif') + '"',
      // 文章id
      storieId: '',
      // 文章
      storieDate: {},
      // 评论
      longCommentsDate: {},
      // 是否存在长评
      isLongComments: 'none',
      // 短评
      shortCommentsDate: {},
      // 是否存在短评
      isShortComments: 'none'
    }
  },
  created() {
    this.storieId = this.$route.params.id
    this.getLongCommentsDate()
    this.getShortCommentsDate()
    this.getStorieDate()
  },
  methods: {
    // 获取文章数据
    async getStorieDate() {
      const { data } = await API.NewsIdResource(this.storieId)
      this.storieDate = data
    },
    // 回到首页
    goHome() {
      this.$router.push('/')
    },
    // 获取长评
    async getLongCommentsDate() {
      const { data } = await API.LongCommentsResource(this.storieId)
      this.longCommentsDate = data.comments
      if (this.longCommentsDate.length !== 0) {
        this.isLongComments = 'block'
      }
    },
    // 获取短评
    async getShortCommentsDate() {
      const { data } = await API.ShortCommentsResource(this.storieId)
      this.shortCommentsDate = data.comments
      if (this.shortCommentsDate.length !== 0) {
        this.isShortComments = 'block'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 640px;
  margin: 0 auto;
}
header {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  padding-top: 10px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.9);
  img {
    width: 40px;
    height: 40px;
    display: inline-block;
    margin: 0 10px 0 18px;
  }
  .title {
    display: inline-block;
  }
}
.longComments,
.shortComments {
  display: block;
  padding: 10px 20px;
  font-size: 14px;
  color: grey;
  background-color: #f6f6f6;
  font-weight: 600;
  width: 600px;
  box-sizing: border-box;
  margin: 10px auto;
}
.comments {
  li {
    width: 600px;
    span {
      display: inline-block;
      margin-left: 5px;
      font-size: 15px;
      line-height: 24px;
      font-weight: 600;
      color: #1a1a1a;
    }
    img {
      width: 24px;
      height: 24px;
    }
    .time {
      float: right;
      font-size: 14px;
      color: #8590a6;
    }
    p {
      padding: 0 29px 15px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
