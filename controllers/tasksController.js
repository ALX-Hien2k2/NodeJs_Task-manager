const Task = require('../models/Task')
const asyncWrapper = require('../middlewares/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    let tasks = await Task.find({})
    res.status(200).json({ tasks })
    // res.status(200).json({ status: "success", data: { nbHits: tasks.length, tasks } })
})

const createTask = asyncWrapper(async (req, res) => {
    let task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const task_id = req.params.id;
    let task = await Task.findOne({ _id: task_id })
    if (!task) {
        return next(createCustomError(`No task with id: ${task_id}`, 404))
        // return res.status(404).json({ message: `No task with id: ${task_id}` })
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const task_id = req.params.id;
    let task = await Task.findOneAndDelete({ _id: task_id })
    if (!task) {
        return next(createCustomError(`No task with id: ${task_id}`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
    let task_id = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: task_id }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!task) {
        return next(createCustomError(`No task with id: ${task_id}`, 404))
    }
    res.status(200).json({ task })
})

// const editTask = async (req, res) => {
//     try {
//         let task_id = req.params.id;
//         const updatedtask = await Task.findOneAndUpdate({ _id: task_id }, req.body, {
//             new: true,
//             runValidators: true,
//             overwrite: true, // this will overwrite the whole document
//         })
//         if (!updatedtask) {
//             return res.status(404).json({ message: `No task with id: ${task_id}` })
//         }
//         res.status(200).json(updatedtask)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// }

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    // editTask,
}