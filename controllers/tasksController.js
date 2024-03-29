const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        let tasks = await Task.find({})
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createTask = async (req, res) => {
    try {
        let task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getTask = async (req, res) => {
    try {
        const task_id = req.params.id;
        let task = await Task.findOne({ _id: task_id })
        if (!task) {
            return res.status(404).json({ message: `No task with id: ${task_id}` })
        }
        res.status(200).json(task)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const task_id = req.params.id;
        let deletedTask = await Task.findOneAndDelete({ _id: task_id })
        if (!deletedTask) {
            return res.status(404).json({ message: `No task with id: ${task_id}` })
        }
        res.status(200).json(deletedTask)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateTask = async (req, res) => {
    try {
        let task_id = req.params.id;
        const updatedtask = await Task.findOneAndUpdate({ _id: task_id }, req.body, {
            new: true,
            runValidators: true,
        })
        if (!updatedtask) {
            return res.status(404).json({ message: `No task with id: ${task_id}` })
        }
        res.status(200).json(updatedtask)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}