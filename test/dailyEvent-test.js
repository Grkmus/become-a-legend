import test from 'ava'
import DailyEventService from '../services/dailyEvent-service'
import faker from 'faker'
import request from 'supertest'
import app from '../app'
import PlayerService from '../services/player-service'


test('Create an event', async t => {
    const event = {name: 'event1'}

    const eventToCreateRes = await request(app)
        .post('/daily-event')
        .send(event)

    t.is(eventToCreateRes.status, 200)
    t.is(eventToCreateRes.body.name, event.name)
})

test('Get list of all events', async t => {
    const event = {date: Date.now()}

    const eventToCreateRes = await request(app)
        .post('/daily-event')
        .send(event)

    const eventListToFind = await request(app).get('/daily-event/all')

    t.is(eventListToFind.status, 200)
    t.true(Array.isArray(eventListToFind.body))
    t.true(eventListToFind.body.length > 0)
})

test('Fetch an event', async t => {
    const event = { date: Date.now() }

    //const eventToCreate = await DailyEventService.add(event)
    const eventToCreate = (await request(app)
        .post('/daily-event')
        .send(event)).body
    const eventToFindRes = await request(app).get(`/daily-event/${eventToCreate._id}`)
    
    const eventToFind = eventToFindRes.body
 
    t.is(eventToFindRes.status, 200)
    t.deepEqual(eventToFind, eventToCreate)
})

test('add an attendee', async t => {
    const event = {name: 'eventLastly'}

    const eventToCreate = (await request(app)
        .post('/daily-event')
        .send(event)).body

    const player = (await request(app)
            .post('/player')
            .send({
                name: faker.name.firstName(),
                ratingEvaluation : faker.random.number({ min: 1, max: 10 })
            })).body

    const res = await request(app).post(`/daily-event/${eventToCreate._id}/attendee`).send(player)
    
    t.not(res.body.ratingEvaluation, undefined || null)
    t.is(res.status, 200)

})

test('12 people has joined!! - Create teams and select captains in an event', async t => {
    // 1. Create the event
    const eventToCreate = (await request(app)
        .post('/daily-event')
        .send({name: 'event'})).body

    // 2. Add 12 people inside the event
    for (let i = 0; i < 12; i++) {
        const player = (await request(app)
            .post('/player')
            .send({
                name: faker.name.firstName(),
                ratingEvaluation : faker.random.number({ min: 1, max: 10 })
            })).body

        await request(app).post(`/daily-event/${eventToCreate._id}/attendee`).send(player)
    }   

    // 3. Get the event with attendees
    const eventWithAttendees = (await request(app).get(`/daily-event/${eventToCreate._id}`)).body

    // 4. Run phase2
    
    await DailyEventService.phase2(await DailyEventService.find(eventWithAttendees._id))

    // 5. Get the event after phase2

     const eventLastly = (await request(app).get(`/daily-event/${eventToCreate._id}`)).body

    t.is(eventLastly.teams.length, 4)
    eventLastly.teams.forEach(team => {
        t.not(team.players[0], undefined || null)
    })
})

test('Get all teams in the event', async t => {
    const event = {name: 'eventLastly'}

    const eventToCreate = (await request(app)
        .post('/daily-event')
        .send(event)).body

    for (let i = 0; i < 12; i++) {
        const player = (await request(app)
            .post('/player')
            .send({
                name: faker.name.firstName(),
                ratingEvaluation : faker.random.number({ min: 1, max: 10 })
            })).body

        await request(app).post(`/daily-event/${eventToCreate._id}/attendee`).send(player)
    }   

    const eventWithAttendees = (await request(app).get(`/daily-event/${eventToCreate._id}`)).body

    await DailyEventService.phase2(await DailyEventService.find(eventWithAttendees._id))

    const allTeamsRes = await request(app).get(`/daily-event/${eventToCreate._id}/team/all`)

    t.is(allTeamsRes.status, 200)
    t.true(Array.isArray(allTeamsRes.body))
    t.true(allTeamsRes.body.length > 0)
})

