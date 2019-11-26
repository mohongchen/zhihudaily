import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

// 导入axios
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 格式化时间的过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  return `${y}-${m}-${d}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
