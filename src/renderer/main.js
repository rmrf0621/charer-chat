import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// import ProtoRequest from '@/js/common/request_pb.js';

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


// 挂载为全局 也可以按需引用 import awesome from './assets/proto/awesome_pb.js'
// Vue.prototype.proto = ProtoRequest

// import SocketIO from 'socket.io-client'
// import VueSocketIO from 'vue-socket.io'
// const options = { path: '/' }; //Options object to pass into SocketIO
// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: SocketIO('http://127.0.0.1:7003', options), //options object is Optional
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_"
//     }
//   })
// );

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
