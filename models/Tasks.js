const mongoose = require('mongoose');
const tasksSchema = new mongoose.Schema({
    taskname : {
        type: String,
        required: true
    },
    completed : {
        type: Boolean,
        default : false
    },
    priority : {
        type: String
    },
    tags: [{
        type: String,
    }]
},
{
    timestamps : true
}

)

module.exports = mongoose.model('Tasks', tasksSchema)