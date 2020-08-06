require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

const cors = require('cors')

const morganLog = morgan((tokens, req, res) => {
    const customLog = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')

    return req.method === 'POST' ? `${customLog} ${JSON.stringify(req.body)}` : customLog
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morganLog)

app.get('/', (request, response) => {
    response.send('<h1>Phonebook App</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(notes => {
        response.json(notes)
    })
})

// GET TO THIS LATER

// app.get('/info', (request, response) => {
//     const date = new Date()
//     response.send(
//         `Phonebook has info for ${persons.length} people. 
//         <br/>
//         <br/>
//         ${date}`)
// })

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.num) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    // if (persons.find(it => it.name === body.name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Person({
        name: body.name,
        num: body.num,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
