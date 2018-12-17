import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faBars, faCaretDown, faBed, faSearch, faUsers, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

library.add(faHome, faBars, faCaretDown, faSearch, faUsers, faHourglassHalf, faBed);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
