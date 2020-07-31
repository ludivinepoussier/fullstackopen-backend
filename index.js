const express = require('express')
const morgan = require('morgan')
const app = express()
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
app.use(express.json())
app.use(morganLog)
app.use(express.static('build'))

let persons = [
    {
        "name": "Arto Hellas",
        "num": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "num": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "num": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "num": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Phonebook App</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `Phonebook has info for ${persons.length} people. 
        <br/>
        <br/>
        ${date}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

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

    if (persons.find(it => it.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        num: body.num,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
