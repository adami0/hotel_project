import axios from 'axios';

const state = {
  reservationsKpis: [],
  roomsStatuKpis: [],
  profitKpis: [],
};

const mutations = {
  getReservationsKpi(state, kpiData) {
    state.reservationsKpis = kpiData;
  },

  getProfitKpi(state, kpiData) {
    state.profitKpis = kpiData;
  },

  getRoomsStatuKpi(state, kpiData) {
    state.roomsStatuKpis = kpiData;
  },
};

const actions = {
  getReservationsKpi({ commit }) {
    return new Promise((resolve, reject) => {
      axios({ url: 'http://localhost:3000/api/v1/kpi/reservationsPerMonth', method: 'GET' })
        .then((resp) => {
          const { data } = resp;
          commit('getReservationsKpi', data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getProfitKpi({ commit }) {
    return new Promise((resolve, reject) => {
      axios({ url: 'http://localhost:3000/api/v1/kpi/profitPerMonth', method: 'GET' })
        .then((resp) => {
          const { data } = resp;
          commit('getProfitKpi', data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getRoomsStatuKpi({ commit }) {
    return new Promise((resolve, reject) => {
      axios({ url: 'http://localhost:3000/api/v1/kpi/roomStatus', method: 'GET' })
        .then((resp) => {
          const { data } = resp;
          commit('getRoomsStatuKpi', data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const getters = {
  profitKpisData: state => state.profitKpis,
  reservationsKpisData: state => state.reservationsKpis,
  roomsStatuKpisData: state => state.roomsStatuKpis[0],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
