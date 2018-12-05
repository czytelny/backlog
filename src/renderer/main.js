import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './App'
import Vuebar from 'vuebar'
import VueShortkey from 'vue-shortkey'
import {Button, Icon, Tooltip, Modal, Input, Message} from 'iview'
import BoardContent from './components/BoardContent.vue'
import './theme/default-theme.less'

require('autolink-js')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

Vue.use(Vuebar)
Vue.use(VueShortkey)
Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Tooltip', Tooltip)
Vue.component('Modal', Modal)
Vue.component('Input', Input)
Vue.use(VueRouter)
Vue.prototype.$Message = Message

Vue.directive('focus', {
  componentUpdated: function (el) {
    el.getElementsByTagName('input')[0].focus()
  }
})

const routes = [
  {path: '/board/:boardId', component: BoardContent}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

/* eslint-disable no-new */
new Vue({
  components: {App},
  template: '<App/>',
  store,
  router
}).$mount('#app')
