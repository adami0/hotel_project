/* eslint disable no-shadow */
import axios from 'axios';

const state = {
  token: localStorage.getItem('user-token') || '',
  user: '' || JSON.parse(localStorage.getItem('user-data')),
  allUsers: [],
};

const mutations = {
  auth_success(state, { token, user }) {
    state.status = 'success';
    state.token = token;
    state.user = user;
  },
  getAllUsers(state, users) {
    state.allUsers = users;
  },
  logout(state) {
    state.status = '';
    state.token = '';
  },
};

const actions = {
  login({ commit }, userAuth) {
    return new Promise((resolve, reject) => {
      axios({
        url: 'http://localhost:3000/api/v1/user/authenticate',
        data: userAuth,
        method: 'POST',
      })
        .then((resp) => {
          const { token, expires, user } = resp.data;
          localStorage.setItem('exp', expires);
          localStorage.setItem('user-token', token);
          localStorage.setItem('user-data', JSON.stringify(user));
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          commit('auth_success', { token, user });
          resolve(resp);
        })
        .catch((err) => {
          localStorage.removeItem('user-token');
          reject(err);
        });
    });
  },

  getAllUsers({ commit }) {
    return new Promise((resolve, reject) => {
      axios({ url: 'http://localhost:3000/api/v1/user', method: 'GET' })
        .then((resp) => {
          const { data } = resp;
          commit('getAllUsers', data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteUser({ dispatch }, userId) {
    return new Promise((resolve, reject) => {
      axios({ url: `http://localhost:3000/api/v1/user/${userId}`, method: 'DELETE' })
        .then((resp) => {
          dispatch('getAllUsers');
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  postUserAvatar({ commit }, fileData) {
    return new Promise((resolve, reject) => {
      axios({
        url: 'http://localhost:3000/api/v1/user/avatar',
        method: 'POST',
        fileData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((resp) => {
          console.log(resp);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout');
      localStorage.clear();
      delete axios.defaults.headers.common.Authorization;
      resolve();
    });
  },
};

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  getAllUsers: state => state.allUsers,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
