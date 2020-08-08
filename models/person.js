const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

// to avoid error message: DeprecationWarning
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},
    num: { type: String, required: true, minlength: 8}
})

personSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })

// // https://github.com/Automattic/mongoose/issues/6578
// mongoose.plugin(schema => {
//     schema.pre('findOneAndUpdate', setRunValidators)
//     schema.pre('updateMany', setRunValidators)
//     schema.pre('updateOne', setRunValidators)
//     schema.pre('update', setRunValidators)
// })

// function setRunValidators() {
//     this.setOptions({ runValidators: true })
// }

// Person.findOneAndUpdate(
//     { num: 'old-num' },
//     { num: 'new-num' },
//     { runValidators: true, context: 'query' },
//     function (err) {
//         console.log(err)
//     }
// )

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
