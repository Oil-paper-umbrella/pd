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
import './control/directives.js'

Vue.config.productionTip = false

Vue.filter('userFilter', function(dataStr){
  // 如果直接调用得到的是当前的时间，可以通过传递值，来获取对应的时间
  let str = '';
  for(let i=0; i<dataStr.length;i++){
    if(dataStr.length <= 1){
      str+=dataStr[i];
    }else{
        str+=dataStr[i]+"、";
    }
  }
  let reg=/、$/gi;
  str = str.replace(reg,'');
  return str;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
