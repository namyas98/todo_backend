const { isDate } = require('date-fns');
const Tasks = require('../models/Tasks');
const asyncHandler = require('express-async-handler');

//@desc Get all tasks
//@route GET /Tasks
//@access Public
const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Tasks.find().lean();
    
    //confirm database has tasks
    if(!tasks?.length) {
        return res.status(400).json({message:'No tasks found'})
    };
    res.json(tasks)

});

//@desc Create a task
//@route POST /Tasks
//@access Public
const createNewTask = asyncHandler(async (req, res) => {
    console.log('created')
    const {taskname, priority, tags, duedate} = req.body;

    //confirm taskname is provided
    if(!taskname) {
        return res.status(400).json({message: 'Task name is required'});
    };

    //check for duplicate taskname
    const duplicate = await Tasks.findOne({taskname}).lean().exec();
    if(duplicate) {
        return res.status(409).json({message: 'This task name already exists'})

    };

    //create task object to be stored in database
    const taskObj = {
        taskname: taskname,
        priority: priority,
        tags: tags,
        duedate: duedate

    };

    //create and store task
    const task = await Tasks.create(taskObj);

    //give response
    if(task){
        return res.status(201).json({message: `New task: ${taskname} created`})
    } else {
        return res.status(400).json({message:'Recieved invalid task data'})
    };
});

//@desc Update a task
//@route PATCH /Tasks
//@access Public
const updateTask = asyncHandler(async (req, res) => {
    const {_id, taskname, completed, priority, tags, duedate} = req.body
    //check data validity
    if(!_id || !taskname || !Array.isArray(tags) || !duedate || !priority?.length) {
        return res.status(400).json({message: 'Data validity mismatch'})
    }

    const task = await Tasks.findById(_id).exec();

    if(!task) {
        return res.status(400).json('Task not found');
    }

    //Check for duplicate taskname
    const duplicate = await Tasks.findOne({taskname}).lean().exec();

    if(duplicate && duplicate?._id?.toString() !== _id) {
        return res.status(409).json({message: 'This task name already exists'})
    }

    task.taskname = taskname;
    task.completed = completed;
    task.priority = priority;
    task.tags = tags;
    task.duedate = duedate;

    const updatedTask = await task.save();

    res.json({message: `'Updated task ${taskname}'`});


});


//@desc Delete a task
//@route DELETE /Tasks
//@access Public
const deleteTask = asyncHandler(async (req, res) => {
    const {_id} = req.body
    if(!_id) {
        return res.status(400).json({message: 'Task ID is required to delete task'})
    };

    const task = await Tasks.findById(_id).exec();

    if(!task){
        return res.status(400).json({message: 'Task not found'})
    };

    const result = await task.deleteOne()

    const response = `Task with ID ${_id} deleted`

    res.json(response);
});

module.exports = {
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask
}