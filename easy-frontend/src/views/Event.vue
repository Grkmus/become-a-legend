<template lang='pug'>
div.event
  div.container
    nav(aria-label='...')
      ul.pagination.pagination-lg
        li.page-item(v-bind:class="{ active: event.phase == 'phase1', disabled: event.phase != 'phase1' }")
          a.page-link(href='#', tabindex='-1') Phase 1
        li.page-item(v-bind:class="{ active: event.phase == 'phase2', disabled: event.phase == 'phase3' }" )
          a.page-link(href='#', @click.once="fetchEventPhase2") Phase 2
        li.page-item(v-bind:class="{ active: event.phase == 'phase3', disabled: event.phase != 'phase3' }" )
          a.page-link(href='#') Phase 3
    .card#eventTitle
      .card-body  
        h1.card-title {{event.name}} Daily Event
        h6.card-subtitle.mb-2.text-muted Date: {{realDate}} 
        h6.card-subtitle.mb-2.text-muted Time: {{time}}
        h6.card-subtitle.mb-2.text-muted Location: {{event.location}}
    h2(v-if="event.phase == 'phase1'") {{attendeesCount}} people has joined
    img(src="@/assets/giphy.gif" v-if='loading')
    div.row(v-if='!loading')
      div(v-for='player in event.attendees' v-if="event.phase == 'phase1'" )
        img.player(:src='player.imageURL' @click='goToPlayer(player._id)')
        p(style='text-align: center') {{player.name}} {{player.ratingEvaluation}}
      .col-sm-4(v-if="event.phase == 'phase2'")
        .card#players
          .card-body
            h2 {{attendeesToBeSelectedCount}} people to be picked
            .row
              template(v-for='player in event.attendeesToBeSelected')
                //- img.player.rounded-circle.mx-auto.d-block.img-fluid(:src='player.imageURL' @click='goToPlayer(player._id)')
                //- p {{player.name}} {{player.ratingEvaluation}}
                playerEventCard(:data='player' :key='player._id') 
      .col-sm-8.teams(v-if="event.phase == 'phase2'")
        .card#teams
          .card-body
            h2 {{teamCount}} teams gonna play
            .row
              .col-sm-6(v-for='team in event.teams')
                team(:data='team' ref='teams')
      .col-sm-8.teams(v-if="event.phase == 'phase3'")
        .card#teams
          .card-body
            h2 PHASE 3!!!
            .row
              .col-sm-6(v-for='team in event.teams')
                team(:data='team' ref='teams')



</template>

<script>
import axios from 'axios'
import Player from '@/components/PlayerCard.vue'
import PlayerEventCard from '@/components/PlayerEventCard.vue'
import Team from '@/components/TeamCard.vue'
import router from '@/router.js'

