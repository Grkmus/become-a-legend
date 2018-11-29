<template lang="pug">
.card.text-left
    div.container.card-header.card-title {{data.name}} Event!
    .card-body
        div.container
            div.row
                div.col-sm-8
                    p.card-text.date Date: {{realDate}} 
                    p.card-text.date Time: {{time}} 
                    p.card-text Location: {{data.location}}
                div.col-sm-4.people
                    p.center Number of people
                    h5.card-title.center {{data.attendees.length}}
    .card-footer
        router-link.btn.btn-sm.btn-primary(:to="{ name: 'event', params: { id: data._id }}") Go to event
        //- ul.list-group
        //-     li.list-group-item event: {{data.name}}
        //-     li.list-group-item Date: {{data.date}}
        //-     li.list-group-item Location: {{data.location}}
        //-     li.list-group-item {{data.attendees.length}} people has joined
        //-     li.list-group-item {{data._id}}
        //- router-link.btn-sx.btn-primary(:to="{ name: 'event', params: { id: data._id }}") Go to event
</template>

<style>
.center {
    text-align: center;
    margin: auto;
}
.event {
    font-size: 0.8rem;
    text-align: left
}
.event-button {
    position: relative;
    left: 20px;
}
.people {
    border-left: solid 1px;
}
.card-body {
    padding: 5px;
    font-size: 0.8rem
}
.date {
    margin-bottom: 1px;
}

</style>

<script>
export default {
    name: 'Event',
    props: ['data'],
    data(){
        return {
            eventTimeString: this.data.date,
            timeLeft: null,
            eventId : this.data._id
        }
    },
    methods: {
        
        
    },
    computed: {
        realDate: function(){
            const eventTime =new Date(this.eventTimeString)
            return eventTime.toLocaleDateString()
        },
        time: function(){
            const eventTime =new Date(this.eventTimeString)
            return eventTime.toLocaleTimeString()
        }
    }
}
</script>
