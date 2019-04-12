/* eslint disable no-shadow */
import axios from 'axios';
import { EventBus } from './../../event-bus';

const state = {
  token: localStorage.getItem('user-token') || '',
  user: '' || JSON.parse(localStorage.getItem('user-data')),
  avatar: localStorage.getItem('user-avatar') || '',
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
        url: '/api/v1/user/authenticate',
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
      axios({ url: '/api/v1/user', method: 'GET' })
        .then((resp) => {
          const { data } = resp;
          for (let i = 0; i < data.length; i++) {
            data[i].isSelected = false;
          }
          commit('getAllUsers', data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getUserById({ dispatch }) {
    return new Promise((resolve, reject) => {
      axios({ url: '/api/v1/user/getById', method: 'GET' })
        .then((resp) => {
          const { data } = resp;
          localStorage.setItem('user-data', JSON.stringify(data[0]));
          dispatch('getUserAvatar', data[0].avatar);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getUserAvatar({ dispatch }, avatarUrl) {
    console.log(avatarUrl);

    return new Promise((resolve, reject) => {
      axios({ url: '/api/v1/user/getAvatar', method: 'POST', data: { avatar: avatarUrl } })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteUser({ dispatch }, userId) {
    return new Promise((resolve, reject) => {
      axios({ url: `/api/v1/user/${userId}`, method: 'DELETE' })
        .then((resp) => {
          dispatch('getAllUsers');
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createUser({ dispatch }, newUser) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/api/v1/user/register',
        data: newUser,
        method: 'POST',
      })
        .then((resp) => {
          dispatch('getAllUsers');
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateUser({ dispatch }, user) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/api/v1/user',
        data: user,
        method: 'PUT',
      })
        .then((resp) => {
          dispatch('getAllUsers');
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateUserPassword({ commit }, passwordData) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/api/v1/user//password',
        data: passwordData,
        method: 'PATCH',
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateUserAvatar({ dispatch }, fileData) {
    return new Promise((resolve, reject) => {
      let completedSteps;
      axios({
        url: '/api/v1/user/avatar',
        method: 'PATCH',
        data: fileData,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentLoaded = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
          completedSteps = percentLoaded / 10;
        },
      })
        .then((resp) => {
          dispatch('getUserById');
          EventBus.$emit('message-from-app', {
            txt: resp.data.message,
            status: 'alert-success',
          });
          resolve(completedSteps);
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
