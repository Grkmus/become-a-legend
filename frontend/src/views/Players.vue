<script>
import Vue from 'vue'
// import { mapActions, mapState, mapGetters } from 'vuex';
import Player from '@/components/Player.vue'
import Event from '@/components/Event.vue'
import axios from 'axios'

window.vue = new Vue({
    el: '#app',
    created(){
        this.fetchPlayers()
    },
    data: {
        players: [],
        events: [],

    },
    components: {
        Player,
        Event
    },
    methods:{
        fetchPlayers: async (params) => {
            const res = await axios.get('http://localhost:5000/player/all')
            this.players = res.data
        },
        fetchEvents: async (params) => {
            const res = await axios.get('http://localhost:5000/daily-event/all');
            this.events = res.data
        }
    },
})

// export default {
//     name: 'players',
//     created() {
//         this.fetchPlayers()
//         this.fetchEvents()
//     },
//     components: {
//         Player,
//         Event
//     },
//     computed: {
//         ...mapState({
//             players: state => state.playersData,
//             events: state => state.eventsData,
//         })
//     },
//     methods: {
//         ...mapActions(['fetchPlayers', 'fetchEvents', 'createEvent', 'addAttendee']),
        
//     },
    
// }
</script>

<template lang="pug">
div.container.fluid
    div.row
        div.container.col-sm-9
            div.row
                .col-sm-3(v-for='player in players')
                    player(:data='player')
        div.container.col-sm-3.verticalLine
            button(@click='createEvent') createEvent
            div.list-group(v-for='event in events')
                event(:data='event')
</template>


<style>
/* .row {
    box-sizing: content-box;
} */
.container {
  margin-top: 80px;
} 
.col-sm-8 {
  text-align: center;
} 
.verticalLine{
    border-left: solid 1px grey
}
</style>