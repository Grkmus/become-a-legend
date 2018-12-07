<template lang="pug">
//- div
    //- - var imaj = {{data.imageURL}}
    //- img(v-bind:src = 'data.imageURL')
    //- //- div {{data}}
    //- div {{data.name}}
    //- div {{data.location}}
.col-sm-4
    img.player.rounded-circle.mx-auto.d-block.img-fluid(:src='data.imageURL' @click='goToPlayer(data._id)')
    p(style='margin-bottom: 0px') {{data.name}} {{data.ratingEvaluation}}
    .btn.btn-secondary.btn-sm(@click="$emit('selectPlayer', data._id)") Select

</template>
<style>
h5 {
    font-size: 1.0rem;
}
</style>

<script>
import router from '@/router.js'
export default {
    name: 'playerEventCard',
    props: ['data'],
    methods: {
        // captainSelectPlayer: function() {
        //     this.$emit('handleSelect', this.data._id)
        // },
        goToPlayer: function(_id) {
            router.push({
                name: 'player',
                params: { id: _id }
            })
        },
    }
}
</script>
