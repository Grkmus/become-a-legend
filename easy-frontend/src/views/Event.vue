<template lang='pug'>
div.event
  nav(aria-label='...')
    ul.pagination.pagination-lg
      li.page-item(v-bind:class="{ active: event.phase == 'phase1', disabled: event.phase != 'phase1' }")
        a.page-link(href='#', tabindex='-1') Phase 1
      li.page-item(v-bind:class="{ active: event.phase == 'phase2', disabled: event.phase != 'phase2' }" )
        a.page-link(href='#') Phase 2
  .card
    .card-body
      h1.card-title {{event.name}} Daily Event
      //- h2.card-subtitle(v-if='expired') {{time.days}} days {{time.hours}}h : {{time.minutes}}m : {{time.seconds}}s left to join!
      h6.card-subtitle.mb-2.text-muted Date: {{realDate}} 
      h6.card-subtitle.mb-2.text-muted Time: {{time}}
      h6.card-subtitle.mb-2.text-muted Location: {{event.location}}
      p.card-text(v-if='!expired') EXPIRED!
      p.card-text(v-if='expired') {{timeLeft}} left to join
      a.card-link(href='#') Card link
      a.card-link(href='#') Another link
  h2 {{attendeesCount}} people has joined
  div.container-fluid
    div.row
      .col-sm-4
        div.row.players
          .col-sm-3(v-for='player in event.attendees')
            a
              img.player(:src='player.imageURL' @click='goToPlayer(player._id)')
      .col-sm-8
        .container-fluid
          .row
            .col-sm-6(v-for='team in event.teams')
              team(:data='team')


</template>

<script>
import axios from 'axios'
import Player from '@/components/PlayerCard.vue'
import Team from '@/components/TeamCard.vue'
import router from '@/router.js'

export default {
  name: 'event',
  async created(){
    await this.fetchEvent(this.$route.params.id)
    this.calculateTimeLeft()
  },
  data(){
    return {
      event: {},
      timeLeft: {
        days: 0,
        hours: 0,
        minutes:0,
        seconds: 0,
      },
      expired: true,
      attendeesCount: 0,
    }
  },
  components: {
    Player,
    Team
  },
  methods: {
    fetchEvent: async function(id) {
      console.log('naber')
      const res = await axios.get(`http://localhost:5000/daily-event/${id}`)
      this.event = res.data
      this.attendeesCount = res.data.attendees.length
    },
    calculateTimeLeft: function(){
            const eventTime =new Date(this.event.date).getTime()
            const interval = setInterval(() => {
              let distance =  eventTime - Date.now()
              this.timeLeft.days = Math.floor(distance / (1000 * 60 * 60 * 24));
              this.timeLeft.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              this.timeLeft.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              this.timeLeft.seconds = Math.floor((distance % (1000 * 60)) / 1000)
                if (distance < 0 ) {
                  this.expired = false
                  this.fetchEvent(this.event._id)
                  clearInterval(interval)
                }
            },1000)
            return interval
    },
    goToPlayer: function(_id) {
      router.push({
        name: 'player',
        params: { id: _id }
      })
    },
  },
  computed: {
        realDate: function(){
            const eventTime =new Date(this.event.date)
            return eventTime.toLocaleDateString()
        },
        time: function(){
            const eventTime =new Date(this.event.date)
            return eventTime.toLocaleTimeString()
        },
    }



}
</script>

<style>
/* .players {
  border-top: solid 1px lightgrey;
  padding: 10px;
} */
.player {
  border-radius: 70px;
}
.pagination {
  margin-left: 20px;
  margin-top: 10px;
}
.card {
  text-align: center;
  width: auto;
  margin: 20px;
}
</style>
