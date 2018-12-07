import test from 'ava'
import request from 'supertest'
import app from '../app'
import Faker from 'faker'

test('Create a team', async t => {
    const teamToCreate = {
        name: Faker.random.word()
    }

    const teamToCreateRes = await request(app) 
        .post('/team')
        .send(teamToCreate)
    
    t.is(teamToCreateRes.status, 200)
    t.is(teamToCreateRes.body.name, teamToCreate.name)

})

test('Get the list of all teams', async t => {
    const teamToCreate = {
        name: Faker.random.word()
    }

    const teamToCreateRes = await request(app)
        .post('/team')
        .send(teamToCreate)
    
    const getTeamsRes = await request(app).get('/team/all')

    t.is(getTeamsRes.status, 200)
    t.true(Array.isArray(getTeamsRes.body))
    t.true(getTeamsRes.body.length > 0)
})

test('Fetch a team', async t => {
    const teamToCreate = {
        name: Faker.random.word()
    }

    const teamToCreateRes = await request(app)
        .post('/team')
        .send(teamToCreate)
    
    const teamToFindRes = await request(app).get(`/team/${teamToCreateRes.body._id}`)

    t.is(teamToFindRes.status, 200)
    t.deepEqual(teamToFindRes.body, teamToCreateRes.body)
})

test('Delete a team', async t => {
    t.plan(3)
    
    const teamToCreateRes = await request(app)
        .post('/team')
        .send({ name: Faker.random.word() })
    
    const teamToDeleteRes = await request(app).delete(`/team/${teamToCreateRes.body._id}`)

    t.is(teamToDeleteRes.status, 200)
    t.is(teamToDeleteRes.text, 'ok!')

    const teamToFindRes = await request(app).get(`/team/${teamToCreateRes.body._id}`)
    
    t.is(teamToFindRes.status, 404)
})


