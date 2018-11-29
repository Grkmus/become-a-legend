<template lang='pug'>
div(id='app')
  nav.navbar.fixed-top.navbar-expand-lg.navbar-light.bg-light
        a.navbar-brand(href='/') Home
        #navbarSupportedContent.collapse.navbar-collapse
          ul.navbar-nav.mr-auto.pull-right
            li.nav-item
              a.btn.btn-danger(href='/about') Sign Up
            li.nav-item.pull-right
              a.nav-link(href='#') About
            li.nav-item.pull-right
              a.nav-link(href='#') Log in
  router-view
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  padding: 10px;
}


</style>
