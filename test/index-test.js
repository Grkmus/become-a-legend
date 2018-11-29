import test from 'ava'
import request from 'supertest'
import app from '../app'
import faker from 'faker'

test('Get index page', async t => {
    const res = await request(app).get('/')

    t.is(res.status, 200)
})

test('Get registration form', async t=> {

    const res = await request(app).get('/register')

    t.is(res.status, 200)
}) 
   


test('Register a Player', async t => {
    const player = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email()
    }

    const playerCreatedRes = await request(app)
        .post('/register')
        .send(player)

    t.is(playerCreatedRes.status, 200)
})


 
 