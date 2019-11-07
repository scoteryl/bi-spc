import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// echarts
import Echarts from 'echarts';
Vue.prototype.$echarts = Echarts;

// ElementUI
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// 自定义样式
import './assets/theme/index.css';
Vue.use(ElementUI);

// common 公用方法
import Common from './common/common_vue.js'
window.Common = Common;

// md5
import md5 from 'blueimp-md5';
Vue.prototype.$md5 = md5;

// axios
import Axios from 'axios';
// 服务器地址配置文件
import serverConfig from './common/serverConfig';
// 参数请求
const http = Axios.create({
  baseURL: serverConfig.serverUrl,
  transformRequest: [function (data) {
    const urlEncode = function (param, key, encode) {
      if (param == null) {
        return '';
      }
      var paramStr = '';
      var t = typeof (param);
      if (t === 'string' || t === 'number' || t === 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
      } else {
        for (var i in param) {
          var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
          paramStr += urlEncode(param[i], k, encode);
        }
      }
      return paramStr;
    }
    return urlEncode(data).substr(1);
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
// 文件上传
const httpForm = Axios.create({
  baseURL: serverConfig.serverUrl,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

Vue.prototype.$axios = http;
Vue.prototype.$axiosFile = httpForm;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
