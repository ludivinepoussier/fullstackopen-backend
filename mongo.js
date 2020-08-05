const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNum = process.argv[4]

const url =
    `mongodb+srv://ludivine:${password}@cluster0.kv2ut.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    num: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: newName,
    num: newNum,
})

if (newName !== undefined || newNum !== undefined) {
    person.save().then(result => {
        console.log(`added ${newName} number ${newNum} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log ('phonebook:')
        result.forEach(it => {
            console.log(`${it.name} ${it.num}`)
        })
        mongoose.connection.close()
    })
}
