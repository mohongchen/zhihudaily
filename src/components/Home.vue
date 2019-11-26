<template>
  <div>
    <!-- nav -->
    <div class="main">
      <ul>
        <li>浏览内容</li>
        <li class="right">{{toDay}}</li>
      </ul>
    </div>
    <el-carousel
      :interval="2000"
      type="card"
      height="500px"
    >
      <el-carousel-item
        v-for="item in topStories"
        :key="item.id"
      >
        <h3 class="medium">
          <div @click="goStroie(item.id)">
            <img
              :src="item.image"
              :onerror="defaultImg"
            ><span>{{item.title}}</span></div>
        </h3>
      </el-carousel-item>
    </el-carousel>
    <!-- 文章 -->
    <ul class="storie">
      <!-- 瀑布流 -->
      <li
        v-for="item in newsForm"
        :key="item.id"
      >
        <div
          class="container"
          @click="goStroie(item.id)"
        >
          <img
            :src="item.src"
            :onerror="defaultImg"
          >
          <p>{{item.title}}</p>
        </div>
      </li>
    </ul>
    <el-button
      type="primary"
      @click="getNewsByDay"
    >查看前一天日报</el-button>
  </div>
</template>

<script>
import { prevDate } from '../common/js/utils'
import API from '../api/index'
export default {
  data() {
    return {
      defaultImg: 'this.src="' + require('../assets/loading.gif') + '"',
      isFixed: false,
      offsetTop: 0,
      isHidden: false,
      // 当前日期
      toDay: '',
      // 请求数据时用的日期数据
      day: 20191126,
      // 新闻数据
      newsForm: [],
      // 轮播图数据
      topStories: {}
    }
  },
  created() {
    this.getDate()
    this.getNews()
    this.getNewsByDay()
  },
  methods: {
    async getDate() {
      const { data } = await this.$http.get('/server', { params: { api: 'mtop.common.getTimestamp' } })
      this.toDay = prevDate(data.data.t - 0)
      this.day = this.toDay.replace(/-/g, '') - 1
    },
    async getNews() {
      let { data } = await API.NewsResource()
      for (const i in data.stories) {
        data.stories[i].src = data.stories[i].images[0]
      }
      this.topStories = data.top_stories
    },
    goStroie(id) {
      this.$router.push({ path: '/storie/' + id })
    },
    async getNewsByDay() {
      let { data } = await API.NewsDateResource(this.day)
      for (const i in data.stories) {
        data.stories[i].src = data.stories[i].images[0]
      }
      this.newsForm = this.newsForm.concat(data.stories)
      this.day = this.day - 1
    }
  }
}
</script>

<style lang="less" scoped>
.el-carousel {
  .medium {
    img {
      width: 100%;
    }
    span {
      display: block;
      transform: translateY(-100%);
      width: 480px;
      height: 30px;
      text-align: center;
      font-size: 16px;
      color: #ccc;
    }
  }
}
.home {
  padding-top: 78px;
}
.main {
  height: 120px;
  font-size: 25px;
  line-height: 120px;
  ul {
    li {
      width: 50%;
      height: 120px;
      float: left;
    }
    .right {
      color: #ccc;
      text-align: right;
    }
  }
}
.storie {
  li {
    width: 33%;
    float: left;
    .container {
      margin: 10px;
      cursor: pointer;
      padding: 20px;
      background-color: #fff;
      img {
        width: 256px;
        height: 256px;
      }
      p {
        height: 42px;
      }
    }
  }
}
.el-button {
  width: 100%;
}
</style>
