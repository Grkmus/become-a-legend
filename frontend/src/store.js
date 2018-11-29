import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs';
Vue.use(Vuex)

const FETCH_PLAYERS = 'FETCH_PLAYERS'
const FETCH_EVENTS = 'FETCH_EVENTS'
const CREATE_EVENT = 'CREATE_EVENT'

export default new Vuex.Store({
  state: {
    playersData: [],
    eventsData: [],
  },
  mutations: {
      [FETCH_PLAYERS](state, data) {
        state.playersData = data
      },
      [FETCH_EVENTS](state, data) {
        state.eventsData = data
      },
      [CREATE_EVENT](state, data) {
        state.eventsData.push(data)
      },
      
  },
  actions: {
    async fetchPlayers({commit}) {
      const res = await axios.get('http://localhost:5000/player/all');
      commit(FETCH_PLAYERS, res.data)
    },
    async fetchEvents({commit}) {
      const res = await axios.get('http://localhost:5000/daily-event/all');
      commit(FETCH_EVENTS, res.data)
    },
    async createEvent({commit}) {
      const res = await axios.post('http://localhost:5000/daily-event/', {name:'basketball', date: (Date.now() + 10000)})
      .catch(err => console.log(err));
      commit(CREATE_EVENT, res.data)
    },
    async addAttendee({commit}, id) {
      const res = await axios.post(`http://localhost:5000/daily-event/${id}/attendee`)
      .catch(err => console.log(err));
      commit(CREATE_EVENT, res.data)
    },
  },
  
})
