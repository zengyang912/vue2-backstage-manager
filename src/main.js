import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//按需引入
//import { Button, Row } from 'element-ui';

//引入路由
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
import store from './store'

import './api/mock'

Vue.config.productionTip = false

//全局引入
Vue.use(ElementUI);

//按需引入
// Vue.component('el-row', Row);
// Vue.component('el-button', Button);
// Vue.use(Button)
// Vue.use(Row)

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router:router,
  store,
  created() {
    store.commit('tab/ADD_MENU',router)
  },
}).$mount('#app')
