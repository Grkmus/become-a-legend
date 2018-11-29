<template lang="pug">
//- div
    //- - var imaj = {{data.imageURL}}
    //- img(v-bind:src = 'data.imageURL')
    //- //- div {{data}}
    //- div {{data.name}}
    //- div {{data.location}}

.card
    .card-body
        h2.card-title#team-name {{data.name}}
        .container
            .row
                .col-sm-8.players
                    .row
                        .col-sm-12#captain
                            img.teamcard-player(:src='data.players[0].imageURL')
                            p {{data.players[0].name}}
                    .row
                        .col-sm-6#player1
                            //- p {{data.players[1].name}}
                        .col-sm-6#player2
                            //- p {{data.players[2].name}}
                .col-sm-4#credits
                    p credits
</template>
<style>
h5 {
    font-size: 1.0rem;
}
#captain > img {
    height: 70px;
    border-radius: 100px;
    position: relative;
    top: 2.5px;
}
#captain > p {
    height: 70px;
    border-radius: 100px;
    position: relative;
    text-align: center;
}
#team-name {
    border-bottom: solid 1px lightgrey;
}
#captain {
    height: 75px;
    border: solid 1px lightgrey;
    display: flex;
} 
#player1 {
    height: 100px;
    border: solid 1px lightgrey;
}
#player2 {
    height: 100px;
    border: solid 1px lightgrey;
}
#credits {
    border-left: solid 1px lightgrey;
}

</style>

<script>
export default {
    name: 'Team',
    props: ['data'],

}
</script>
