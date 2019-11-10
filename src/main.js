import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from '@/store/index';
// 引入 ElementUI 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 引入 Echarts 
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

require("../public/css/iconfont.css")


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
