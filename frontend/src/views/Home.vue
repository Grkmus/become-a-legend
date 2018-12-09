<template lang='pug'>
div.container
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
          //- button(@click='attend') Attend
          div.list-group(v-for='event in events')
              dailyEvent(:data="event" :key="event._id" v-if='event._id')
              hr
</template>

<script>
import Player from '@/components/PlayerCard.vue'
import dailyEvent from '@/components/EventCard.vue'
import axios from 'axios'
import Faker from 'faker'

export default {
  name: 'home',
  created(){
      this.fetchPlayers()
      this.fetchEvents()
      
  },
  mounted() {
      this.$eventBus.$on('deleteTheEvent', index => {
        this.events.splice(index, 1)  
      })
      // this.$eventBus.$on('timeIsUp', async (index) => {
      //   // this.events.splice(index, 1)
      //   setTimeout(()=> {}, 1000)
      //   const event = (await axios.get(`http://backend.docker.localhost/daily-event/${this.events[index]._id}`)).data
      //   if (event.phase == 'phase2') {
      //     this.events[index] = event  
      //   } else {
      //     this.events.splice(index, 1) 
      //   }

      // })
  },
  data(){
    return {
      players: [],
      events: [],
      eventId: null,
    }
  },
  components: {
    Player,
    dailyEvent
  },
  methods: {
    fetchPlayers: async function(){
      const res = await axios.get('http://backend.docker.localhost/player/all')
      this.players = res.data
    },
    fetchEvents: async function(){
      const res = await axios.get('http://backend.docker.localhost/daily-event/all')
      this.events = res.data
    },
    createEvent: async function(){
      const res = await axios.post('http://backend.docker.localhost/daily-event', {name: 'basketball', date: Date.now(), location: 'Ülker Arena'})
      this.eventId = res.data._id
      this.events.push(res.data)
    },
    // deleteTheEvent: function(index) {
    //   console.log('deleteTheEvent den selamlar', index)
    //   console.log('deleteTheEvent den selamlar', index)
      
    //   console.log(this.events,this.events.length)
    // }
  },
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
