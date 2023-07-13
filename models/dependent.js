const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const dependentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
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