<template lang='pug'>
.container.emp-profile
  form(method='post')
    .row
      .col-md-4
        .profile-img
          img(v-bind:src='player.imageURL', alt='')
          .file.btn.btn-lg.btn-primary
            | Change Photo
            input(type='file', name='file')
      .col-md-6
        .profile-head
          h5
            | {{player.name}} {{player.surname}}
          p.proile-rating
            | RANKINGS : 
            span {{player.ratingEvaluation}}/10
          ul#myTab.nav.nav-tabs(role='tablist')
            li.nav-item
              a#home-tab.nav-link.active(data-toggle='tab', href='#home', role='tab', aria-controls='home', aria-selected='true') About
            li.nav-item
              a#profile-tab.nav-link(data-toggle='tab', href='#profile', role='tab', aria-controls='profile', aria-selected='false') Timeline
      .col-md-2
        input.profile-edit-btn(type='submit', name='btnAddMore', value='Edit Profile')
    .row
      .col-md-4
        .profile-work
          p WORK LINK
          a(href='') Website Link
          br
          a(href='') Bootsnipp Profile
          br
          a(href='') Bootply Profile
          p SKILLS
          a(href='') Web Designer
          br
          a(href='') Web Developer
          br
          a(href='') WordPress
          br
          a(href='') WooCommerce
          br
          a(href='') PHP, .Net
          br
      .col-md-8
        #myTabContent.tab-content.profile-tab
          #home.tab-pane.fade.show.active(role='tabpanel', aria-labelledby='home-tab')
            .row
              .col-md-6
                label User Id
              .col-md-6
                p {{player._id}}
            .row
              .col-md-6
                label Name
              .col-md-6
                p {{player.name}} {{player.surname}}
            .row
              .col-md-6
                label Email
              .col-md-6
                p {{player.email}}
            .row
              .col-md-6
                label Phone
              .col-md-6
                p 123 456 7890
            .row
              .col-md-6
                label Profession
              .col-md-6
                p Web Developer and Designer
          #profile.tab-pane.fade(role='tabpanel', aria-labelledby='profile-tab')
            .container-fluid
              p selams


</template>

<script>
import axios from 'axios'

export default {
  name: 'profile',
  async created(){
    await this.fetchPlayer(this.$route.params.id)
  },
  data(){
    return {
      player: {}
    }
  },
  methods: {
    fetchPlayer: async function(id) {
      const res = await axios.get(`http://localhost:5000/player/${id}/json`)
      this.player = res.data
    }
  }

}
</script>

<style>

.emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
}
.profile-img{
    text-align: center;
}
.profile-img img{
    width: 70%;
    height: 100%;
}
.profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
}
.profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
}
.profile-head h5{
    color: #333;
}
.profile-head h6{
    color: #0062cc;
}
.profile-edit-btn{
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
}
.proile-rating{
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}
.proile-rating span{
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}
.profile-head .nav-tabs{
    margin-bottom:5%;
}
.profile-head .nav-tabs .nav-link{
    font-weight:600;
    border: none;
}
.profile-head .nav-tabs .nav-link.active{
    border: none;
    border-bottom:2px solid #0062cc;
}
.profile-work{
    padding: 14%;
    margin-top: -15%;
}
.profile-work p{
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
}
.profile-work a{
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}
.profile-work ul{
    list-style: none;
}
.profile-tab label{
    font-weight: 600;
}
.profile-tab p{
    font-weight: 600;
    color: #0062cc;
}
</style>
