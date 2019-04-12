import axios from 'axios';

const state = {
  roomsData: [] || JSON.parse(localStorage.getItem('rooms-data')),
};

const mutations = {
  getAllRooms(state, data) {
    state.roomsData = data;
  },
};

const actions = {
  getRoomsData({ commit }) {
    return new Promise((resolve, reject) => {
      axios({ url: '/api/v1/rooms', method: 'GET' })
        .then((resp) => {
          const { data } = resp;
          localStorage.setItem('rooms-data', JSON.stringify(data));
          commit('getAllRooms', data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteRoom({ dispatch }, roomId) {
    return new Promise((resolve, reject) => {
      axios({ url: `/api/v1/rooms/${roomId}`, method: 'DELETE' })
        .then((resp) => {
          dispatch('getRoomsData');
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createRoom({ dispatch }, newRoom) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/api/v1/rooms/register',
        data: newRoom,
        method: 'POST',
      })
        .then((resp) => {
          dispatch('getAllRooms');
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateRoomStatus({ dispatch }, roomStatusData) {
    return new Promise((resolve, reject) => {
      const { roomStatus, roomId } = roomStatusData;
      axios({
        url: `/api/v1/rooms/${roomId}`,
        data: { room_status: roomStatus },
        method: 'PATCH',
      })
        .then((resp) => {
          dispatch('getRoomsData');
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const getters = {
  roomsData: state => state.roomsData,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
