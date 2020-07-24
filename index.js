const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
