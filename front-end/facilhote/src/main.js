import Vue from 'vue';
import Axios from 'axios';
import { SchedulePlugin } from '@syncfusion/ej2-vue-schedule';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome, faBars, faCaretDown, faChild, faAt, faGlobe, faPhone, faMoon, faCalendarAlt,
  faBed, faSearch, faUsers, faHourglassHalf, faCaretRight, faCaretLeft, faTachometerAlt,
  faUser, faCreditCard, faChartBar, faExclamationTriangle, faArchive, faCog, faPowerOff,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

library.add(
  faHome, faBars, faCaretDown, faCaretRight, faCaretLeft,
  faSearch, faUsers, faHourglassHalf, faBed, faCalendarAlt,
  faMoon, faChild, faAt, faPhone, faGlobe, faTachometerAlt,
  faUser, faCreditCard, faChartBar, faExclamationTriangle,
  faArchive, faCog, faPowerOff, faTimes,
);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(SchedulePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
