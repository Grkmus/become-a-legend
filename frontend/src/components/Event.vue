<template lang="pug">
//- div
    //- - var imaj = {{data.imageURL}}
    //- img(v-bind:src = 'data.imageURL')
    //- //- div {{data}}
    //- div {{data.name}}
    //- div {{data.location}}
a.list-group-item.list-group-item-action.flex-column.align-items-start(href='#')
  .d-flex.w-100.justify-content-between
    h5.mb-1 
    small Time left 
    h5 {{timeLeft}}
  p.mb-1 

  small Donec id elit non mi porta.
  a.btn.btn-primary(@click='addPlayer') Attend!

    
</template>
<style>
h5 {
    font-size: 1.0rem;
}
</style>

<script>
export default {
    name: 'Event',
    props: ['data'],
    data(){
        return {
            eventTimeString: this.data.date,
        }
    },
    methods: {
        
    }
}
</script>
