import vue from 'vue'
import vuex from 'vuex'
import { callApi } from '../services'
vue.use(vuex)
export const store = new vuex.Store({
  state: {
    country: null,
    countries: [],
    statusContry: null,
    global: [],
    darkEnabled: true
  },
  mutations: {
    setContries(state, data) {
      state.countries = data

    },
    setStatusContry(state, data) {
      state.statusContry = data
    },
    setCountry(state, name) {
      state.country = name
    },
    setGlobal(state, data) {
      state.global = data
    },
    setMode(state, newValue) {
      state.darkEnabled = newValue
    }
  },
  actions: {
    async setStatusContry({ commit }, nameCountry) {
      if (nameCountry) {
        await callApi.getByCountryTotal(nameCountry).then((response) => {
          commit('setStatusContry', { statistic: response.data.timeline, name: response.data.country })
        }).catch(() => {
          commit('setStatusContry', '')
        })
      }
    },
    async setGlobal({ commit }) {
      await callApi.getDataGlobal().then((response) => {
        let data = response.data
        let global = []
        global.push({ ...data.Global, Country: 'Global' })
        data.Countries.forEach(element => {
          global.push(element)
        });
        commit('setGlobal', global)
        let nameCountry = data.Countries.map((el) => {
          return el.Country
        })
        commit('setContries', nameCountry)
      }).catch((e) => {
        console.log(e);
      })
    }
  }
})