<template lang="pug">
//- div
    //- - var imaj = {{data.imageURL}}
    //- img(v-bind:src = 'data.imageURL')
    //- //- div {{data}}
    //- div {{data.name}}
    //- div {{data.location}}

.card.mb-4.shadow-sm
    img.card-img-top(v-bind:src = 'data.imageURL', alt='Card image cap')
    .card-body
        h5.card-title {{data.name}} {{data.surname}}
        .d-flex.justify-content-between.align-items-center
        router-link.btn-sm.btn-secondary(:to="{ name: 'player', params: { id: data._id }}") View Profile
</template>
<style>
h5 {
    font-size: 1.0rem;
}
</style>

<script>
export default {
    name: 'player',
    props: ['data'],

}
</script>
