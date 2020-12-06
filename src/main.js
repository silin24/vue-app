import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header'
import store from './vuex/store'
import * as API from './api'
import './Mock/mockServer'

import { Button } from 'mint-ui'
import 'lib-flexible'
import './veeValidate'
Vue.prototype.$API = API
Vue.component(Button.name, Button)
Vue.component('Header',Header)
new Vue({
  // components: {
  //   App
  // },
  // template: '<App/>'
  render: h => h(App),
  router, // 所有组件都能看到 $router和$route  <router-link> 和 <router-view/>
  store
}).$mount('#app')
