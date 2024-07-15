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
        type: String,
        default: 'low'
    },
    tags: [{
        type: String,
        default: []
    }],
    duedate : {
        type: Date,
        default: new Date(0)
    }


},
{
    timestamps : true
}

)

module.exports = mongoose.model('Tasks', tasksSchema)