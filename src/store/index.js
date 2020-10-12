import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex, axios);

export default new Vuex.Store({
  actions: {
    async tabs({ commit }) {
      await axios
        .get('https://api.exchangeratesapi.io/latest')
        .then((res) => {
          commit('setAllTabs', res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getBase({ commit }, payload) {
      axios
        .get('https://api.exchangeratesapi.io/latest', {
          params: {
            base: payload,
          },
        })
        .then((res) => {
          commit('setAllTabs', res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mutations: {
    setAllTabs(state, payload) {
      state.allTabs = {};

      state.allTabs = payload;

      const data = {
        base: state.allTabs.base,
        rates: Object.entries(state.allTabs.rates).map(([key, value]) => ({
          currency: key,
          value: value,
        })),
      };

      state.allTabs = data;
      //   console.log(state.allTabs);
    },
  },
  state: {
    allTabs: {},
  },
  getters: {
    getTabs(state) {
      return state.allTabs;
    },
  },
});
