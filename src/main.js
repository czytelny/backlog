import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import App from './App';
import VueShortkey from 'vue-shortkey';
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Icon,
  Input,
  Message,
  Modal,
  Progress,
  Tooltip
} from 'iview';
import BoardContent from './components/board/BoardContent.vue';
import VueTextareaAutosize from 'vue-textarea-autosize';

require('autolink-js');

Vue.config.productionTip = false;
Vue.config.devtools =  process.env.NODE_ENV !== 'production';

const EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus;
    }
  }
});

Vue.use(VueShortkey);
Vue.use(VueTextareaAutosize);
Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('Tooltip', Tooltip);
Vue.component('Modal', Modal);
Vue.component('Input', Input);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Checkbox', Checkbox);
Vue.component('Progress', Progress);
Vue.use(VueRouter);
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;

Vue.directive('focus', {
  componentUpdated: function (el) {
    el.getElementsByTagName('input')[0].focus();
  }
});

Vue.filter('metaTextReplacer', text => text.replace('META', '⌘'));
Vue.filter('shiftTextReplacer', text => text.replace('SHIFT', '⇧'));

const routes = [
  {path: '/board/:boardId/:itemId?', component: BoardContent}
];

const router = new VueRouter({
  routes
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
