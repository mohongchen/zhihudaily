import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
var axios = require('axios')

const API_ROOT = 'http://119.29.68.183:8088/'
axios.default.withCredentials = true

// axios设置请求拦截器 在这里展示进度条
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
}, err => {
  return err
})
// 在response回复拦截器中隐藏进度条
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

// export API interface
export default {
  // 文章相关
  NewsResource() {
    return axios.get(API_ROOT.concat('news'))
  },
  NewsIdResource(id) {
    return axios.get(API_ROOT.concat('newsById'), {
      params: {
        id: id
      }
    })
  },
  NewsDateResource(date) {
    return axios.get(API_ROOT.concat('newsByDate'), {
      params: {
        time: date
      }
    })
  },
  NewsInfoResource(id) {
    return axios.get(API_ROOT.concat('newsInfo'), {
      params: {
        id: id
      }
    })
  },
  TopicsResource() {
    return axios.get(API_ROOT.concat('topics'))
  },
  TopicIdResource(topicid) {
    return axios.get(API_ROOT.concat('topicById'), {
      params: {
        id: topicid
      }
    })
  },
  // 分类相关
  SectionsResource() {
    return axios.get(API_ROOT.concat('sections'))
  },
  SectionIdResource(sectionid) {
    return axios.get(API_ROOT.concat('sectionById'), {
      params: {
        id: sectionid
      }
    })
  },
  // 长评
  LongCommentsResource(id) {
    return axios.get(API_ROOT.concat('longComments'), {
      params: {
        id: id
      }
    })
  },
  // 短评
  ShortCommentsResource(id) {
    return axios.get(API_ROOT.concat('shortComments'), {
      params: {
        id: id
      }
    })
  }
}
