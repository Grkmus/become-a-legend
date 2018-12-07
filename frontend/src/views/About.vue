<template lang='pug'>
div.about
  h1 Become a legend
  p
    | Platform for doing sports with people while keeping track of your performance. It is designed for amateur sportsman who always having diSfficulties to find people to do sports with. You can get in a team according to your performance points. Organize sport events, between teams or other sport lovers. Compete in a league in any sport with your team or solo.
  p You can be a legend!
  p explanation for user, step by step.
  h2 1. Authentication
  p Before the acces users must verify their accounts.
  p Personal contact information
  ul
    li Name
    li Surname
    li e-mail
  p
    | After pre-registration user will wait for approval, application will check the information in any method selected and confirm the pre-registration.
  p
    | After confirmation, user will have acces to the aplication but only to the profile page. To attend any events user has to fill the form with the questions below.
  h2 Player Identity Form
  h3 Personal Information
  ul
    li Age
    li Weight
    li Height
    li Picture (optional)
    li location
    li telephone
  h3 Athletic Information
  p
    | Questions below are going to be evaluated 10 to 2 points on a players profile. First options of these question has a value equal to 10, seconds 8 thirds 4 and lasts 2 points. And the average value will be stored at users character page.
  h4 Last participation in any sport
  ol
    li Week,
    li Month,
    li Year,
    li Decade
  h4 Frequency of participation
  ol
    li More than twice in a week
    li Once a week
    li Once in a month
    li What does the sport means?
  h4 Last participation in basketball
  ol
    li Week ago
    li Month ago
    li Year ago
    li Decade ago
  h4 Health Condition
  ol
    li Perfectly Healthy
    li Minor problems
    li Major problems
    li Risky
  h4 Personal Skills
  p
    | Users going to answer these questions to 1 to 10 and they will be stored in character page as an average value of these three answers.
  ul
    li Power (1 to 10)
    li Speed(1 to 10)
    li Stamina(1 to 10)
  h4 Basketball Skills
  p
    | These answers will also stored at users character page as a ghost value in users skill chart, real value will applied to the chart with the other players evaluations.
  ul
    li Handling (1 to 10)
    li Offense (1 to 10)
    li Defense (1 to 10)
    li Teamplay (1 to 10)
    li Individual skill (1 to 10)
  h4 Role preference
  p
    | A user can apply for every position but they has to sort the positions from most to least. And these information will added to the character page of users.
  ul
    li Post
    li Forward
    li Guard
    li Refree
  p After filling the form correctly user will be ready for events.
  h3#2events 2-Events
  p
    | There will be two types of events in the application, Daily event and Major League. And before the Major league there will be preseason matches for one week.
  h4#dailyevents Daily events
  p
    | Daily events will have two types. First type of events will organised by application and second type of daily events organised by users.
  ul
    li Automatic Events
  p The Application will automatically invite the players. There will three phases to organize an event.</p>
  ol
    li Phase1
  p When the event created it will automatically trigger phase 1. In that phase, the application will wait for attendees to join. The registeration for the event will be open for 1 week for all players. At the end of the one week the application will check if at least 12 people joined or not. According to that information it will cancel the event or pass the event to phase2.
    | The Number must be at least %50 more then the number which necessery for organisation. For 26 persons organisation program will invite 39 user at least, these are the minimum numbers. Minimum organisations will require 6 teams and 2 refrees, teams must have 4 players(3 main + 1 substitute), team creation will made by the captains. Team captain will be determined by their quiz points. Captains will have 300 credit points in total, and they will spent it by purchasing other players including themselves with these credits. Lowest valued captain will have the chance to purchase first and highest valued captain will purchase last. After the assemble, captains can switch players, only one switch allowed per team. Court and time will organised by the administers, if event will take place in a private court users will pay a participation fee before the organisation via credit cards. Refrees wont pay the fee. Match schedule will be created by application randomly. Matches will be played on two periods both longs 10 min. and 5 min half time. Events may include a prize for winner.
  ul
    li Personal Events
  p
    | Personal events will organised by verified users, user have to participate at least 5 events to get verified, the regulations will be optional.
  h4#majorleague Major League
  p
    | Major League will last 11 weeks and plus one preseason week. Major league will have with two groups which have 12 teams each. And it will be twice in a year, in autmn and spring. Major league will have an entrance cost for the courts and refrees. Team creation will be same as the daily events. Rules and match times will be same as Automatic events. After creation of teams, pre-season will start. Preseason will be contain 4 automatic events, participation for these events will be optional(This is for warming up the teams). After pre-season group stages will start and group stage will last 6 weeks. Champions and second teams of groups will directly attend to the quarterfinals. Thirds and fourths will attend elimination stage. Fifths and sixths will attend play-offs. In play-offs teams will match againist the teams from other group, and winners will be qualified for the elimination stage. In Play-offs, eliminations and quarterfinals games played as a only one match, in semi finals games will turn to best of tree and at final game will be best of five. Major league will have fixed day and time and it will be weekly organisation. After the finals ceremony will take place. In any case of absence, captains will chose another player who has the same value of absent player's.
  p all the process are going to be monitored from the application
  h3 3. Evaluation
  p
    | After every event or match, application will send an evaluation form to the users. Users will evaluate other users who they played against. Form includes basketball skill and overall rating. Both will be evaluated to 1 to 10. These will be optional but highly recommended.

</template>

<script>
export default {
  name: 'about'
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
