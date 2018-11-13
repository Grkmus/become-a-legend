const express = require('express')
      router  = express.Router()

//landing page
router.get('/', (req, res) => {
    res.render('index')
})

//show registration form
router.get('/register', (req, res) => {
    res.render('preRegistration')
})

//post registration form 
router.post('/register', async (req, res) => {
    const player = await PlayerService.add({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email
    })
    res.redirect('/player/' + player._id)
})