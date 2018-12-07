import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Landing from './views/Landing.vue'
import About from './views/About.vue'
import SignUp from './views/SignUp.vue'
import Player from './views/Player.vue'
import Event from './views/Event.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'landing',
            component: Landing
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/sign-up',
            name: 'signUp',
            component: SignUp
        },
        {
            path: `/player/:id`,
            name: 'player',
            component: Player
        },
        {
            path: `/event/:id`,
            name: 'event',
            component: Event
        },
    ]
})