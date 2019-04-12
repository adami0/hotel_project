import axios from 'axios';

const state = {
  reservationData: [] || JSON.parse(localStorage.getItem('reservations-data')),
};

const mutations = {
  getAllReservation(state, data) {
    state.reservationData = data;
  },
};

const actions = {
  getReservationsData({ commit }) {
    return new Promise((resolve, reject) => {
      axios({ url: '/api/v1/reservation', method: 'GET' })
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

  createNewReservation({ dispatch }, reservationData) {
    return new Promise((resolve, reject) => {
      axios({ url: '/api/v1/reservation', data: reservationData, method: 'POST' })
        .then((resp) => {
          dispatch('getReservationsData');
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateReservation({ dispatch }, reservationData) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/v1/reservation/${reservationData.Id}`,
        data: reservationData,
        method: 'PUT',
      })
        .then((resp) => {
          dispatch('getReservationsData');
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteReservation({ dispatch }, reservationId) {
    return new Promise((resolve, reject) => {
      axios({ url: `/api/v1/reservation/${reservationId.Id}`, method: 'DELETE' })
        .then((resp) => {
          dispatch('getReservationsData');
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const getters = {
  getAllReservations: state => state.reservationData,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
