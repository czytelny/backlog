import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './App'
import VueShortkey from 'vue-shortkey'
import {Button, Icon, Tooltip, Modal, Input, Message, DropdownMenu, Dropdown, DropdownItem, Checkbox, Progress} from 'iview'
import BoardContent from './components/board/BoardContent.vue'
import VueTextareaAutosize from 'vue-textarea-autosize'

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

Vue.use(VueShortkey)
Vue.use(VueTextareaAutosize)
Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Tooltip', Tooltip)
Vue.component('Modal', Modal)
Vue.component('Input', Input)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Checkbox', Checkbox)
Vue.component('Progress', Progress)
Vue.use(VueRouter)
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

Vue.directive('focus', {
  componentUpdated: function (el) {
    el.getElementsByTagName('input')[0].focus()
  }
})

const routes = [
  {path: '/board/:boardId', component: BoardContent}
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  components: {App},
  template: '<App/>',
  store,
  router
}).$mount('#app')
