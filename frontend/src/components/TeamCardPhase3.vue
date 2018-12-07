<template lang="pug">
//- div
    //- - var imaj = {{data.imageURL}}
    //- img(v-bind:src = 'data.imageURL')
    //- //- div {{data}}
    //- div {{data.name}}
    //- div {{data.location}}

.card(v-if='isLoaded')
    .card-body
        h3.card-title#team-name.border-bottom {{data.name}}
        .container
            .row
                .col-sm-4
                    img.rounded-circle.mx-auto.d-block.img-fluid.img-thumbnail(:src='team.players[0].imageURL'  @click='goToPlayer(team.players[0]._id)')
                    p {{team.players[0].name}}
                .col-sm-4
                    img.rounded-circle.mx-auto.d-block.img-fluid.img-thumbnail(:src='team.players[1].imageURL' @click='goToPlayer(team.players[1]._id)')
                    p {{team.players[1].name}}
                .col-sm-4
                    img.rounded-circle.mx-auto.d-block.img-fluid.img-thumbnail(:src='team.players[2].imageURL' @click='goToPlayer(team.players[2]._id)')
                    p {{team.players[2].name}}
            

</template>
<style>
.center {
    margin-top: 12.8px;
    display: flex;  
}
#captain {
    padding-left: 0px;
    padding-right: 0px;
    margin: 10px;

}
.players {
    height: 126px;  
}  
#player1 {
    height: 126px;
    margin-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
    height: 100%;
}
#player2 {
    height: 126px;
    margin-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
}

</style>

<script>
import router from '@/router.js'
export default {
    name: 'TeamPhase3',
    props: ['data'],
    created(){
    },
    data(){
        return {
            team: {
                name: String,
                players: [{
                    name: String,
                    ratingEvaluation: Number
                }],
                credits: Number
            },
            isLoaded: false,
        }
    },
    mounted(){
        this.team = this.data
        // this.captain = this.data.players[0]
        this.isLoaded = true
    },
    methods: {
        skipTheTurn: function(){
            this.$eventBus.$emit('skipTheTurn')
        },
        goToPlayer: function(_id) {
            router.push({
                name: 'player',
                params: { id: _id }
            })
        },
    },
    computed: {
        // captain() {
        //     return this.team.players[0]
        // },
        // player1() {
        //     return this.team.players[1]
        // },
        // player2() {
        //     return this.team.players[2]
        // }
        
    }
}
</script>
