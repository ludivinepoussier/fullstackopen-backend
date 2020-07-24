const express = require('express')
const app = express()

app.use(express.json())

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
    // response.send(`Phonebook has info for ${persons.length} people`)
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
