import Vue from 'vue';
import Vuex from 'vuex';

// import modules
import users from './modules/user';
import rooms from './modules/room';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    users,
    rooms,
  },
  strict: debug,
});
