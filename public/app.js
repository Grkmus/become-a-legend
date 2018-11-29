import Vue from 'vue'
import axios from 'axios'

window.addEventListener('load', () => {
new Vue({
    el: '#app',
    created(){
        this.fetchPlayers()
    },
    data: {
        players: [],
        events: [],
        name: 'Görkem',
        surname: 'Tosun'
    },
    // components: {
    //     Player,
    //     Event
    // },
    methods:{
        fetchPlayers: async (params) => {
            const res = await axios.get('http://localhost:5000/player/all')
            console.log(res.data)
            this.players = res.data
        },
        fetchEvents: async (params) => {
            const res = await axios.get('http://localhost:5000/daily-event/all');
            this.events = res.data
        }
    },
    computed: {

    }
})

})