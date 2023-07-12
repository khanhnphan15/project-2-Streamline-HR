const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Permission",permissionSchema )