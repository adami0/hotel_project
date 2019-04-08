import axios from 'axios';

const state = {
  reservationData: [] || JSON.parse(localStorage.getItem('reservations-data')),
};

const mutations = {
  getAllReservation(state, data) {
    state.reservationData = data;
  },

  createReservation(state, data) {},

  updateReservation(state, data) {},

  deleteReservation(state, data) {},
};

const actions = {
  getReservationData({ commit }) {
    return new Promise((resolve, reject) => {
      axios({ url: 'http://localhost:3000/api/v1/reservation', method: 'GET' })
        .then((resp) => {
          const { data } = resp;
          localStorage.setItem('reservations-data', JSON.stringify(data));
          commit('getAllReservation', data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
