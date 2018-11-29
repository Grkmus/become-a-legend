<script>
import { mapActions, mapState } from 'vuex';
import Player from '@/components/Player.vue'

export default {
    name: 'players',
    created() {
        this.fetchPlayers()
    },
    components: {
        Player
    },
    computed: {
        ...mapState({
            players: state => state.data,
        })
    },
    methods: {
        ...mapActions(['fetchPlayers']),
    }
}
</script>

<template lang="pug">
div.container
    div.row
        .col-sm-3(v-for="player in players")
            player(:data='player')
</template>


<style>
/* .row {
    box-sizing: content-box;
} */
.container {
  margin-top: 80px;
} 
</style>