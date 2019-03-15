import axios from 'axios';

const state = {
  roomData: '',
  roomStatus: null,
};

const mutations = {
  setRooms(state, roomData) {
    state.roomData = roomData;
  },

  updateRoomStatus(state, roomStatus) {
    state.roomStatus = roomStatus;
  },
};

const actions = {
  getRoomsData({ commit }) {
    return new Promise((resolve, reject) => {
      axios({ url: 'http://localhost:3000/api/v1/rooms', method: 'GET' })
        .then((resp) => {
          const { data } = resp.data;
          commit('setRooms', data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateRoomStatus({ commit }, roomStatus, roomId) {
    return new Promise((resolve, reject) => {
      axios({ url: `http://localhost:3000/api/v1/rooms/${roomId}`, data: roomStatus, method: 'POST' })
        .then((resp) => {
          const { data } = resp;
          commit('setRooms', data);
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
