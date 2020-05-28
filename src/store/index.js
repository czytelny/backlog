import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';

Vue.config.devtools =  process.env.NODE_ENV !== 'production';
Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  strict: false
});
