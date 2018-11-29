<template lang='pug'>
div.container-fluid
  div.row
      div.col-sm-9
          h4 Players
          div.row
            .col-sm-3(v-for='player in players')
                player(:data='player')
      div.vertical-line.col-sm-3
          //- button(@click='createEvent') createEvent
          h4 Upcoming Events
          button(@click='createEvent') createEvent
          button(@click='attend') Attend
          div.list-group(v-for='event in events')
              event(:data='event')
              hr
</template>

<script>
import Player from '@/components/PlayerCard.vue'
import Event from '@/components/EventCard.vue'
import axios from 'axios'
import Faker from 'faker'

export default {
  name: 'home',
  created(){
      this.fetchPlayers()
      this.fetchEvents()
    },
  data(){
    return {
      players: [],
      events: [],
      eventId: null
    }
  },
  components: {
    Player,
    Event
  },
  methods: {
    fetchPlayers: async function(){
      const res = await axios.get('http://localhost:5000/player/all')
      this.players = res.data
    },
    fetchEvents: async function(){
      const res = await axios.get('http://localhost:5000/daily-event/all')
      this.events = res.data
    },
    createEvent: async function(){
      const res = await axios.post('http://localhost:5000/daily-event', {name: 'basketball', date: (Date.now() + 10000), phase: 'phase1', location: 'Ülker Arena'})
      this.eventId = res.data._id
      this.events.push(res.data)
    },
    attend: async function(){
            for (let i = 0; i < 12; i++) {
              await axios.post(`http://localhost:5000/daily-event/${this.eventId}/attendee`,{_id: this.players[i]._id})
            }
        }
  }
}
</script>

<style>
h4 {
  border-bottom: solid 0.1rem lightgrey
}
.vertical-line {
  border-left: solid 0.1rem lightgrey;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
