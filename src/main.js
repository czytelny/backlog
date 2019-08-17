import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import App from './App';
import VueShortkey from 'vue-shortkey';
import VueI18n from 'vue-i18n';
import en from './i18n/en';
import zh from './i18n/zh';
import pl from './i18n/pl';
import ptBR from './i18n/pt-BR';
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
  Tooltip,
} from 'iview';
import BoardContent from './components/board/BoardContent.vue';
import VueTextareaAutosize from 'vue-textarea-autosize';

const messages = {
  en: en,
  zh: zh,
  pl: pl,
  ptBR: ptBR,
};

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  messages,
  fallbackLocale: 'en',
});

require('autolink-js');

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV !== 'production';

const EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function() {
      return EventBus;
    },
  },
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
  componentUpdated: function(el) {
    el.getElementsByTagName('input')[0].focus();
  },
});

Vue.filter('metaTextReplacer', text => text.replace('META', '⌘'));
Vue.filter('shiftTextReplacer', text => text.replace('SHIFT', '⇧'));

const routes = [
  {path: '/board/:boardId/:itemId?', component: BoardContent},
];

const router = new VueRouter({
  routes,
});

new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
}).$mount('#app');
