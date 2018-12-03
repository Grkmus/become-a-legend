<template lang="pug">
.card.text-left
    div.container.card-header.card-title {{event.name}} Event!
    .card-body
        div.container
            div.row
                div.col-sm-8
                    p.card-text.date Date: {{realDate}} 
                    p.card-text.date Time: {{time}} 
                    p.card-text Location: {{event.location}}
                div.col-sm-4.people
                    p.center Number of people 
                    h5.card-title.center {{attendeesCount}}
                    
                    
    .card-footer
        //- p.card-text {{daysLeft}} Days {{hoursLeft}} hours {{minutesLeft}} minutes {{secondsLeft}} seconds Left to join
        router-link.btn.btn-sm.btn-primary(:to="{ name: 'event', params: { id: data._id }}") Go to event
        button(@click="attend" v-if="event.phase == 'phase1'") attend
        button(@click="deleteTheEventFromCard") delete the event
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
    name: 'dailyEvent',
    props: ['data'],
    data(){
        return {
            event: this.data,
            attendeesCount: this.data.attendees.length,
            distance: 0
        }
    },
    created() {
        // this.distanceFnc()
    },
    methods: {
        attend: async function(){
            for (let i = 0; i < 50; i++) {
                const res = await axios.post(`http://localhost:5000/daily-event/${this.event._id}/attendee`,{_id: this.$parent.players[i]._id})
                this.attendeesCount ++
            }
        },
        deleteTheEventFromCard: async function(){
            const index = this.$parent.events.indexOf(this.event)
            this.$eventBus.$emit('deleteTheEvent', index)
            await axios.delete(`http://localhost:5000/daily-event/${this.event._id}`)      
        },
        // distanceFnc: function(){
        //     const interval = setInterval(() => {
        //         const eventTime =new Date(this.data.date).getTime()
        //         this.distance = eventTime - Date.now()
        //         if (this.distance < 0) {
        //             this.expired = true
        //             const index = this.$parent.events.indexOf(this.event) 
        //             clearInterval(interval)
        //             this.$eventBus.$emit('timeIsUp', index)
        //         }
        //     }, 1000)
        //     return interval
        // }
        
    },
    computed: {
        realDate: function(){
            const eventTime =new Date(this.event.date)
            return eventTime.toLocaleDateString()
        },
        time: function(){
            const eventTime =new Date(this.event.date)
            return eventTime.toLocaleTimeString()
        },
        // daysLeft: function(){
        //   return Math.floor(this.distance / (1000 * 60 * 60 * 24))
        // },
        // hoursLeft: function(){
        //   return Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // },
        // minutesLeft: function(){
        //   return Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
        // },
        // secondsLeft: function() {
        //   return Math.floor((this.distance % (1000 * 60)) / 1000)
        // }
    }
}
</script>
