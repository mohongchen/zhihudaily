<template>
  <div>
    <!-- nav -->
    <div class="main">
      <el-row>
        <el-col :span="24">{{topicName}}</el-col>
      </el-row>
    </div>
    <!-- 分类 -->
    <ul>
      <li
        v-for="item in topicData"
        :key="item.id"
        @click="goStroie(item.id)"
      >
        <img
          :src="item.images[0]"
          :onerror="defaultImg"
        >
        <div class="description">
          <span>{{item.display_date}}</span>
          <h4>{{item.title}}</h4>
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
      // 话题数据
      topicData: {},
      topicID: '',
      topicName: ''
    }
  },
  created() {
    // 话题id
    this.topicID = this.$route.params.id
    this.topicName = this.$route.params.name
    this.getTopicData()
  },
  methods: {
    async getTopicData() {
      const { data } = await API.SectionIdResource(this.topicID)
      this.topicData = data.stories
      console.log(this.topicData)
    },
    goStroie(id) {
      this.$router.push({ path: '/storie/' + id })
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
    position: relative;
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
        height: 75px;
        line-height: 75px;
        width: 100%;
      }
      span {
        position: absolute;
        right: 5px;
        top: 5px;
        color: #ccc;
      }
    }
  }
}
</style>
