const express = require('express')
      router  = express.Router()

//Find all teams
router.get('/team/all', async (req, res) => {
    const teams = await TeamService.findAll()
    //console.log(teams)
    res.render('team', { teams })
})

//Add a team
router.post('/team', async (req, res) => {
    const team = await TeamService.add()
    //console.log(team)
    res.send(team)
})

//find a team
router.get('/team/:id', async (req, res) => {
    const team = await TeamService.find(req.params.id)
    //console.log(team)
    res.render('teamProfile', { team })
})

//delete a team
router.delete('/team/:id', async (req, res) => {
    const teamId = await TeamService.del(req.params.id)
    //console.log('team successfully deleted: ' + teamId)
    res.send(teamId)
})