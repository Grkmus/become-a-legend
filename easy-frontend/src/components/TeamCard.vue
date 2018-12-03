<template lang="pug">
//- div
    //- - var imaj = {{data.imageURL}}
    //- img(v-bind:src = 'data.imageURL')
    //- //- div {{data}}
    //- div {{data.name}}
    //- div {{data.location}}

.card(v-if='isLoaded' v-bind:class="{ border: isActive, 'border-primary': isActive}" )
    .card-body
        h2.card-title#team-name.border-bottom {{data.name}}
        .container
            .row
                .col-sm-8
                    .row
                        .col-sm-3
                        .col-sm-6.border-bottom#captain
                            img.rounded-circle.mx-auto.d-block.img-fluid.img-thumbnail(:src='team.players[0].imageURL')
                            p {{team.players[0].name}} {{team.players[0].ratingEvaluation}}
                        .col-sm-3
                    .row.players
                        .col-sm-6#player1
                            img.rounded-circle.mx-auto.d-block.img-fluid.img-thumbnail(:src='team.players[1].imageURL' v-if='team.players[1]')
                            p(v-show='team.players[1]' v-if='team.players[1]') {{team.players[1].name}} {{team.players[1].ratingEvaluation}}
                        .col-sm-6#player2.border-left(v-if='team.players[2]')
                            img.rounded-circle.mx-auto.d-block.img-fluid.img-thumbnail(:src='team.players[2].imageURL')
                            p {{team.players[2].name}} {{team.players[2].ratingEvaluation}}
                .col-sm-4#credits.border-left
                    p remaining credits
                    h2 {{team.credits}}
                    button.btn.btn-primary(@click='skipTheTurn' v-if="isActive") Skip turn

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
export default {
    name: 'Team',
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
            isActive: false
        }
    },
    mounted(){
        this.team = this.data
        // this.captain = this.data.players[0]
        this.isLoaded = true
        this.isActive = false
    },
    methods: {
        skipTheTurn: function(){
            this.$eventBus.$emit('skipTheTurn')
        }
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
