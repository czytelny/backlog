import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(iView)

Vue.directive('focus', {
  update: function (el) {
    el.getElementsByTagName('input')[0].focus()
  }
})

/* eslint-disable no-new */
new Vue({
  components: {App},
  template: '<App/>'
}).$mount('#app')
