import test from 'ava'
import request from 'supertest'
import app from '../app'


test('Create a player', async t => {
    const playerToCreate = { name: 'Görkem', surname: 'Tosun' }

    const res = await request(app)
        .post('/player')
        .send(playerToCreate)

    t.is(res.status, 200)
    t.is(res.body.name, playerToCreate.name)
    t.is(res.body.surname, playerToCreate.surname)
})

test('Get list of all player', async t => {
    const playerToCreate = { name: 'Görkem', surname: 'Tosun' }

    const creation = await request(app)
        .post('/player')
        .send(playerToCreate)

    const res = await request(app).get('/player/all')

    t.is(res.status, 200)
    t.true(Array.isArray(res.body), 'Body should be an array')
    t.true(res.body.length > 0)
})

test('Fetch a player', async t => {
    const playerToCreate = { name: 'Görkem', surname: 'Tosun' }

    const playerCreated = (await request(app)
        .post('/player')
        .send(playerToCreate)).body

    const fetchRes = await request(app).get(`/player/${playerCreated._id}/json`)

    const playerFetched = fetchRes.body

    t.is(fetchRes.status, 200)
    t.deepEqual(playerFetched, playerCreated)
})  

test('Delete a player', async t => {
    t.plan(3)

    const playerCreated = (await request(app)
        .post('/player')
        .send({ name: 'Görkem', surname: 'Tosun' })).body

    const delRes = await request(app).delete(`/player/${playerCreated._id}`)

    t.is(delRes.status, 200)
    t.is(delRes.text, 'ok!')

    const fetchRes = await request(app).get(`/player/${playerCreated._id}`)

    t.is(fetchRes.status, 404)
}) 

test('Get player quiz form', async t => {

    const playerCreated = (await request(app)
        .post('/player')
        .send({ name: 'Görkem', surname: 'Tosun' })).body
    
    const res = await request(app).get(`/player/${playerCreated._id}/quiz`)

    t.is(res.status, 200)
})

test('Put player quiz', async t => {
    const playerCreated = (await request(app)
        .post('/player')
        .send({ name: 'Görkem', surname: 'Tosun' })).body
    
    const postQuizRes = await request(app)
        .put(`/player/${playerCreated._id}/quiz`)
        .send({
            age: 33,
            height: 12,
            weight: 32,
            location: 'Berlin',
            telephone: '05356569898',
            rolePreference: ['Guard','Forward','Post','Referee'],
            ratingsByOwn: {
                power: 3,
                speed: 4,
                stamina: 1,
                handling: 9,
                offense: 7,
                defense: 3,
                teamplay: 5,
                individualSkill: 6
            }
         }).catch(err => {
             console.log(err)
         })

    t.is(postQuizRes.status, 200)
    t.false(postQuizRes.body.ratingEvaluation == undefined)
})



 