import Vue from 'vue';
import axios from 'axios';
import { SchedulePlugin } from '@syncfusion/ej2-vue-schedule';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome, faCaretDown, faUser, faPlusCircle, faCalendarAlt,
  faBroom, faBed, faDoorOpen, faTimes, faCheckCircle, faPowerOff,
  faTimesCircle, faEdit, faTrashAlt, faKey, faList, faCog, faBars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

library.add(
  faHome, faCaretDown, faUser, faBed, faBroom, faPlusCircle, faPowerOff,
  faCalendarAlt, faDoorOpen, faTimes, faCheckCircle, faTimesCircle, faEdit,
  faTrashAlt, faKey, faList, faCog, faBars,
);

axios.defaults.baseURL = 'http://localhost:3000';
Vue.prototype.$http = axios;
const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(SchedulePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