export default {
  name: 'event',
  // created(){
  //   this.fetchEvent(this.$route.params.id)
  // },
  data(){
    return {
      event: {
        teams: [
          {players: Array}
        ],
        attendeesToBeSelected: [{
          ratingEvaluation: Number
        }],
        turn: 0
      },
      loading: false,
    }
  },
  mounted(){
    this.fetchEvent(this.$route.params.id)
    this.$watch('event', (newVal, oldVal) => {
      if (newVal.phase == 'phase2') this.startPlayerSelection()
    })

    // this.$watch('event.turn', newVal => {
    //   console.log(newVal)
    //   this.canPick(newVal)
    // })
    
    this.$watch('event.attendeesToBeSelected.length', async(newVal) => {
      console.log(newVal, Math.abs(this.event.attendees.length - this.event.teams.length * 3))
      if(this.event.teams[0].players.length > 1 && newVal == Math.abs(this.event.attendees.length - this.event.teams.length * 3)) {
        this.event.phase = 'phase3'
        await axios.put(`http://localhost:5000/daily-event/${this.event._id}`, this.event )
      }
    })

    this.$eventBus.$on('captainSelectPlayerToEvent', async (id) => {
      const indexPlayer = this.event.attendeesToBeSelected.findIndex(attendee => {
          return attendee._id.toString() == id.toString() 
      })
      const selectedPlayer = this.event.attendeesToBeSelected[indexPlayer]
      const selectedTeam = this.event.teams[this.event.turn]
      if(selectedTeam.credits < selectedPlayer.ratingEvaluation) {
          alert('Your credit is not enough')
          throw new Error('Your credit is not enough')
      }
      this.event.attendeesToBeSelected.splice(indexPlayer, 1)
      selectedTeam.credits = (selectedTeam.credits - selectedPlayer.ratingEvaluation).toFixed(2)
      selectedTeam.players.push(selectedPlayer)

      this.event.turn++
      this.$refs.teams[this.event.turn-1].isActive = false
      
      if(this.event.turn == this.event.teams.length) this.event.turn = 0
      
      this.$refs.teams[this.event.turn].isActive = true
      await axios.put(`http://localhost:5000/team/${selectedTeam._id}`, selectedTeam)
      await axios.put(`http://localhost:5000/daily-event/${this.event._id}`, this.event )
    })

    this.$eventBus.$on('skipTheTurn', this.skipTheTurn)
  },
  beforeDestroy: function () {
    this.$eventBus.$off('captainSelectPlayerToEvent')
    this.$eventBus.$off('skipTheTurn')
  },
  components: {
    Player,
    Team,
    PlayerEventCard,
  },
  methods: {
    fetchEvent: async function(id) {
      this.loading = true
      const res = await axios.get(`http://localhost:5000/daily-event/${id}`)
      this.event = res.data
      this.loading = false
    },
    fetchEventPhase2: async function(id) {
      this.loading = true
      const res = await axios.post(`http://localhost:5000/daily-event/phase2/`, {_id: this.event._id})
      this.event = res.data
      this.teams = res.data.teams
      this.turn = res.data.turn
      this.loading = false
    },
    startPlayerSelection: function() {
      this.$refs.teams[this.event.turn].$data.isActive = true
    },
    goToPlayer: function(_id) {
      router.push({
          name: 'player',
          params: { id: _id }
      })
    },
    skipTheTurn: async function() {
      this.event.turn++
      this.$refs.teams[this.event.turn-1].isActive = false
      
      if(this.event.turn == this.event.teams.length) this.turn = 0
      
      this.$refs.teams[this.event.turn].isActive = true
      await axios.put(`http://localhost:5000/daily-event/${this.event._id}`, this.event)
    },
    canPick: function(turn) {
      this.event.attendeesToBeSelected.forEach(player => {
        if(this.event.teams[turn].credits < player.ratingEvaluation) {
          this.skipTheTurn()
          alert('There is no player that you can pick.. sorry..')
        }
      });
    }
    // playerValidation: function(selectedPlayer, selectedTeam, indexPlayer) {
    //   return new Promise((resolve, reject) => {

    //     if(selectedTeam.credits < selectedPlayer.ratingEvaluation) {
    //       reject('Your credit is not enough')
    //       alert('Your credit is not enough')
    //       throw new Error('Your credit is not enough')
    //     }
    //     this.event.attendeesToBeSelected.splice(indexPlayer, 1)
    //     selectedTeam.credits = (selectedTeam.credits - selectedPlayer.ratingEvaluation).toFixed(2)
    //     selectedTeam.players.push(selectedPlayer)
    //     resolve(selectedTeam)
    //   })
    // }
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
        teamCount: function(){
            return this.event.teams.length
        },
        attendeesCount: function(){
          return this.event.attendees.length
        },
        attendeesToBeSelectedCount: function(){
          return this.event.attendeesToBeSelected.length
        }
    },
  
}
</script>

<style>
#eventTitle {
  margin-bottom:15px;
}
#teams .card {
  margin: 10px;
}
.teams {
  padding-left: 0px;
}
.card {
  text-align: center;
}
.card-body {
  padding: 10px;
}

/* #players, #teams {
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
  margin: 10px;
  padding: 10px;
} */
/* .players {
  border-top: solid 1px lightgrey;
  padding: 10px;
} */
 .player {
  border-radius: 70px;
}

/*
.pagination {
  margin-left: 20px;
  margin-top: 10px;
}
.card {
  text-align: center;
  width: auto;
  margin: 20px;
} */
</style>
