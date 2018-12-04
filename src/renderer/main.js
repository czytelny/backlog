import Vue from 'vue'
import store from './store'
import App from './App'
import Vuebar from 'vuebar'
import VueShortkey from 'vue-shortkey'
import './theme/index.css'
import { Button, Input } from 'element-ui'

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

Vue.use(Button)
Vue.use(Input)

Vue.directive('focus', {
  componentUpdated: function (el) {
    el.getElementsByTagName('input')[0].focus()
  }
})

/* eslint-disable no-new */
new Vue({
  components: {App},
  template: '<App/>',
  store
}).$mount('#app')
