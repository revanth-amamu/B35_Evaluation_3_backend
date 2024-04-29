const express = require('express');
const TaskModel = require('../models/task.model');
const auth = require('../middlewares/auth.middleware');
const access = require('../middlewares/access.middleware');

const taskRouter = express.Router();

taskRouter.post('/', auth, access("member"), async (req, res) => {
    const payload = req.body;
    console.log(req.userId);
    try {
        const task = new TaskModel({
            ...payload,
            createdBy: req.userId,
        });
        await task.save();
        res.status(200).json({ message: "Task created successfully..." });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

taskRouter.get('/:userId', auth, access("member"), async ( req, res) => {

    const { userId } = req.params;
    try {
        const tasks = await TaskModel.find({ createdBy: userId });

        res.status(200).json({ message: "Details of all tasks", tasks });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

taskRouter.patch('/:taskId', auth, access("member"), async ( req, res ) => {

    const { taskId } = req.params;
    const payload = req.body;
    
    try {
        await TaskModel.findByIdAndUpdate({_id: taskId }, payload);
        res.status(201).json({ message: "Task updated Successfully..."});

    } catch (err) {
        res.status(400).json({ meesage: err.message });
    }
})

taskRouter.patch('/:taskId', auth, access("member"), async ( req, res ) => {

    const { taskId } = req.params;
    const payload = req.body;
    
    try {
        await TaskModel.findByIdAndUpdate({_id: taskId }, payload);
        res.status(201).json({ message: "Task updated Successfully..."});

    } catch (err) {
        res.status(400).json({ meesage: err.message });
    }
})

taskRouter.delete('/:taskId', auth, access("member"), async ( req, res ) => {

    const { taskId } = req.params;
    
    try {
        await TaskModel.findByIdAndUpdate({_id: taskId }, {
            deleteApproval: "pending"
        });
        res.status(200).json({ message: "Delete Request sent to manager"});

    } catch (err) {
        res.status(400).json({ meesage: err.message });
    }
})


// manager

taskRouter.get('/current_day', auth, access("manager"), async (req, res) => {
    try {
        const tasks = TaskModel.find()
    } catch (err) {
        res.status(400).json({ meesage: err.message });
    }
})

taskRouter.get('/delete_approvals', auth, access("manager"), async(req, res) => {
    try {
        const tasks = await TaskModel.find({ deleteApproval: "Pending" });
        res.status(200).json({ message: "Details of all tasks with delete approvals", tasks });

    } catch (err) {
        res.status(400).json({ meesage: err.message });
    }
})


module.exports = taskRouter;