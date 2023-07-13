const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permissions:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Permission'}],
})

module.exports = mongoose.model("Role", roleSchema)