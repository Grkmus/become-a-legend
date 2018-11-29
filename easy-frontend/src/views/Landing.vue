<template lang='pug'>
.jumbotron
    h1.display-4 Welcome to the "Become a Legend!" {{username}}
    p.lead
      | Platform for doing sports with people while 
      | keeping track of your performance. 
      | It is designed for amateur sportsman who 
      | always having difficulties to find people to 
      | do sports with. You can get in a team 
      | according to your performance points. 
      | Organize sport events, between teams or 
      | other sport lovers. Compete in a league
      | in any sport with your team or solo.
    hr.my-4
    p
      | You can be a legend! {{name}}
    router-link.btn.btn-primary.btn-lg(to='/about', role='button') Learn more
</template>

<script>

export default {
  name: 'landing',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
