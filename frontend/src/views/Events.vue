<script>
import { mapActions, mapState } from 'vuex';
import Event from '@/components/Event.vue'

export default {
    name: 'players',
    created() {
        this.fetchEvents()
    },
    components: {
        Player
    },
    computed: {
        ...mapState({
            events: state => state.data,
        })
    },
    methods: {
        ...mapActions(['fetchEvents']),
    }
}
</script>

<template lang="pug">
div.container
    div.row
        .col-sm-3(v-for="event in events")
            player(:data='event')
</template>


<style>
/* .row {
    box-sizing: content-box;
} */
.container {
  margin-top: 80px;
} 
</style>