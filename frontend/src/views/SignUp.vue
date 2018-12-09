<template lang='pug'>
.main.container
    .row
      .col-md-6.col-md-offset-3
        h1.display-4.m-b-2 Sign Up

        // register form
        form(@submit.prevent='getFormValues' method='POST' action='/register' id='forms')
          div.form-group
            label(for='name') Name:
            input.form-control(type='text', placeholder='name' name='name')
          div.form-group
            label(for='surname') Surname:
            input.form-control(type='text', placeholder='surname' name='surname')
          div.form-group
            label(for='email') Email:
            input.form-control(type='email', placeholder='name@email.com' name='email')
          div.form-group
            label(for='imageURL') ImageURL:
            input.form-control(type='url', placeholder='imageURL' name='imageURL')
          div.form-group
            label(for='pw') Password:
            input.form-control(type='password' name='password')
          div.form-group
            label(for='pw2') Confirm Password:
            input.form-control(type='password' name='confirmPassword')
          button.btn.btn-primary(type='submit') Sign up
</template>

<script>
import router from '../router.js'

export default {
  name: 'signUp',
  methods: {
    getFormValues: async function (submitEvent) {
      const formElements = submitEvent.target.elements
      console.log(formElements[3].value)
      const player = {
        name: formElements[0].value,
        surname: formElements[1].value,
        email: formElements[2].value,
        imageURL: formElements[3].value
      }
      console.log(player)
      const res = await axios.post('http://backend.docker.localhost/register', player )
      console.log(res.data)
      router.push({
        name: 'player',
        params: { id: res.data._id }
      })
    }
  }
}
</script>

<style>
.about {
  text-align: left
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
