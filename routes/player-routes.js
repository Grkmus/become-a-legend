const express = require('express')
      router  = express.Router()

//Player Identity form
router.get('/player/:id/quiz', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    res.render('playerQuizForm', { player })
})

//Player Identity form post
router.post('/player/:id/quiz', (req, res) => {
    const quizData = req.body
    quizData.rolePreference = quizData.rolePreference.split(',')
    PlayerService.takeQuiz(quizData, req.params.id)
    res.redirect('/player/' + req.params.id)
})

//Find all Players
router.get('/player/all', async (req, res) => {
    const players = await PlayerService.findAll()
    res.render('player', { players: players })
})

//Add a Player
router.post('/player', async (req, res) => {
    const player = await PlayerService.add(req.body)
    res.send(player)
})

//Find a player
router.get('/player/:id', async (req, res) => {
    const player = await PlayerService.find(req.params.id)
    //console.log(player.quizEvaluation !== null)
    res.render('playerProfile', { player })
})

//Delete a player
router.delete('/player/:id', async (req, res) => {
    const playerId = await PlayerService.del(req.params.id)
    //console.log(playerId)
    res.send(playerId)
})
