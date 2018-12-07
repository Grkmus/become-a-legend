<template lang='pug'>
div(id='app')
  nav.navbar.fixed-top.navbar-expand-lg.navbar-light.bg-light
        router-link.navbar-brand(to="/home") Home
        #navbarSupportedContent.collapse.navbar-collapse
          ul.navbar-nav.mr-auto.pull-right
            li.nav-item
              router-link.btn.btn-danger(to='/sign-up') Sign Up
            li.nav-item.pull-right
              router-link.nav-link(to='/about') About
            li.nav-item.pull-right
              router-link.nav-link(to='#') Log in
  
  router-view
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
// import Player from '@/components/PlayerCard.vue'
// import Event from '@/components/EventCard.vue'
// import Home from '@/views/Home.vue'

export default {
  name: 'app',
  // created(){
  //     this.fetchPlayers()
  //     this.fetchEvents()
  //   },
  // data(){
  //   return {
  //     players: [],
  //     events: []
  //   }
  // },
  // components: {
  //   Home
  // },
  // methods: {
  //   fetchPlayers: async function(){
  //     const res = await axios.get('http://localhost:5000/player/all')
  //     this.players = res.data
  //   },
  //   fetchEvents: async function(){
  //     const res = await axios.get('http://localhost:5000/daily-event/all')
  //     this.events = res.data
  //   },
  //   createEvent: async function(){
  //     const res = await axios.post('http://localhost:5000/daily-event', {name: 'basketball', date: (Date.now()+10000)})
  //     this.events.push(res.data)
  //   }

  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
