import Vue from 'vue';
import Vuex from 'vuex';

// import modules
import kpis from './modules/kpi';
import users from './modules/user';
import rooms from './modules/room';
import reservations from './modules/reservation';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    kpis,
    users,
    rooms,
    reservations,
  },
  strict: debug,
});
