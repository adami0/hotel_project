import Vue from 'vue';
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

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
