const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const dependentSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
})


module.exports = mongoose.model("Dependent", dependentSchema)