test('Fetch a team in an event', async t => {
    const eventToCreate = (await request(app)
        .post('/daily-event')
        .send({name: 'eventLastly'})).body

    for (let i = 0; i < 12; i++) {
        const player = (await request(app)
            .post('/player')
            .send({
                name: faker.name.firstName(),
                ratingEvaluation : faker.random.number({ min: 1, max: 10 })
            })).body

        await request(app).post(`/daily-event/${eventToCreate._id}/attendee`).send(player)
    }   
    

    const eventWithAttendees = (await request(app).get(`/daily-event/${eventToCreate._id}`)).body

    await DailyEventService.phase2(await DailyEventService.find(eventWithAttendees._id))

    const eventLastly = (await request(app).get(`/daily-event/${eventToCreate._id}`)).body
    const teamRes = await request(app).get(`/daily-event/${eventToCreate._id}/team/${eventLastly.teams[0]._id}`)

    t.is(teamRes.status, 200)
    t.true(Array.isArray(teamRes.body.players))
    t.true(teamRes.body.players.length > 0)
})

test('Captain selects a player', async t => {
    const eventToCreate = (await request(app)
        .post('/daily-event')
        .send({name: 'eventLastly'})).body

    for (let i = 0; i < 12; i++) {
        const player = (await request(app)
            .post('/player')
            .send({
                name: faker.name.firstName(),
                ratingEvaluation : faker.random.number({ min: 1, max: 10 })
            })).body

        await request(app).post(`/daily-event/${eventToCreate._id}/attendee`).send(player)
    }   

    const eventWithAttendees = (await request(app).get(`/daily-event/${eventToCreate._id}`)).body

    await DailyEventService.phase2(await DailyEventService.find(eventWithAttendees._id))

    const eventLastly = (await request(app).get(`/daily-event/${eventToCreate._id}`)).body
    const teamRes = await request(app).get(`/daily-event/${eventToCreate._id}/team/${eventLastly.teams[0]._id}`)
    const listBeforePicking = eventLastly.attendeesToBeSelected.length

    const res = await request(app)
        .post(`/daily-event/${eventToCreate._id}/team/${teamRes.body._id}/pick`)
        .send(eventLastly.attendeesToBeSelected[0]._id)

    const eventAfterPicking = (await request(app).get(`/daily-event/${eventToCreate._id}`)).body
    const listAfterPicking = eventAfterPicking.attendeesToBeSelected.length
    const teamResAfterPicking = await request(app).get(`/team/${eventAfterPicking.teams[0]._id}`)

    t.is(res.status, 302)
    t.is(listBeforePicking, listAfterPicking + 1)
    t.is(teamRes.body.players.length + 1, teamResAfterPicking.body.players.length)
    
})

const timeout = (t, ms) => {
	setTimeout(() => {
		t.fail('Timeout exceeded')
	}, ms)
}

test('phase1 not enough attendee', async t => {
    let eventToCreate = await DailyEventService.add({name: 'eventDirect'})

    const error = await t.throws(DailyEventService.phase1(eventToCreate._id)).catch(err => {
        console.log(err)
    })
    
    t.is(error.message, 'not enough participant')
    
})

// test('phase1 enough attendee', async t => {
//     let eventToCreate = await DailyEventService.add({name: 'eventDirect'})

//     for (let i = 0; i < 12; i++) {
//         const player = await PlayerService.add({
//             name: faker.name.firstName(),
//             ratingEvaluation : faker.random.number({ min: 1, max: 10 })
//         })

//         eventToCreate.attendees.push(player)
//     }
//     await eventToCreate.save()

//     const message = await t.notThrows(DailyEventService.phase1(eventToCreate._id))
//     t.is(message, 'ok')
    
// })

